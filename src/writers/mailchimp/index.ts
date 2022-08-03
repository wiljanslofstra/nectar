import { WriterInput, WriterResponse } from '../../types/writer';
import MailchimpType from './mailchimp-type';
import writeSite from './modules/site';
import writeMembers from './modules/members';
import writeStore from './modules/store';
import writeCustomers from './modules/customers';

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

      // Write products

      // Write orders

      // Write carts
    }

    return {
      //
    };
  }

  // private async fetchCustomers(storeId: string, offset = 0) {
  //   const params = this.objToQueryParams({
  //     count: 500,
  //     offset,
  //   });
  //   const list: object[] = [];
  //   let moreAvailable = true;

  //   while (moreAvailable) {
  //     const res = await this.mailchimp.get(`/ecommerce/stores/${storeId}/customers?${params}`);
  //     const currentTotal = res.customers.length + offset;

  //     res.customers.forEach((customer: object) => {
  //       list.push(customer);
  //     });

  //     if (currentTotal <= res.total_items) {
  //       moreAvailable = false;
  //     }
  //   }

  //   return list;
  // }

  // private objToQueryParams(obj: { [key: string]: string | number }) {
  //   const str = [];

  //   for (const p in obj) {
  //     if (obj.hasOwnProperty(p)) {
  //       str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
  //     }
  //   }

  //   return str.join('&');
  // }
}
