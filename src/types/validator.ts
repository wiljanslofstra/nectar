import { Site } from './site';
import { Customer } from './customer';
import { Member } from './member';

export interface ValidatorResponse<T> {
  error?: Error;
  value: T;
}

export type Validator<T> = (obj: any) => ValidatorResponse<T>;

export type Validators = {
  customers: Validator<Customer>;
  members: Validator<Member>;
  site: Validator<Site>;
};
