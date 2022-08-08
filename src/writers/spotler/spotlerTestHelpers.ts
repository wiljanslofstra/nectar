import SpotlerClient from './client';

// eslint-disable-next-line import/prefer-default-export
export function spotlerMock(
  overwriteObj: { [key: string]: Function },
): SpotlerClient {
  const client: any = new SpotlerClient('host.com', 'key-123', 'secret-123');

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
