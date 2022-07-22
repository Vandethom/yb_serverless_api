const AWS = require('aws-sdk');

const buildResponse = require('../middleware/buildResponse.js');

const RECIPES_TABLE = 'Recipe';
const dynamodb = new AWS.DynamoDB.DocumentClient();

const getRecipes = async ( event ) => {
    const params = {
        TableName: RECIPES_TABLE
    };

    let recipes;
    
    try {
        const response = await dynamodb.scan( params ).promise();
        recipes = response.Items
    } catch ( error ) {
        console.error( error )
    }

    return buildResponse(200, recipes)
};


module.exports = {
    handler: getRecipes
  }