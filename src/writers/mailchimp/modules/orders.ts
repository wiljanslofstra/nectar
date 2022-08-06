import { Order } from '../../../types/order';
import Mailchimp, { MailchimpMethodReturn } from '../mailchimp-type';
import { recursiveFetch } from '../helpers';

function orderToBody(order: Order) {
  return {
    id: order.id,
    cancelled_at: order.cancelled_at,
    created_at: order.created_at,
    currency_code: order.currency_code || 'EUR',
    customer: {
      id: order.customer.id,
      email_address: order.customer.email_address,
      address: order.customer.address || {},
      company: order.customer.company,
      first_name: order.customer.first_name,
      last_name: order.customer.last_name,
      opt_in_status: order.customer.status === 'subscribed',
    },
    discount_total: order.discount_total,
    financial_status: order.financial_status,
    fulfillment_status: order.fulfillment_status,
    lines: order.lines.map((line) => {
      return {
        id: line.id,
        product_id: line.product_id,
        product_variant_id: line.product_variant_id,
        discount: line.discount,
        price: line.price,
        quantity: line.quantity,
      };
    }),
    tracking_code: order.mailchimp_tracking_code,
    order_total: order.order_total,
    order_url: order.order_url,
    billing_address: order.billing_address || {},
    shipping_address: order.shipping_address || {},
    shipping_total: order.shipping_total,
    store_id: order.store_id,
    tax_total: order.tax_total,
    tracking_carrier: order.tracking_carrier,
    tracking_number: order.tracking_number,
    tracking_url: order.tracking_url,
    updated_at: order.updated_at,
  };
}

export default async function writeProducts(
  mailchimp: Mailchimp,
  storeId: string,
  orders: Order[],
): Promise<MailchimpMethodReturn> {
  const existingOrders = await recursiveFetch(mailchimp, `/ecommerce/stores/${storeId}/orders`, 'orders');
  const existingOrderIds = existingOrders.map((product: any) => product.id);

  const updates = orders.map((order) => {
    const orderId = order.id;
    const body = orderToBody(order);

    if (existingOrderIds.indexOf(orderId) < 0) {
      return {
        method: 'POST',
        path: `/ecommerce/stores/${storeId}/orders`,
        body,
      };
    }

    return {
      method: 'PATCH',
      path: `/ecommerce/stores/${storeId}/orders/${orderId}`,
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
