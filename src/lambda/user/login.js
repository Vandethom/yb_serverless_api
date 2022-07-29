const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleCustomError = require('../../middleware/handleCustomError.js');
const buildResponse = require('../../middleware/buildResponse.js');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const login = async ( event ) => {	
	const { email, password } = JSON.parse( event.body );
    const params = {
        TableName: process.env.RECIPE_TABLE,
        FilterExpression: '#email = :email',
        ExpressionAttributeNames: {
            '#email': 'email',
        },
        ExpressionAttributeValues: {
            ':email': email,
        }
    }

    const user = await dynamodb.scan( params ).promise();
    console.log('Proof we retrieved user from DB ::: ', user)
    const hash = JSON.stringify(user.Items[0].password)

   
    if ( !bcrypt.compareSync( JSON.stringify(password), hash ) ) {
        try {
            console.log('Hey there, working')
            return buildResponse( 200, user)
        } catch ( e ) {
            return handleCustomError( e );	
        }
    } else {
        return handleCustomError( e );
    }
};

module.exports = {
	handler: login
}