import * as Joi from 'joi';

const schema = Joi.object({
  id: Joi
    .string()
    .max(200)
    .required(),
  list_id: Joi
    .string()
    .max(200)
    .required(),
  name: Joi
    .string()
    .max(200)
    .required(),
  currency_code: Joi
    .string()
    .length(3)
    .default('EUR'),
})
  .label('Store');

export default schema;
