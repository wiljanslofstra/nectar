import { readStubObject } from '../../writerTestHelpers';
import { spotlerMock } from '../spotlerTestHelpers';
import writeProducts from './products';

test('should handle products', async () => {
  const response = await readStubObject('spotler-product.json');

  const client = spotlerMock({
    post: jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve) => {
        resolve(response);
      });
    }),
  });

  const res = await writeProducts(client, [
    {
      id: 'product-id-1',
      store_id: 'store-123',
      title: 'Product',
      variants: [
        {
          id: 'product-id-1',
          title: 'Product variant title',
        },
      ],
    },
  ]);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
});
