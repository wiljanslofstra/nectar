import Joi from 'joi';
import { Customer } from '../types/input';
import { ValidatorResponse } from '../types/validator';

const schema = Joi.object({
  first_name: Joi
    .string()
    .max(200)
    .required(),
  last_name: Joi
    .string()
    .max(200)
    .required(),
  email_address: Joi
    .string()
    .max(200)
    .required(),
  status: Joi
    .string()
    .max(200)
    .required(),
  language: Joi
    .string()
    .max(200)
    .required(),
  custom_fields: Joi
    .object(),
  tags: Joi
    .array()
    .items(Joi.string()),
});

export default function customerValidator(obj: any): ValidatorResponse<Customer> {
  return schema.validate(obj, {
    abortEarly: false,
  });
}
