import Mailchimp, { MailchimpMethodReturn } from '../mailchimp-type';
import { Customer } from '../../../types/customer';

export default async function writeCustomers(
  mailchimp: Mailchimp,
  storeId: string,
  customers: Customer[],
): Promise<MailchimpMethodReturn> {
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
        address: customer.address || {},
      },
    };
  });

  const res = await mailchimp.batch(updates);

  if (!Array.isArray(res)) {
    return {
      errors: [
        new Error('Batch should\'ve returned an array'),
      ],
    };
  }

  return {
    errors: res.filter((item) => {
      return !Number.isNaN(parseInt(item.status, 10));
    }),
    response: res,
  };
}
