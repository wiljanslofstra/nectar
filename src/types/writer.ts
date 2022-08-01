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
};

export interface Writer {
  write(input: WriterInput): WriterResponse;
}
