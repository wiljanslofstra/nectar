import { Site } from '../types/site';
import schema from '../schemas/site';
import { ValidatorResponse } from '../types/validator';

export default function siteValidator(obj: any): ValidatorResponse<Site> {
  const result = schema.validate(obj, {
    abortEarly: false,
  });

  return {
    error: result.error,
    value: result.value,
  };
}
