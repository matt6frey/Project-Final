require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

const uniqueString = require("unique-string");

// DB Packages
const ENV = process.env.ENV || "development";
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// Image Recogition API
const Clarifai = require("clarifai");

// Initialize API key: Clarifai
const clApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI
});

// Rapid API to Spoonacular
const RapidAPI = new require("rapidapi-connect");
const rapid = new RapidAPI(
  process.env.RAPIDAPI_PROJECT_KEY,
  process.env.RAPIDAPI_ID
);
const unirest = require("unirest");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));

// Evaluate Terms
function termEvaluator(terms, cb) {
  const items = [];
  terms.forEach(term => items.push(term.name)); // add items to check in DB
  knex("foods")
    .whereIn("name", items)
    .then(matches => {
      console.log(matches);
      return cb(matches); // Return all appropriate matches
    });
}

app.post("/upload", (req, res) => {
  console.log(req.body.img)
  clApp.models.predict(Clarifai.GENERAL_MODEL, req.body.img).then(
    function(response) {
      let terms = response.outputs[0].data.concepts;
      const newTerms = [];
      // Format the data to be returned.
      terms.forEach(term => {
        newTerms.push(
          Object.assign(
            {},
            { name: term.name, value: Math.round(term.value * 100) }
          )
        );
      });
      // Double check Clarifai terms against food terms and send JSON back to client.
      terms = termEvaluator(newTerms, terms => {
        res.status(200);
        res.json(terms);
      });
    },
    function(err) {
      // there was an error
      console.log("error: ", err);
      // res.send(400);
    }
  );
});

function getRecipeDetails(recipes, details, cb, uniqueID) {
  let d = details;
  if (!cb) {
    cb = d;
    details = {};
  }
  if (!recipes.length) {
    return cb(details);
  }
  let recipe = recipes.pop();
  unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipe.id}/information`)
    .header("X-Mashape-Key", process.env.MASHAPE_KEY)
    .header("X-Mashape-Host", process.env.MASHAPE_HOST)
    .end(function(result) {
      // reshape data
      const detail = result.body;
      let ingredients = [];
      let steps = [];

      if (result.body.analyzedInstructions.length > 0) {
        // Append items to steps & ingredients
        result.body.analyzedInstructions[0].steps.forEach(step => {
          if (!step.step.search(/[123456789]/) > -1 && step.step.length > 1) {
            steps.push(step.step); // Add step
          }
        });
      } else {
        // No instructions found :(, provide src URL instead...
        steps = `No instructions found! Try checking out this ${
          result.body.sourceUrl
        }`;
      }

      result.body.extendedIngredients.forEach(ingredient => {
        if (ingredient.original.length > 1) {
          ingredients.push(ingredient.original); // Add ingredient
        }
      });
      if (steps instanceof Array) {
        steps = steps.join("LOLOL");
      }
      ingredients = ingredients.join("LOLOL");
      let prepTime = detail.readyInMinutes !== "" || detail.readyInMinutes !== null ? detail.readyInMinutes : 0;
      details[detail.id] = {
        rid: recipe.id,
        queryID: uniqueID,
        title: recipe.title,
        image: recipe.image,
        serves: detail.servings,
        prepTime: prepTime,
        rating: `${recipe.usedIngredientCount} of ${recipe.usedIngredientCount +
          recipe.missedIngredientCount}`,
        ingredients: ingredients,
        steps: steps
      }; // Create Complete Recipe Object
      getRecipeDetails(recipes, details, cb, uniqueID);
    });
}

// checks database for matching ingredient item queries and returns a promise
function checkDB(query_str) {
  return new Promise((resolve, reject) => {
    knex("recipe_queries")
      .where("query_str", "like", query_str)
      .then(match => {
        if (Object.keys(match).length > 0) {
          resolve(match); // Returns DB records of recipes
        } else {
          resolve(false); // None found
        }
      });
  });
}

// Adds pluralized elements to array
function duplicateArray(array) {
  let array2 = array.map(value => {
    if (value.endsWith("s")) {
      return (value = value.substr(0, value.length - 1));
    } else {
      return (value = value);
    }
  });
  return array.concat(array2);
}

app.get("/validate-item/:name", (req, res) => {
  // app.get('/api/validate-item/:name', (req,res) => {
  if (req.params.name) {
    let names = duplicateArray([req.params.name.toLowerCase()]);
    console.log(names instanceof Array, names);
    knex("foods")
      .whereIn("name", names)
      .then(result => {
        // console.log(result, result instanceof Array, result.length);
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send(false);
        }
      });
  }
});

// Route for getting ingredient recommendations
app.post("/recommend", (req, res) => {
// app.post("/api/recommend", (req, res) => {
  console.log(req.body);
  knex("foods")
    .where("name", "like", `${req.body.recommend}%`)
    .then(result => {
      res.json(result);
      console.log(result);
    });
});

// Call to Spoonacular Recipe Lookup.
app.post("/recipe-lookup", (req, res) => {
  // app.post('/api/recipe-lookup', (req,res) => {
  if (req.body.items.length < 1 || typeof req.body.items === "string") {
    res.status(200);
    res.json({ status: 200, error: "No items were sent." });
  }
  const items = duplicateArray(req.body.items).join(",").toLowerCase().replace(' ', '%20'); // Join items into an http friendly str.
  //Do knex DB check first
  checkDB(items).then(hasEntry => {
    if (!hasEntry) {
    const number= 6; // Change number of results. Default: 5
    // Make API call if none existent
    unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${items}&number=${number}&ranking=2`)
    .header("X-Mashape-Key", process.env.MASHAPE_KEY)
    .header("X-Mashape-Host", process.env.MASHAPE_HOST)
    .end(function (result) {
      if(result.body.length < 1) {
        res.status(200);
        console.log("BODY len < 1: ", result.body);
        res.json([{rid: 99999, query_id: 'none', title: 'No Recipes Found', image: "https://cdn.shopify.com/s/files/1/1061/1924/products/Frowning_Emoji_Icon_30260b4f-d601-45f5-9bb3-836f607cacbc_large.png?v=1513251036", serves: 0, prep_time: 0, ingredients: "We couldn't find any recipes.", rating: '0', steps: "Please try again.", error: true }]);
      } else {
      // Get recipe details and send them back to client
      getRecipeDetails(result.body, (detail) => {
        let keys = Object.keys(detail);
        knex('recipe_queries').insert({query_id: detail[keys[0]].queryID, query_str: items}).then( (submitted) => {
            keys.forEach( (key) => {
              knex('recipes').insert({rid: detail[key].rid, query_id: detail[key].queryID, title: detail[key].title, image: detail[key].image, serves: detail[key].serves, prep_time: detail[key].prepTime, ingredients: detail[key].ingredients, rating: detail[key].rating, steps: detail[key].steps }).then( (submitted) => {
                console.log(`Added ${keys.length} recipe entries to database.`);
              });
            });
            res.status(200);
            res.json(detail);
        });
      }, null, uniqueString());
    }
    });
    } else {
      console.log("Match Found");
      knex('recipes').where('query_id', hasEntry[0].query_id).then( (result) => {
        console.log(`Found ${hasEntry.length} entries matching this query "${items}".`);
        console.log(result);
        res.status(200);
        res.json(result);
      })
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Render 404 page
app.get('*', (req, res) => {
  res.redirect('/')
  });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
