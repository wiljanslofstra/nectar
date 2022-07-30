import { Customer } from './customer';

export type WriterResponse = {
  
};

export type WriterInput = {
  customers: Customer[];
};

export interface Writer {
  write(input: WriterInput): WriterResponse;
}
