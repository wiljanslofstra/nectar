import crypto from 'crypto';
import { Member } from '../../types/member';
import { Store } from '../../types/store';
import { Site } from '../../types/site';
import { Customer } from '../../types/customer';
import { WriterInput, WriterResponse } from '../../types/writer';
import MailchimpType from './mailchimp-type';

export default class MailchimpWriter {
  mailchimp: MailchimpType;

  constructor(mailchimp: MailchimpType) {
    this.mailchimp = mailchimp;
  }

  async write(input: WriterInput): Promise<WriterResponse> {
    if (input.site) {
      await this.writeSite(input.site);
    }

    if (input.members) {
      await this.writeMembers(input.members);
    }

    // Store is required to send customers and other e-commerce data.
    if (input.store) {
      await this.writeStore(input.store);

      if (input.customers) {
        await this.writeCustomers(input.store.id, input.customers);
      }

      // Write products

      // Write orders

      // Write carts
    }

    return {
      //
    };
  }

  async writeSite(site: Site) {
    let response = null;

    try {
      // Try fetching the connected site
      response = await this.mailchimp.get(`/connected-sites/${site.id}`);
    } catch (getError) {
      try {
        // Fetching failed, most likely because it doesn't exist, create site.
        response = await this.mailchimp.post('/connected-sites', {
          foreign_id: site.id,
          domain: site.domain,
        });
      } catch (postError) {
        return {
          errors: [postError],
          response: [response],
        };
      }
    }

    return {
      errors: [],
      response: [response],
    };
  }

  async writeMembers(members: Member[]) {
    const updates: object[] = [];

    members.forEach((member) => {
      const subscriberHash = crypto.createHash('md5').update(member.email_address.toLowerCase()).digest('hex');

      member.list_ids.forEach((listId) => {
        updates.push({
          method: 'PUT',
          path: `/lists/${listId}/members/${subscriberHash}`,
          body: {
            email_address: member.email_address,
            opt_in_status: member.status === 'subscribed',
          },
        });
      });
    });

    const res = await this.mailchimp.batch(updates);

    if (!Array.isArray(res)) {
      return { errors: [] };
    }

    return {
      errors: res.filter((item) => {
        return !Number.isNaN(parseInt(item.status, 10));
      }),
      response: res,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async writeStore(store: Store) {
    console.log(store);
  }

  async writeCustomers(storeId: string, customers: Customer[]) {
    const updates = customers.map((customer) => {
      const customerId = customer.id;

      return {
        method: 'PUT',
        path: `/ecommerce/stores/${storeId}/customers/${customerId}`,
        body: {
          id: customerId,
          email_address: customer.email_address,
          first_name: customer.first_name,
          last_name: customer.last_name,
          company: customer.company,
          opt_in_status: customer.status === 'subscribed',
          address: customer.address || null,
        },
      };
    });

    const res = await this.mailchimp.batch(updates);

    if (!Array.isArray(res)) {
      return { errors: [] };
    }

    return {
      errors: res.filter((item) => {
        return !Number.isNaN(parseInt(item.status, 10));
      }),
      response: res,
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
