import { Store } from './store';
import { Site } from './site';
import { Customer } from './customer';
import { Member } from './member';
import { Product } from './product';

export interface ValidatorResponse<T> {
  error?: Error;
  value: T;
}

export type Validator<T> = (obj: any) => ValidatorResponse<T>;

export type Validators = {
  customers: Validator<Customer>;
  members: Validator<Member>;
  site: Validator<Site>;
  store: Validator<Store>;
  products: Validator<Product>;
};
