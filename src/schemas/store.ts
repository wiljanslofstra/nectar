import * as Joi from 'joi';

const schema = Joi.object({
  id: Joi.string().max(200).required(),
  list_id: Joi.string().max(200).required(),
  name: Joi.string().max(200).required(),
  currency_code: Joi
    .string()
    // Source: https://mailchimp.com/help/pricing-for-international-non-us-and-other-currencies/
    .allow('USD', 'EUR', 'GBP', 'AUD', 'INR', 'NZD', 'BRL', 'DKK', 'SEK', 'SGD', 'ZAR', 'CHF', 'MXN', 'CAD', 'HKD', 'JPY')
    .default('EUR'),
  platform: Joi.string().max(200),
  domain: Joi.string().max(200),
  email_address: Joi.string().email().max(200),
  money_format: Joi.string().max(200).default('€'),
  timezone: Joi.string().max(200),
  phone: Joi.string().max(200),
  primary_locale: Joi.string()
    // Source: https://mailchimp.com/help/view-and-edit-contact-languages/
    .allow('en', 'ar', 'af', 'be', 'bg', 'ca', 'zh', 'hr', 'cs', 'da', 'nl', 'et', 'fa', 'fi', 'fr', 'fr_CA', 'de', 'el', 'he', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'ja', 'km', 'ko', 'lv', 'lt', 'mt', 'ms', 'mk', 'no', 'pl', 'pt', 'pt_PT', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'es_ES', 'sw', 'sv', 'ta', 'th', 'tr', 'uk', 'vi'),
  address: Joi
    .object({
      address1: Joi.string().max(200),
      address2: Joi.string().max(200),
      city: Joi.string().max(200),
      state: Joi.string().max(200),
      postal_code: Joi.string().max(20),
      country_code: Joi.string().max(2),
      longitude: Joi.number(),
      latitude: Joi.number(),
    }),
})
  .label('Store');

export default schema;
