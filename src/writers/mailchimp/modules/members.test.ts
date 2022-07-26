import { Member } from '../../../types';
import { readStubArray } from '../../writerTestHelpers';
import { mailchimpMock } from '../mailchimpTestHelpers';
import writeMembers from './members';

test('should handle members', async () => {
  const inputMembers = await readStubArray('members.json') as Member[];
  const mailchimpMembersBatchResponse = await readStubArray('mc-members-batch.json');

  const mailchimp = mailchimpMock({
    batch: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(mailchimpMembersBatchResponse);
      });
    }),
  });

  const res = await writeMembers(mailchimp, inputMembers);

  expect(res.errors).toHaveLength(2);
  expect(res.response).toHaveLength(4);
});
