const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleCustomError = require('../../middleware/handleCustomError.js')
const buildResponse = require('../../middleware/buildResponse.js');
const userModel = require('../../data/user.js')

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
    console.log('User ::: ', user)
    const hash = user.Items[0].password
    console.log('Hash ::: ', hash)
   
    if (bcrypt.compareSync( password, hash )) {
        try {
            return buildResponse( 200, {
                user: user,
                token: jwt.sign(
                    { user },
                    'THIS_IS-a-s3c43T.toK3n',
                    { expiresIn: '1h' }
                )
            })
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