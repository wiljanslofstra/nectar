import { Order } from '../../../types/order';
import SpotlerClient from '../client';
import { SpotlerMethodReturn } from '../spotlerType';

export default async function writeOrders(
  client: SpotlerClient,
  orders: Order[],
): Promise<SpotlerMethodReturn> {
  const updates: any[] = [];

  orders.forEach((order) => {
    updates.push({
      update: true,
      order: {
        externalContactId: order.customer.id,
        date: order.created_at,
        value: order.order_total * 100,
        externalProductIds: order.lines
          .filter((line) => line.product_id)
          .map((line) => line.product_id),
      },
    });
  });

  const errors: Error[] = [];
  const responses = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const update of updates) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await client.post('/order', update);

      responses.push(res);
    } catch (err) {
      if (err instanceof Error) {
        errors.push(err);
      }
    }
  }

  return {
    errors,
    response: responses,
  };
}
