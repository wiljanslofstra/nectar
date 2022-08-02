import StubReader from '../readers/stubReader';
import siteValidator from './siteValidator';

test('should validate succesfully', async () => {
  const site = await (new StubReader()).fetch('site.json');

  if (!site || Array.isArray(site)) {
    throw new Error('site should not be null or empty');
  }

  const { error } = siteValidator(site);

  expect(error).toBe(undefined);
});

test('should return errors', async () => {
  const site = await (new StubReader()).fetch('site-invalid.json');

  if (!site || Array.isArray(site)) {
    throw new Error('site should not be null or empty');
  }

  const { error } = siteValidator(site);

  if (!error) {
    throw new Error('error should not be empty');
  }

  const hasIdError = error.message.indexOf('"id" is required') >= 0;

  expect(hasIdError).toBe(true);
});
