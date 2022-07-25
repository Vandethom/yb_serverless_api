const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleCustomError = require('../../middleware/handleCustomError.js')
const buildResponse = require('../../middleware/buildResponse.js');
const userModel = require('../../data/user.js')

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createUser = async ( event ) => {	
	const user = JSON.parse(event.body);
    const salt = bcrypt.genSaltSync( 12 )
    const hashedpassword = bcrypt.hashSync( user.password, salt )
    user.password = hashedpassword
	const uuid = uuidv4();
	const createdAt = new Date().toISOString();
	const updatedAt = new Date().toISOString();
    const newUser = {
        uuid,
        ...user,
        createdAt,
        updatedAt
    }

    console.log('Here is what we send into DB ::: ', newUser)
    try {
        await userModel.validate( newUser, { abortEarly: false } );
        await dynamodb.put({
            TableName: process.env.RECIPE_TABLE,
            Item: newUser
        }).promise();

        return buildResponse( 201, newUser );
    } catch ( e ) {
        return handleCustomError( e );	
    }
};

module.exports = {
	handler: createUser
}