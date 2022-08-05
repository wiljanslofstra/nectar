import * as Joi from 'joi';

const schema = Joi.object({
  id: Joi.string().max(200).required(),
  first_name: Joi.string().max(200).required(),
  last_name: Joi.string().max(200).required(),
  company: Joi.string().max(200),
  email_address: Joi.string().email().max(200).required(),
  status: Joi.string().allow('subscribed', 'unsubscribed', 'transactional').required(),
  address: Joi
    .object({
      address1: Joi.string().max(200),
      address2: Joi.string().max(200),
      city: Joi.string().max(200),
      state: Joi.string().max(200),
      postal_code: Joi.string().max(20),
      country_code: Joi.string().max(2),
    }),
  language: Joi.string()
    // Source: https://mailchimp.com/help/view-and-edit-contact-languages/
    .allow('en', 'ar', 'af', 'be', 'bg', 'ca', 'zh', 'hr', 'cs', 'da', 'nl', 'et', 'fa', 'fi', 'fr', 'fr_CA', 'de', 'el', 'he', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'ja', 'km', 'ko', 'lv', 'lt', 'mt', 'ms', 'mk', 'no', 'pl', 'pt', 'pt_PT', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'es_ES', 'sw', 'sv', 'ta', 'th', 'tr', 'uk', 'vi').required(),
})
  .label('Customer');

export default schema;
