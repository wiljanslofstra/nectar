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
  discount_total: Joi
    .number()
    .min(0),
  tax_total: Joi
    .number()
    .min(0),
  shipping_total: Joi
    .number()
    .min(0),
  mailchimp_tracking_code: Joi
    .string()
    .max(200),
  lines: Joi
    .array()
    .items(Joi.object({
      id: Joi.string().max(200).required(),
      product_id: Joi.string().max(200).required(),
      product_variant_id: Joi.string().max(200).required(),
      quantity: Joi.number().min(0),
      price: Joi.number().min(0),
      discount: Joi.number().min(0),
    })).required(),
  financial_status: Joi
    .string()
    .allow('paid', 'pending', 'refunded', 'cancelled'),
  fulfillment_status: Joi
    .string()
    .allow('shipped', 'pending', 'cancelled'),
  order_url: Joi
    .string()
    .uri(),
  created_at: Joi
    .string(),
  updated_at: Joi
    .string(),
  cancelled_at: Joi
    .string(),
  shipping_address: Joi.object({
    address1: Joi.string().max(200),
    address2: Joi.string().max(200),
    city: Joi.string().max(200),
    state: Joi.string().max(200),
    postal_code: Joi.string().max(20),
    country_code: Joi.string().max(2),
    name: Joi.string().max(200),
    phone: Joi.string().max(200),
    company: Joi.string().max(200),
  }),
  billing_address: Joi.object({
    address1: Joi.string().max(200),
    address2: Joi.string().max(200),
    city: Joi.string().max(200),
    state: Joi.string().max(200),
    postal_code: Joi.string().max(20),
    country_code: Joi.string().max(2),
    name: Joi.string().max(200),
    phone: Joi.string().max(200),
    company: Joi.string().max(200),
  }),
  tracking_number: Joi
    .string()
    .max(200),
  tracking_carrier: Joi
    .string()
    .max(200),
  tracking_url: Joi
    .string()
    .uri(),
  language: Joi.string()
    // Source: https://mailchimp.com/help/view-and-edit-contact-languages/
    .allow('en', 'ar', 'af', 'be', 'bg', 'ca', 'zh', 'hr', 'cs', 'da', 'nl', 'et', 'fa', 'fi', 'fr', 'fr_CA', 'de', 'el', 'he', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'ja', 'km', 'ko', 'lv', 'lt', 'mt', 'ms', 'mk', 'no', 'pl', 'pt', 'pt_PT', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'es_ES', 'sw', 'sv', 'ta', 'th', 'tr', 'uk', 'vi'),
})
  .label('Order');

export default schema;
