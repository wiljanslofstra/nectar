import { Product } from '../../../types';
import { readStubArray, readStubObject } from '../../writerTestHelpers';
import { mailchimpMock } from '../mailchimpTestHelpers';
import writeProducts from './products';

test('should handle products', async () => {
  const inputProducts = await readStubArray('products.json') as Product[];
  const mailchimpProductsBatchResponse = await readStubArray('mc-products-batch.json');
  const mailchimpProductsListResponse = await readStubObject('mc-products-list.json');

  const mailchimp = mailchimpMock({
    get: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpProductsListResponse);
        });
      }),
    batch: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpProductsBatchResponse);
        });
      }),
  });

  const res = await writeProducts(mailchimp, 'store123', inputProducts);

  expect(res.errors).toHaveLength(1);
  expect(res.response).toHaveLength(2);
});
