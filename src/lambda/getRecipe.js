const AWS = require('aws-sdk');

const buildResponse = require('../middleware/buildResponse.js');

const RECIPES_TABLE = 'Recipe';
const dynamodb = new AWS.DynamoDB.DocumentClient();

const getRecipes = async ( event ) => {
    const { uuid } = event.pathParameters

    const params = {
        TableName: RECIPES_TABLE,
        Key: { uuid }
    };

    let recipe;
    
    try {
        const response = await dynamodb.get( params ).promise();
        recipe = response.Item
    } catch ( error ) {
        console.error( error )
    }

    return buildResponse(200, recipe)
};


module.exports = {
    handler: getRecipes
  }