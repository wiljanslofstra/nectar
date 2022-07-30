import Mailchimp from 'mailchimp-api-v3';
import { Customer } from './../../types/customer';
import { WriterInput, WriterResponse } from './../../types/writer';

export default class MailchimpWriter {
  mailchimp: Mailchimp;

  constructor(key: string) {
    this.mailchimp = new Mailchimp(key);
  }

  write(input: WriterInput): WriterResponse {
    if (input.customers) {
      this.writeCustomers(input.customers);
    }

    return {

    };
  }

  writeCustomers(customers: Customer[]) {
    console.log(customers);

    this.mailchimp.batch
  }
}
