import Mailchimp from './mailchimpType';

// eslint-disable-next-line import/prefer-default-export
export function mailchimpMock(overwriteObj: { [key: string]: Function }): Mailchimp {
  return {
    get: async () => {},
    post: async () => {},
    put: async () => {},
    patch: async () => {},
    delete: async () => {},
    batch: async () => {},
    ...overwriteObj,
  };
}
