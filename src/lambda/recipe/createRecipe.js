const AWS = require( 'aws-sdk' );
const { v4: uuidv4 } = require( 'uuid' );

const handleCustomError = require( '../../middleware/handleCustomError.js' )
const buildResponse = require( '../../middleware/buildResponse.js' );
const recipeModel = require( '../../data/recipe.js' )

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createRecipe = async ( event ) => {	
	const recipe = JSON.parse( event.body );
	const uuid = uuidv4();
	const createdAt = new Date().toISOString();
	const updatedAt = new Date().toISOString();

	const newRecipe = {
		uuid,
		...recipe,
		createdAt,
		updatedAt
	}

	try {
		await recipeModel.validate( newRecipe, { abortEarly: false } );
		await dynamodb.put({
			TableName: process.env.RECIPE_TABLE,
			Item: newRecipe
		}).promise();

		return buildResponse( 201, newRecipe );
	} catch ( e ) {
		return handleCustomError( e );	
	}
};

module.exports = {
	handler: createRecipe
}