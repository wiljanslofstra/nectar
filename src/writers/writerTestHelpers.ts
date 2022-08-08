import StubReader from '../readers/stubReader';

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
