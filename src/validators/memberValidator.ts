import { Member } from './../types/member';
import schema from '../schemas/member';
import { ValidatorResponse } from '../types/validator';

export default function memberValidator(obj: any): ValidatorResponse<Member> {
  const result = schema.validate(obj, {
    abortEarly: false,
  });

  return {
    error: result.error,
    value: result.value,
  };
}
