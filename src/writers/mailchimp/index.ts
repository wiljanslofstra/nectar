import bunyan from 'bunyan';
import { Writer, WriterInput, WriterResponse } from '../../types/writer';
import MailchimpType from './mailchimpType';
import writeSite from './modules/site';
import writeMembers from './modules/members';
import writeStore from './modules/store';
import writeCustomers from './modules/customers';
import writeProducts from './modules/products';
import writeOrders from './modules/orders';

export default class MailchimpWriter implements Writer {
  mailchimp: MailchimpType;

  log?: bunyan;

  constructor(mailchimp: MailchimpType) {
    this.mailchimp = mailchimp;
  }

  attachLogger(logger: bunyan) {
    this.log = logger;
  }

  async write(input: WriterInput): Promise<WriterResponse> {
    let errors: Error[] = [];

    if (input.site) {
      // Store site.
      const { errors: siteErrors } = await writeSite(this.mailchimp, input.site);
      errors = errors.concat(siteErrors);
    }

    if (input.members) {
      // Store members.
      const { errors: membersErrors } = await writeMembers(this.mailchimp, input.members);
      errors = errors.concat(membersErrors);
    }

    // Store is required to send customers and other e-commerce data.
    if (input.store) {
      // Store store.
      const { errors: storeErrors } = await writeStore(this.mailchimp, input.store);
      errors = errors.concat(storeErrors);

      if (storeErrors.length === 0) {
        if (input.customers) {
          // Store customers.
          const { errors: customersErrors } = await writeCustomers(
            this.mailchimp,
            input.store.id,
            input.customers,
          );
          errors = errors.concat(customersErrors);
        }

        if (input.products) {
          // Store products.
          const { errors: productsErrors } = await writeProducts(
            this.mailchimp,
            input.store.id,
            input.products,
          );
          errors = errors.concat(productsErrors);
        }

        if (input.orders) {
          // Store products.
          const { errors: ordersErrors } = await writeOrders(
            this.mailchimp,
            input.store.id,
            input.orders,
          );
          errors = errors.concat(ordersErrors);
        }

        // TODO: Write carts
      }
    }

    return {
      errors,
    };
  }
}
