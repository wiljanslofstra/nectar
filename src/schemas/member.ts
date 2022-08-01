import * as Joi from 'joi';

const schema = Joi.object({
  list_ids: Joi
    .array()
    .items(Joi.string())
    .required(),
  email_address: Joi
    .string()
    .email()
    .max(200)
    .required(),
  status: Joi
    .string()
    .allow('subscribed', 'unsubscribed', 'transactional')
    .required(),
  language: Joi
    .string()
    .allow(
      // Source: https://mailchimp.com/help/view-and-edit-contact-languages/
      'en',
      'ar',
      'af',
      'be',
      'bg',
      'ca',
      'zh',
      'hr',
      'cs',
      'da',
      'nl',
      'et',
      'fa',
      'fi',
      'fr',
      'fr_CA',
      'de',
      'el',
      'he',
      'hi',
      'hu',
      'is',
      'id',
      'ga',
      'it',
      'ja',
      'km',
      'ko',
      'lv',
      'lt',
      'mt',
      'ms',
      'mk',
      'no',
      'pl',
      'pt',
      'pt_PT',
      'ro',
      'ru',
      'sr',
      'sk',
      'sl',
      'es',
      'es_ES',
      'sw',
      'sv',
      'ta',
      'th',
      'tr',
      'uk',
      'vi',
    )
    .required(),
  custom_fields: Joi
    .object()
    .pattern(Joi.string(), Joi.alternatives().try(Joi.string(), Joi.number())),
  tags: Joi
    .array()
    .items(Joi.string()),
})
  .label('Member');

export default schema;
