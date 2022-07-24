import { Customer } from './input';

export interface ValidatorResponse<T> {
  error?: Error;
  value: T;
}

export type Validator<T> = (obj: any) => ValidatorResponse<T>;

export type Validators = {
  customers: Validator<Customer>;
}
