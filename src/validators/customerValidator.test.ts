import StubReader from '../readers/stubReader';
import customerValidator from './customerValidator';

test('should validate succesfully', async () => {
  const customers = await (new StubReader()).fetch('customers.json');

  if (!customers || !Array.isArray(customers)) {
    throw new Error('customers should not be null or empty');
  }
  
  customers.forEach((customer) => {
    const { error, value } = customerValidator(customer);

    expect(error).toBe(undefined);
  });
});

test('should return errors', async () => {
  const customers = await (new StubReader()).fetch('customers-invalid.json');

  if (!customers || !Array.isArray(customers)) {
    throw new Error('customers should not be null or empty');
  }
  
  customers.forEach((customer) => {
    const { error, value } = customerValidator(customer);

    if (!error) {
      throw new Error('error should not be empty');
    }
    
    const hasEmailError = error.message.indexOf('"email_address" is required') >= 0;
    const hasLanguageError = error.message.indexOf('"language" is required') >= 0;

    expect(hasEmailError).toBe(true);
    expect(hasLanguageError).toBe(true);
  });
});
