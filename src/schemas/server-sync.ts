import * as Joi from 'joi';

const schema = Joi.object({
  reader: Joi.string().default('json'),
  paths: Joi.object({
    members: Joi.string().uri({ allowRelative: true }),
    site: Joi.string().uri({ allowRelative: true }),
    store: Joi.string().uri({ allowRelative: true }),
    customers: Joi.string().uri({ allowRelative: true }),
    products: Joi.string().uri({ allowRelative: true }),
    orders: Joi.string().uri({ allowRelative: true }),
  }).required(),
  writers: Joi.object({
    mailchimp: {
      key: Joi.string(),
    },
    fake: {
      key: Joi.string(),
    },
  }).required(),
})
  .label('ServerSync');

export default schema;
