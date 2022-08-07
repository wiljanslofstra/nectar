import { Cart } from '../types/cart';
import schema from '../schemas/cart';
import { ValidatorResponse } from '../types/validator';

export default function cartValidator(obj: any): ValidatorResponse<Cart> {
  const result = schema.validate(obj, {
    abortEarly: false,
  });

  return {
    error: result.error,
    value: result.value,
  };
}
