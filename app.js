require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
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

const curl = require('tiny-curl');

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

// function getRecipeDetails (recipe, cb) {
//   const recipeID = recipe.id;
//   unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeID}/information`)
//   .header("X-Mashape-Key", "UmggyaDjvCmsh4jkCmZdRKKLMQ7Dp1oLVUDjsnb1e0yJuWBKSr")
//   .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
//   .end(function (result) {
//     // console.log(result.status, result.body);
//     // send important details bacK: serves, preptime, ingredients, steps
//     const details = result.body;
//     const ingredients = [];
//     const steps = [];

//     // Append items to steps & ingredients
//     details.analyzedInstructions[0].steps.forEach( (step) => {
//       if (step.step.length > 0) {
//         steps.push(step.step); // Add step
//       }
//     });

//     details.extendedIngredients.forEach( (ingredient) => {
//       if (ingredient.original.length > 1) {
//         ingredients.push(ingredient.original); // Add ingredient
//       }
//     });
//     console.log("IN GETRECIPEDETAILS: ", {
//       serves: details.servings,
//       prepTime: details.readyInMinutes,
//       ingredients: ingredients,
//       steps: steps
//     });
//     return cb({
//       serves: details.servings,
//       prepTime: details.readyInMinutes,
//       ingredients: ingredients,
//       steps: steps
//     });
//   });
// }

function getRecipeDetails(recipes, details, cb) {
  let d = details;
  if(!cb) {
    cb = d;
    details = {};
  }
  if (!recipes.length) {
    console.log("RESCURSIVE CALL:");
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
    details[detail.id] = { rid: recipe.id,
      title: recipe.title,
      image: recipe.image,
      serves: result.raw_body.servings,
      prepTime: result.raw_body.prepTime,
      rating: `${recipe.usedIngredientCount} of ${recipe.usedIngredientCount + recipe.missedIngredientCount}`,
      ingredients: ingredients,
      steps: steps
    }; // Create Complete Recipe Object
    getRecipeDetails(recipes, details, cb);
  });
}

// Call to Spoonacular Recipe Lookup.
app.post('/recipe-lookup', (req,res) => {
  const items = req.body.items.join(","); // Join items into an http friendly str.
  //Do knex DB check first


  const number= 2; // Change number of results. Default: 5
  const recipeResults = {};
  // Make API call if none existent
  unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${items}&number=${number}&ranking=1`)
  .header("X-Mashape-Key", "UmggyaDjvCmsh4jkCmZdRKKLMQ7Dp1oLVUDjsnb1e0yJuWBKSr")
  .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
  .end(function (result) {
            // console.log("ITEM: ", item);
          getRecipeDetails(result.body, (detail) => {

            console.log("FOREACH OVER: ", detail);
            res.status(200);
            res.send(JSON.stringify(detail));
            }); // Create object and append to recipeResults
        });
  // }); // End of .end
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
