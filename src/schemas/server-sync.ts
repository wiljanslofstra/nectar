import * as Joi from 'joi';

const schema = Joi.object({
  paths: Joi.object({
    members: Joi.string().uri(),
    site: Joi.string().uri(),
    store: Joi.string().uri(),
    customers: Joi.string().uri(),
    products: Joi.string().uri(),
    orders: Joi.string().uri(),
  }).required(),
  writers: Joi.object({
    mailchimp: {
      key: Joi.string(),
    },
  }).required(),
})
  .label('ServerSync');

export default schema;
