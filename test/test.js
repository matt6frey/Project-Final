// App.js Tests
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const assert = require('assert');
const getRecipeDetails = require('./functions.js').getRecipeDetails;
const checkDB = require('./functions.js').checkDB;
const duplicateArray = require('./functions.js').duplicateArray;

chai.use(chaiAsPromised);

describe('App.js Tests: duplicateArray()', function () {
 it('should return a duplicate array', function () {
      let array = duplicateArray(['blueberry','apple','banana']);
        assert.equal(array.length, ['blueberry','apple','banana'].length * 2);
    });

 it('should return a duplicate array with the pluralized values made singular, if pluralized values exist', function () {
      let array = duplicateArray(['blueberry','apple','banana']);
        assert.equal(array.toString(), ['blueberry','apple','banana', 'blueberry','apple','banana'].toString());
    });

it('should return "false" if given a data type that isn\'t an array', function () {
      let array = duplicateArray({id: 01, name: 'object'});
        assert.equal(array, false);
    });



});

describe('App.js Tests: checkDB()', function () {
// Tried getting Async tests to run but no dice.

it('should return "false" if given a data type that isn\'t a string', function () {
      let check = checkDB({id: 01, name: 'object'});
        assert.equal(check, false);
    });

});