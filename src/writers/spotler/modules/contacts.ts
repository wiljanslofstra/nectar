import { Member } from '../../../types';
import SpotlerClient from '../client';
import { SpotlerMethodReturn } from '../spotlerType';

export default async function writeContacts(
  client: SpotlerClient,
  members: Member[],
): Promise<SpotlerMethodReturn> {
  const updates = members.map((member) => {
    return {
      externalId: member.id,
      properties: {
        email: member.email_address,
        firstName: member.first_name,
        lastName: member.last_name,
        language: member.language,
        permissions: member.spotler_permissions
          ? member.spotler_permissions.map((permission: string) => ({
            description: permission,
            bit: 1,
            enabled: true,
          }))
          : [],
        ...member.spotler_properties,
      },
      channels: member.spotler_channels
        ? member.spotler_channels.map((channel: string) => ({
          name: channel,
          value: true,
        }))
        : [],
    };
  });

  const errors: Error[] = [];
  const responses = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const update of updates) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await client.post('/subscription/subscribe', update);

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
