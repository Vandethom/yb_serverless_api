const yup = require('yup');

const headers = {
    "content-type": "application/json"
}

class HttpError extends Error {
    constructor( statusCode, body = {} ) {
        super( JSON.stringify( body ))
    }
}


const handleCustomError = ( e ) => {
    if ( e instanceof yup.ValidationError ) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
            erors: e.errors
            })
        }
    }

    if ( e instanceof SyntaxError ) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ 
                message: JSON.stringify( { error: `Invalid request body format : ${ e.message }`  } )
            })}
    }

    if ( e instanceof HttpError ) {
        return {
            statusCode: e.statusCode,
             headers,
             body: e.message
        }
    }

    throw e;
}

module.exports = handleCustomError
