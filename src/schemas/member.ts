import * as Joi from 'joi';

const schema = Joi.object({
  mailchimp_list_ids: Joi.array().items(Joi.string()),
  email_address: Joi.string().email().max(200).required(),
  status: Joi.string().allow('subscribed', 'unsubscribed', 'transactional').required(),
  language: Joi.string()
    // Source: https://mailchimp.com/help/view-and-edit-contact-languages/
    .allow('en', 'ar', 'af', 'be', 'bg', 'ca', 'zh', 'hr', 'cs', 'da', 'nl', 'et', 'fa', 'fi', 'fr', 'fr_CA', 'de', 'el', 'he', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'ja', 'km', 'ko', 'lv', 'lt', 'mt', 'ms', 'mk', 'no', 'pl', 'pt', 'pt_PT', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'es_ES', 'sw', 'sv', 'ta', 'th', 'tr', 'uk', 'vi')
    .required(),
  custom_fields: Joi
    .object()
    .pattern(Joi.string(), Joi.alternatives().try(Joi.string(), Joi.number())),
  tags: Joi.array().items(Joi.string()),
  active_campaign_first_name: Joi.string(),
  active_campaign_last_name: Joi.string(),
  active_campaign_phone_number: Joi.string(),
  active_campaign_fields: Joi
    .object()
    .pattern(Joi.number(), Joi.alternatives().try(Joi.string(), Joi.number())),
})
  .label('Member');

export default schema;
