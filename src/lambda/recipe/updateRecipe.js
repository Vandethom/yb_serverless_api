const AWS = require('aws-sdk');

const handleCustomError = require('../middleware/handleCustomError.js')
const buildResponse = require('../middleware/buildResponse.js');
const recipeModel = require('../data/recipe.js')

const dynamodb = new AWS.DynamoDB.DocumentClient();


const updateRecipe = async ( event ) => {
  const { uuid } = event.pathParameters;
  const body = JSON.parse( event.body )
  const keys = Object.keys( body )
  const keysNames = keys.map( name => `#${ name }` )
  const valuesNames = keys.map( value => `:${ value }` )
  const UpdateExpression = 'set ' + keysNames.map( ( name, index ) => `${ name } = ${ valuesNames[index] }` ).join( ', ' )
  const ExpressionAttributeNames = keysNames.reduce( ( expression, nameExpression, index ) => ( { ...expression, [ nameExpression ]: keys[index] } ), {} )
  const ExpressionAttributeValues = valuesNames.reduce( ( expression, valueExpression, index ) => ( { ...expression, [ valueExpression ]: body[ keys[ index ] ] } ), {} )

  const params = {
    TableName: process.env.RECIPE_TABLE,
    Key: { uuid },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues
  };

  try {
    await recipeModel.validate( newRecipe, { abortEarly: false } );
    await dynamodb.update( params ).promise();

    return buildResponse( 200, { message: 'Success updating recipe', recipe: body } )
  } catch (e) {
    return handleCustomError( e )
  }


}


module.exports = {
  handler: updateRecipe
}