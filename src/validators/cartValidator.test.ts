import StubReader from '../readers/stubReader';
import cartValidator from './cartValidator';

test('should validate succesfully', async () => {
  const carts = await (new StubReader()).fetch('carts.json');

  if (!carts || !Array.isArray(carts)) {
    throw new Error('cart should not be null or empty');
  }

  const cart = carts[0];

  const { error } = cartValidator(cart);

  expect(error).toBe(undefined);
});

test('should return errors', async () => {
  const cart = await (new StubReader()).fetch('cart-invalid.json');

  if (!cart || Array.isArray(cart)) {
    throw new Error('cart should not be null or empty');
  }

  const { error } = cartValidator(cart);

  if (!error) {
    throw new Error('error should not be empty');
  }

  const hasCustomerError = error.message.indexOf('"customer" is required') >= 0;

  expect(hasCustomerError).toBe(true);
});
