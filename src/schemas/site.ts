import * as Joi from 'joi';

const schema = Joi.object({
  id: Joi
    .string()
    .max(200)
    .required(),
  domain: Joi
    .string()
    .max(200)
    .required(),
})
  .label('Site');

export default schema;
