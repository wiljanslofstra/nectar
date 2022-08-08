import { readStubObject } from '../../writerTestHelpers';
import { activeCampaignMock } from '../activeCampaignTestHelpers';
import writeContacts from './contacts';

test('should handle contacts', async () => {
  const response = await readStubObject('active-campaign-contact.json');

  const client = activeCampaignMock({
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
