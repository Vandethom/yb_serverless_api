const AWS = require('aws-sdk');
const serverless = require('serverless-http');

// const buildResponse = require('./middlewares/buildResponse.js');

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

    return {
        statusCode: 200,
        body: JSON.stringify(recipe)
    }
};


module.exports = {
    handler: getRecipes
  }