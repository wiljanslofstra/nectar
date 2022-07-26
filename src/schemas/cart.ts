import * as Joi from 'joi';

const schema = Joi.object({
  store_id: Joi.string().max(200).required(),
  id: Joi.string().max(200).required(),
  customer: Joi
    .object({
      id: Joi.string().max(200).required(),
      email_address: Joi.string().email().max(200).required(),
      status: Joi.string().allow('subscribed', 'unsubscribed', 'transactional'),
      company: Joi.string().max(200),
      first_name: Joi.string().max(200),
      last_name: Joi.string().max(200),
      address: Joi.object({
        address1: Joi.string().max(200),
        address2: Joi.string().max(200),
        city: Joi.string().max(200),
        state: Joi.string().max(200),
        postal_code: Joi.string().max(20),
        country_code: Joi.string().max(2),
      }),
    }).required(),
  currency_code: Joi
    .string()
    // Source: https://mailchimp.com/help/pricing-for-international-non-us-and-other-currencies/
    .allow('USD', 'EUR', 'GBP', 'AUD', 'INR', 'NZD', 'BRL', 'DKK', 'SEK', 'SGD', 'ZAR', 'CHF', 'MXN', 'CAD', 'HKD', 'JPY')
    .default('EUR'),
  order_total: Joi
    .number()
    .min(0)
    .required(),
  tax_total: Joi
    .number()
    .min(0),
  lines: Joi
    .array()
    .items(Joi.object({
      id: Joi.string().max(200).required(),
      product_id: Joi.string().max(200).required(),
      product_variant_id: Joi.string().max(200).required(),
      quantity: Joi.number().min(0),
      price: Joi.number().min(0),
    })).required(),
  checkout_url: Joi
    .string()
    .uri(),
  created_at: Joi
    .string(),
  updated_at: Joi
    .string(),
})
  .label('Cart');

export default schema;
