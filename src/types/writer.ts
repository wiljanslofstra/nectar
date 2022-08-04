import bunyan from 'bunyan';
import { Product } from './product';
import { Site } from './site';
import { Store } from './store';
import { Member } from './member';
import { Customer } from './customer';

export type WriterResponse = {

};

export type WriterInput = {
  site?: Site,
  store?: Store,
  customers?: Customer[];
  members?: Member[];
  products?: Product[];
};

export interface Writer {
  write(input: WriterInput): WriterResponse;
  attachLogger(logger: bunyan): void;
}
