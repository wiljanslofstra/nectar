import { WriterInput, WriterResponse } from '../../types/writer';
import MailchimpType from './mailchimp-type';
import writeSite from './modules/site';
import writeMembers from './modules/members';
import writeStore from './modules/store';
import writeCustomers from './modules/customers';
import writeProducts from './modules/products';

export default class MailchimpWriter {
  mailchimp: MailchimpType;

  constructor(mailchimp: MailchimpType) {
    this.mailchimp = mailchimp;
  }

  async write(input: WriterInput): Promise<WriterResponse> {
    if (input.site) {
      await writeSite(this.mailchimp, input.site);
    }

    if (input.members) {
      await writeMembers(this.mailchimp, input.members);
    }

    // Store is required to send customers and other e-commerce data.
    if (input.store) {
      await writeStore(this.mailchimp, input.store);

      if (input.customers) {
        await writeCustomers(this.mailchimp, input.store.id, input.customers);
      }

      if (input.products) {
        await writeProducts(this.mailchimp, input.store.id, input.products);
      }

      // Write orders

      // Write carts
    }

    return {
      //
    };
  }
}
