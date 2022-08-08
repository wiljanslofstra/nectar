import { Member } from '../../../types';
import { ActiveCampaignMethodReturn } from '../activeCampaignType';
import ActiveCampaignClient from '../client';

type FieldValue = {
  field: string | number;
  value: string | number;
};

const memberToActiveCampaignObject = (member: Member) => {
  const fieldValues: FieldValue[] = [];
  const activeCampaignFields: any = member.active_campaign_fields;

  Object.keys(activeCampaignFields || {}).forEach((fieldKey) => {
    fieldValues.push({
      field: fieldKey,
      value: activeCampaignFields[fieldKey] !== undefined
        ? activeCampaignFields[fieldKey]
        : '',
    });
  });

  return {
    contact: {
      email: member.email_address,
      firstName: member.first_name,
      lastName: member.last_name,
      phone: member.active_campaign_phone_number,
      fieldValues,
    },
  };
};

export default async function writeContacts(
  client: ActiveCampaignClient,
  members: Member[],
): Promise<ActiveCampaignMethodReturn> {
  const updates = members.map(memberToActiveCampaignObject);

  const errors: Error[] = [];
  const responses = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const update of updates) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await client.post('/contact/sync', update);

      responses.push(res);
    } catch (err) {
      if (err instanceof Error) {
        errors.push(err);
      }
    }
  }

  return {
    errors,
    response: responses,
  };
}
