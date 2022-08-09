import { readStubObject } from '../../writerTestHelpers';
import { spotlerMock } from '../spotlerTestHelpers';
import writeOrders from './orders';

test('should handle orders', async () => {
  const response = await readStubObject('spotler-order.json');

  const client = spotlerMock({
    post: jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve) => {
        resolve(response);
      });
    }),
  });

  const res = await writeOrders(client, [
    {
      id: 'order-123',
      store_id: 'store-123',
      order_total: 123.45,
      customer: {
        id: 'customer-123',
        email_address: 'test@gmail.com',
      },
      lines: [
        {
          id: 'line-1',
          product_id: 'product-id-1',
          product_variant_id: 'product-id-1',
        },
      ],
    },
  ]);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
});
