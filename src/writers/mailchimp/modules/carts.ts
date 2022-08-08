import { Cart } from '../../../types/cart';
import Mailchimp, { MailchimpMethodReturn } from '../mailchimpType';
import { recursiveFetch } from '../helpers';

function cartToBody(cart: Cart) {
  return {
    id: cart.id,
    currency_code: cart.currency_code || 'EUR',
    customer: {
      id: cart.customer.id,
      email_address: cart.customer.email_address,
      address: cart.customer.address || {},
      company: cart.customer.company,
      first_name: cart.customer.first_name,
      last_name: cart.customer.last_name,
      opt_in_status: cart.customer.status === 'subscribed',
    },
    lines: cart.lines.map((line) => {
      return {
        id: line.id,
        product_id: line.product_id,
        product_variant_id: line.product_variant_id,
        price: line.price,
        quantity: line.quantity,
      };
    }),
    order_total: cart.order_total,
    checkout_url: cart.checkout_url,
    store_id: cart.store_id,
    tax_total: cart.tax_total,
  };
}

export default async function writeCarts(
  mailchimp: Mailchimp,
  storeId: string,
  carts: Cart[],
): Promise<MailchimpMethodReturn> {
  const existingCarts = await recursiveFetch(mailchimp, `/ecommerce/stores/${storeId}/carts`, 'carts');
  const existingCartIds = existingCarts.map((order: any) => order.id);

  const updates = carts.map((cart) => {
    const cartId = cart.id;
    const body = cartToBody(cart);

    if (existingCartIds.indexOf(cartId) < 0) {
      return {
        method: 'POST',
        path: `/ecommerce/stores/${storeId}/carts`,
        body,
      };
    }

    return {
      method: 'PATCH',
      path: `/ecommerce/stores/${storeId}/carts/${cartId}`,
      body,
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
