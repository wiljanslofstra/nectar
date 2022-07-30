import schema from '../schemas/customer';
import { Customer } from '../types';
import { ValidatorResponse } from '../types/validator';

export default function customerValidator(obj: any): ValidatorResponse<Customer> {
  const result = schema.validate(obj, {
    abortEarly: false,
  });

  return {
    error: result.error,
    value: result.value,
  };
}
