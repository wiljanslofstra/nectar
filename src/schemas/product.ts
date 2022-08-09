import * as Joi from 'joi';

const schema = Joi.object({
  store_id: Joi.string().max(200).required(),
  id: Joi.string().max(200).required(),
  title: Joi.string().max(200).required(),
  category: Joi.string().max(200),
  variants: Joi
    .array()
    .items(Joi.object({
      id: Joi.string().max(200).required(),
      title: Joi.string().max(200).required(),
      url: Joi.string().max(200),
      sku: Joi.string().max(200),
      gtin: Joi.string().max(200),
      price: Joi.number().min(0),
      inventory_quantity: Joi.number().min(0),
      image_url: Joi.string().max(200),
      visibility: Joi.string().allow('visible', 'hidden'),
    })).required(),
  handle: Joi.string().max(200),
  url: Joi.string().max(200),
  description: Joi.string().max(500),
  type: Joi.string().max(200),
  vendor: Joi.string().max(200),
  image_url: Joi.string().max(200),
  published_at_foreign: Joi.string().max(200),
  language: Joi.string()
    // Source: https://mailchimp.com/help/view-and-edit-contact-languages/
    .allow('en', 'ar', 'af', 'be', 'bg', 'ca', 'zh', 'hr', 'cs', 'da', 'nl', 'et', 'fa', 'fi', 'fr', 'fr_CA', 'de', 'el', 'he', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'ja', 'km', 'ko', 'lv', 'lt', 'mt', 'ms', 'mk', 'no', 'pl', 'pt', 'pt_PT', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'es_ES', 'sw', 'sv', 'ta', 'th', 'tr', 'uk', 'vi'),
})
  .label('Product');

export default schema;
