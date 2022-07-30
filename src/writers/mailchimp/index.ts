import { Customer } from './../../types/customer';
import { WriterInput, WriterResponse } from './../../types/writer';
const Mailchimp = require('mailchimp-api-v3');

export default class MailchimpWriter {
  mailchimp: typeof Mailchimp;

  constructor(mailchimp: typeof Mailchimp) {
    this.mailchimp = mailchimp;
  }

  write(input: WriterInput): WriterResponse {
    if (input.customers) {
      this.writeCustomers(input.customers);
    }

    return {
      //
    };
  }

  writeCustomers(customers: Customer[]) {
    console.log(customers);

    this.mailchimp.batch
  }
}
