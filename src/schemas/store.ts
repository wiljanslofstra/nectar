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
    .allow(
      // Source: https://mailchimp.com/help/pricing-for-international-non-us-and-other-currencies/
      'USD',
      'EUR',
      'GBP',
      'AUD',
      'INR',
      'NZD',
      'BRL',
      'DKK',
      'SEK',
      'SGD',
      'ZAR',
      'CHF',
      'MXN',
      'CAD',
      'HKD',
      'JPY',
    )
    .default('EUR'),
})
  .label('Store');

export default schema;
