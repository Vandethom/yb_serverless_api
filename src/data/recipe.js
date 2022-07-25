const yup = require('yup');

const recipeModel = yup.object().shape(	{
    uuid: yup.string().required(),
    authorUuid: yup.string().required(),

    name: yup.string().required(),
    description: yup.string(),

    durationTime: yup.number().required(),
    categories: yup.array(),
    ingredients: yup.array(),
    steps: yup.array(),

    isVegan: yup.boolean().required(),
    isGlutenFree: yup.boolean().required(),
    isPorkFree: yup.boolean().required(),

    steps: yup.array(),
    options: yup.array(),
    tools: yup.array(),

    imageUrl: yup.string()
})

module.exports = recipeModel
