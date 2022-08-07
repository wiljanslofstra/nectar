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

  const membersWithTags = members.filter((member) => member.tags);
  const tagUpdates: object[] = [];

  membersWithTags.forEach((member: Member) => {
    const subscriberHash = crypto.createHash('md5').update(member.email_address.toLowerCase()).digest('hex');

    member.list_ids.forEach((listId) => {
      tagUpdates.push({
        method: 'POST',
        path: `/lists/${listId}/members/${subscriberHash}/tags`,
        body: {
          tags: member.tags?.map((tag) => {
            return {
              name: tag,
              status: 'active',
            };
          }),
        },
      });
    });
  });

  let responses = res;
  let errors = res.filter((item) => {
    return !Number.isNaN(parseInt(item.status, 10));
  });

  if (tagUpdates.length) {
    const tagsRes = await mailchimp.batch(tagUpdates);

    if (Array.isArray(tagsRes)) {
      responses = responses.concat(tagsRes);
      errors = errors.concat(tagsRes.filter((item) => {
        return !Number.isNaN(parseInt(item.status, 10));
      }));
    }
  }

  return {
    errors,
    response: responses,
  };
}
