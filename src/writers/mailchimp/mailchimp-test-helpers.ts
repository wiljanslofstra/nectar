import StubReader from '../../readers/stubReader';
import Mailchimp from './mailchimp-type';

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

export async function readStubObject(name: string): Promise<object> {
  const input = await (new StubReader()).fetch(name);

  if (!input) {
    throw new Error(`${name} should not be null or empty`);
  }

  if (Array.isArray(input)) {
    throw new Error(`${name} should be an object`);
  }

  return input;
}

export async function readStubArray(name: string): Promise<object[]> {
  const input = await (new StubReader()).fetch(name);

  if (!input) {
    throw new Error(`${name} should not be null or empty`);
  }

  if (!Array.isArray(input)) {
    throw new Error(`${name} should be an array`);
  }

  return input;
}
