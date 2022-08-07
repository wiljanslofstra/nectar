import { Cart } from '../../../types/cart';
import { mailchimpMock, readStubArray, readStubObject } from '../mailchimp-test-helpers';
import writeCarts from './carts';

test('should handle carts', async () => {
  const inputCarts = await readStubArray('carts.json') as Cart[];
  const mailchimpCartsBatchResponse = await readStubArray('mc-carts-batch.json');
  const mailchimpCartsListResponse = await readStubObject('mc-carts-list.json');

  const mailchimp = mailchimpMock({
    get: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpCartsListResponse);
        });
      }),
    batch: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpCartsBatchResponse);
        });
      }),
  });

  const res = await writeCarts(mailchimp, 'store123', inputCarts);

  expect(res.errors).toHaveLength(1);
  expect(res.response).toHaveLength(2);
});
