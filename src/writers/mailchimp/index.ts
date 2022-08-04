import bunyan from 'bunyan';
import { WriterInput, WriterResponse } from '../../types/writer';
import MailchimpType from './mailchimp-type';
import writeSite from './modules/site';
import writeMembers from './modules/members';
import writeStore from './modules/store';
import writeCustomers from './modules/customers';
import writeProducts from './modules/products';

export default class MailchimpWriter {
  mailchimp: MailchimpType;

  log?: bunyan;

  constructor(mailchimp: MailchimpType) {
    this.mailchimp = mailchimp;
  }

  attachLogger(logger: bunyan) {
    this.log = logger;
  }

  async write(input: WriterInput): Promise<WriterResponse> {
    const errors: { [key: string]: Error[] } = {};

    if (input.site) {
      // Store site.
      const { errors: siteErrors } = await writeSite(this.mailchimp, input.site);
      errors.site = siteErrors;
    }

    if (input.members) {
      // Store members.
      const { errors: membersErrors } = await writeMembers(this.mailchimp, input.members);
      errors.members = membersErrors;
    }

    // Store is required to send customers and other e-commerce data.
    if (input.store) {
      // Store store.
      const { errors: storeErrors } = await writeStore(this.mailchimp, input.store);
      errors.store = storeErrors;

      if (storeErrors.length === 0) {
        if (input.customers) {
          // Store customers.
          const { errors: customersErrors } = await writeCustomers(
            this.mailchimp,
            input.store.id,
            input.customers,
          );
          errors.customers = customersErrors;
        }

        if (input.products) {
          // Store products.
          const { errors: productsErrors } = await writeProducts(
            this.mailchimp,
            input.store.id,
            input.products,
          );
          errors.products = productsErrors;
        }

        // Write orders

        // Write carts
      }
    }

    if (Object.keys(errors).length) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [, itemErrors] of Object.entries(errors)) {
        if (itemErrors.length) {
          this.log?.error(itemErrors);
        }
      }
    }

    return {
      //
    };
  }
}
