import * as Joi from 'joi';

const schema = Joi.object({
  first_name: Joi
    .string()
    .max(200)
    .required(),
  last_name: Joi
    .string()
    .max(200)
    .required(),
  email_address: Joi
    .string()
    .max(200)
    .required(),
  status: Joi
    .string()
    .max(200)
    .required(),
  language: Joi
    .string()
    .max(200)
    .required(),
  custom_fields: Joi
    .object(),
  tags: Joi
    .array()
    .items(Joi.string()),
})
  .label('Customer');

export default schema;
