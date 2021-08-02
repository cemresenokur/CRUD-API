import * as Joi from 'joi';


const schemas = {
    create:
    Joi.object().keys(
    {
        name: Joi.string().required(),
        password: Joi.string().min(8).required()
}),
    update:
    Joi.object().keys(
        {
            id: Joi.number().required(),
            name: Joi.string().required(),
            password: Joi.string().min(8).required(),
    }),

    get:
    Joi.object().keys(
        {
            sortBy: Joi.string().valid('asc','desc').optional(),
            orderBy: Joi.string().valid('id','name').optional(),
            limit: Joi.number().optional(),
            offset: Joi.number().optional(),
            
    }),

}

export default schemas;