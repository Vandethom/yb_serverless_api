const yup = require('yup');

const userModel = yup.object().shape(	{
    uuid: yup.string().required(),

    firstName: yup.string().required(),
    lastName: yup.string().required(),

    email: yup.string().required(),
    password: yup.string()
                .required()
                .min(8, 'Password is too short | Should be at least 8 characters long.'),

    recipes: yup.array().default([]),
    favorites: yup.array().default([]),
    
    createdAt: yup.string().required(),
    updatedAt: yup.string().required()
})

module.exports = userModel
