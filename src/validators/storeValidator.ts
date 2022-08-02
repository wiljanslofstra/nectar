import { Store } from '../types/store';
import schema from '../schemas/store';
import { ValidatorResponse } from '../types/validator';

export default function storeValidator(obj: any): ValidatorResponse<Store> {
  const result = schema.validate(obj, {
    abortEarly: false,
  });

  return {
    error: result.error,
    value: result.value,
  };
}
