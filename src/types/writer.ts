import bunyan from 'bunyan';
import { Product } from './product';
import { Order } from './order';
import { Site } from './site';
import { Store } from './store';
import { Member } from './member';
import { Customer } from './customer';

export type WriterResponse = {
  errors?: Error[];
};

export type WriterInput = {
  site?: Site,
  store?: Store,
  customers?: Customer[];
  members?: Member[];
  products?: Product[];
  orders?: Order[];
};

export interface Writer {
  write(input: WriterInput): Promise<WriterResponse>;
  attachLogger(logger: bunyan): void;
}
