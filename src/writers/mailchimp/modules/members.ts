import crypto from 'crypto';
import Mailchimp, { MailchimpMethodReturn } from '../mailchimp-type';
import { Member } from '../../../types/member';

export default async function writeMembers(
  mailchimp: Mailchimp,
  members: Member[],
): Promise<MailchimpMethodReturn> {
  const updates: object[] = [];

  members.forEach((member) => {
    const subscriberHash = crypto.createHash('md5').update(member.email_address.toLowerCase()).digest('hex');

    member.list_ids.forEach((listId) => {
      updates.push({
        method: 'PUT',
        path: `/lists/${listId}/members/${subscriberHash}`,
        body: {
          email_address: member.email_address,
          status: member.status,
          merge_fields: member.custom_fields || {},
          language: member.language,
        },
      });
    });
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
