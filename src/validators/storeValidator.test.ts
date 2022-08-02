import StubReader from '../readers/stubReader';
import storeValidator from './storeValidator';

test('should validate succesfully', async () => {
  const store = await (new StubReader()).fetch('store.json');

  if (!store || Array.isArray(store)) {
    throw new Error('store should not be null or empty');
  }

  const { error } = storeValidator(store);

  expect(error).toBe(undefined);
});

test('should return errors', async () => {
  const store = await (new StubReader()).fetch('store-invalid.json');

  if (!store || Array.isArray(store)) {
    throw new Error('store should not be null or empty');
  }

  const { error } = storeValidator(store);

  if (!error) {
    throw new Error('error should not be empty');
  }

  const hasListIdError = error.message.indexOf('"list_id" is required') >= 0;

  expect(hasListIdError).toBe(true);
});
