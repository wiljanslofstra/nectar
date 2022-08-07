import StubReader from '../readers/stubReader';
import orderValidator from './orderValidator';

test('should validate succesfully', async () => {
  const orders = await (new StubReader()).fetch('orders.json');

  if (!orders || !Array.isArray(orders)) {
    throw new Error('orders should not be null or empty');
  }
  const order = orders[0];

  const { error } = orderValidator(order);

  expect(error).toBe(undefined);
});

test('should return errors', async () => {
  const order = await (new StubReader()).fetch('order-invalid.json');

  if (!order || Array.isArray(order)) {
    throw new Error('order should not be null or empty');
  }

  const { error } = orderValidator(order);

  if (!error) {
    throw new Error('error should not be empty');
  }

  const hasCustomerError = error.message.indexOf('"customer" is required') >= 0;

  expect(hasCustomerError).toBe(true);
});
