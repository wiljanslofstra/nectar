import ActiveCampaignClient from './client';

// eslint-disable-next-line import/prefer-default-export
export function activeCampaignMock(
  overwriteObj: { [key: string]: Function },
): ActiveCampaignClient {
  const client: any = new ActiveCampaignClient('test123', 'test234');

  Object.keys(overwriteObj).forEach((key) => {
    client[key] = overwriteObj[key];
  });

  if (overwriteObj.request === undefined) {
    client.request = () => {
      return {};
    };
  }

  return client;
}
