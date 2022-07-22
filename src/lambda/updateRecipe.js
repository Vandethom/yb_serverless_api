const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const buildResponse = require('../middleware/buildResponse.js');

const RECIPES_TABLE = 'Recipe';
const dynamodb = new AWS.DynamoDB.DocumentClient();


const updateRecipe = async ( event ) => {
    const { updateValue } = JSON.parse( event.body );
    const { uuid } = event.pathParameters;
    const updatedAt = new Date();

    await dynamodb.update({
        TableName: RECIPES_TABLE,
        Key: { uuid },
        UpdateExpression: `set ${ updateValue } = :updateValue`,
        ExpressionAttributeValues: {
            ':updateValue': updateValue
        },
        ReturnValues: 'ALL_NEW'
    }).promise();

  return buildResponse( 200, { message: 'Recipe was updated with values.'} )
};

module.exports = {
  handler: updateRecipe
}