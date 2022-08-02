import { Product } from '../types/product';
import schema from '../schemas/product';
import { ValidatorResponse } from '../types/validator';

export default function productValidator(obj: any): ValidatorResponse<Product> {
  const result = schema.validate(obj, {
    abortEarly: false,
  });

  return {
    error: result.error,
    value: result.value,
  };
}
