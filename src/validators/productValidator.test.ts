import StubReader from '../readers/stubReader';
import productValidator from './productValidator';

test('should validate succesfully', async () => {
  const product = await (new StubReader()).fetch('product.json');

  if (!product || Array.isArray(product)) {
    throw new Error('product should not be null or empty');
  }

  const { error } = productValidator(product);

  expect(error).toBe(undefined);
});

test('should return errors', async () => {
  const product = await (new StubReader()).fetch('product-invalid.json');

  if (!product || Array.isArray(product)) {
    throw new Error('product should not be null or empty');
  }

  const { error } = productValidator(product);

  if (!error) {
    throw new Error('error should not be empty');
  }

  const hasTitleError = error.message.indexOf('"title" is required') >= 0;

  expect(hasTitleError).toBe(true);
});
