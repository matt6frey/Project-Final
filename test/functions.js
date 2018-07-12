const uniqueString = require("unique-string");

// DB Packages
const ENV = process.env.ENV || "development";
const knexConfig = require("../knexfile");
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

module.exports = {
  getRecipeDetails: function (recipes, details, cb, uniqueID) {
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
  },

  // checks database for matching ingredient item queries and returns a promise
  checkDB: function (query_str) {
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
  },

  // Adds pluralized elements to array
  duplicateArray: function (array) {
    let array2 = array.map(value => {
      if (value.endsWith("s")) {
        return (value = value.substr(0, value.length - 1));
      } else {
        return (value = value);
      }
    });
    return array.concat(array2);
  }


};