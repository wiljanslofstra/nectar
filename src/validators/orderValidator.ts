import { Order } from '../types/order';
import schema from '../schemas/order';
import { ValidatorResponse } from '../types/validator';

export default function orderValidator(obj: any): ValidatorResponse<Order> {
  const result = schema.validate(obj, {
    abortEarly: false,
  });

  return {
    error: result.error,
    value: result.value,
  };
}
