// App.js Tests
// const app = require('/app.js');
const assert = require('assert');
const getRecipeDetails = require('./functions.js').getRecipeDetails;
const checkDB = require('./functions.js').checkDB;
const duplicateArray = require('./functions.js').duplicateArray;

describe('App.js Tests', function () {
 it('should return an array with pluralized singular values, if pluralized values exist', function () {
      let array = duplicateArray(['blueberrys','apples','bananas']);
      console.log(array);
        assert.equal(array, ['blueberrys','apples','bananas', 'blueberry','apple','banana']);
    });
 // it('should return first charachter of the string', function () {
 //        assert.equal("Hello".charAt(0), 'H');
 //    });
});