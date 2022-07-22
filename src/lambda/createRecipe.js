const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const buildResponse = require('../middleware/buildResponse.js');

const dynamodb = new AWS.DynamoDB.DocumentClient();


const createRecipe = async ( event ) => {
    const { name, durationTime } = JSON.parse( event.body );
    const uuid = uuidv4();
    const createdAt = new Date();
    const updatedAt = new Date();

    const newRecipe = {
        uuid,
        name,
        durationTime,
        createdAt,
        updatedAt
    }

    await dynamodb.put({
        TableName: process.env.RECIPE_TABLE,
        Item: newRecipe
    }).promise();

  return buildResponse( 201, newRecipe );
};

module.exports = {
  handler: createRecipe
}