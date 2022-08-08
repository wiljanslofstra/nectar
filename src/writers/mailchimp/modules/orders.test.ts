import { Order } from '../../../types/order';
import { readStubArray, readStubObject } from '../../writerTestHelpers';
import { mailchimpMock } from '../mailchimpTestHelpers';
import writeOrders from './orders';

test('should handle orders', async () => {
  const inputOrders = await readStubArray('orders.json') as Order[];
  const mailchimpOrdersBatchResponse = await readStubArray('mc-orders-batch.json');
  const mailchimpOrdersListResponse = await readStubObject('mc-orders-list.json');

  const mailchimp = mailchimpMock({
    get: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpOrdersListResponse);
        });
      }),
    batch: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpOrdersBatchResponse);
        });
      }),
  });

  const res = await writeOrders(mailchimp, 'store123', inputOrders);

  expect(res.errors).toHaveLength(1);
  expect(res.response).toHaveLength(2);
});
