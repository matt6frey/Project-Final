require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const uniqueString = require('unique-string');
// DB Packages
// const pg = require('pg');
const ENV = process.env.ENV || "development";
const knexConfig = require('./knexfile');
const knex = require("knex")(knexConfig[ENV]);
// Image Recogition API
const Clarifai = require('clarifai');

// Initialize API key: Clafifai
const clApp = new Clarifai.App({
 apiKey: process.env.CLARIFAI
});

// Rapid API to Spoonacular
const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI(process.env.RAPIDAPI_PROJECT_KEY, process.env.RAPIDAPI_ID);
const unirest = require('unirest');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Evaluate Terms
function termEvaluator (terms, cb) {
  const items = [];
  terms.forEach( (term) => items.push(term.name)); // add items to check in DB
  knex('foods').whereIn('name', items).then( (matches) => {
    return cb(matches); // Return all appropriate matches
  });
}


app.post('/upload', (req, res) => {
  clApp.models.predict(Clarifai.GENERAL_MODEL, req.body.img).then(
  function(response) {
    let terms = response.outputs[0].data.concepts;
    const newTerms = [];
    // Format the data to be returned.
    terms.forEach((term) => {
      newTerms.push(Object.assign({}, { name: term.name, value: Math.round(term.value * 100) }));
    });
      // Double check Clarifai terms against food terms and send JSON back to client.
    terms = termEvaluator(newTerms, (terms) => {
      res.status(200);
      res.json(terms);
    }); // go line 40
  },
  function(err) {
    // there was an error
    console.log("error: ", err);
  }
  );

});

function getRecipeDetails(recipes, details, cb) {
  let d = details;
  if(!cb) {
    cb = d;
    details = {};
  }
  if (!recipes.length) {
    return cb(details);
  }
  let recipe = recipes.pop();
  unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipe.id}/information`)
  .header("X-Mashape-Key", "UmggyaDjvCmsh4jkCmZdRKKLMQ7Dp1oLVUDjsnb1e0yJuWBKSr")
  .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
  .end(function (result) {
    // reshape data
    const detail = result.body;
    const ingredients = [];
    let steps = [];

    if(result.body.analyzedInstructions.length > 0) {
        // Append items to steps & ingredients
        result.body.analyzedInstructions[0].steps.forEach( (step) => {
          if (!step.step.search(/[123456789]/) > -1 && step.step.length > 1) {
            steps.push(step.step); // Add step
          }
        });
    } else {
      // No instructions found :(, provide src URL instead...
      steps = `No instructions found! Try checking out this <a target='_blank' href='${result.body.sourceUrl}' title='Instructions for this recipe "${result.body.title}".'>resource</a>`;
    }

    result.body.extendedIngredients.forEach( (ingredient) => {
      if (ingredient.original.length > 1) {
        ingredients.push(ingredient.original); // Add ingredient
      }
    });
    details[detail.id] = {
      rid: recipe.id,
      queryID: uniqueString(),
      title: recipe.title,
      image: recipe.image,
      serves: detail.servings,
      prepTime: detail.readyInMinutes,
      rating: `${recipe.usedIngredientCount} of ${recipe.usedIngredientCount + recipe.missedIngredientCount}`,
      ingredients: ingredients,
      steps: steps
    }; // Create Complete Recipe Object
    getRecipeDetails(recipes, details, cb);
  });
}

// checks database for matching ingredient item queries and returns a promise
function checkDB(query_str) {
  console.log(query_str);
  return new Promise ( (resolve, reject) => {
    knex('recipe_queries').where('query_str', 'like', query_str).then( (match) => {
      if(Object.keys(match).length > 0) {
        resolve(match); // Returns DB records of recipes
      } else {
        resolve(false); // None found
      }
    });
  });
}

// Call to Spoonacular Recipe Lookup.
app.post('/recipe-lookup', (req,res) => {
  const items = req.body.items.join(","); // Join items into an http friendly str.
  //Do knex DB check first
  checkDB(items).then( (hasEntry) => {
    if (!hasEntry) {
    const number= 5; // Change number of results. Default: 5
    const recipeResults = {};
    // Make API call if none existent
    unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${items}&number=${number}&ranking=1`)
    .header("X-Mashape-Key", "UmggyaDjvCmsh4jkCmZdRKKLMQ7Dp1oLVUDjsnb1e0yJuWBKSr")
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end(function (result) {
      // Get recipe details and send them back to client

      getRecipeDetails(result.body, (detail) => {
        let keys = Object.keys(detail);
        knex('recipe_queries').insert({query_id: detail[keys[0]].queryID, query_str: items}).then( (submitted) => {
            keys.forEach( (key) => {
              knex('recipes').insert({rid: detail[key].red, query_id: detail[key].queryID, title: detail[key].title, image: detail[key].image, serves: detail[key].serves, prep_time: detail[key].prepTime, ingredients: detail[key].ingredients, steps: detail[key].steps }).then( (submitted) => {
                console.log(`Added ${submitted.length} recipe entries to database.`);
              });
            });
            res.status(200);
            res.send(JSON.stringify(detail));
        });
      });
    });
    } else {
      console.log("Match Found");
      knex('recipes').where('query_id', hasEntry[0].query_id).then( (result) => {
        console.log(`Found ${result.length} entries matching this query "${items}".`);
        res.status(200);
        res.json(hasEntry);
      })
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
