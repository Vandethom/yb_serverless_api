"use strict";

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const RECIPES_TABLE = 'Recipe';
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

    console.log('This is the item to be created ::: ', newRecipe)

    await dynamodb.put({
        TableName: RECIPES_TABLE,
        Item: newRecipe
    }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newRecipe),
  };
};

module.exports = {
  handler: createRecipe
}