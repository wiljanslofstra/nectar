import { readStubObject } from '../../writerTestHelpers';
import { spotlerMock } from '../spotlerTestHelpers';
import writeContacts from './contacts';

test('should handle contacts', async () => {
  const response = await readStubObject('spotler-contact.json');

  const client = spotlerMock({
    post: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(response);
      });
    }),
  });

  const res = await writeContacts(client, [
    {
      email_address: 'wiljanslofstra@gmail.com',
      status: 'subscribed',
      language: 'nl',
    },
  ]);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
});
