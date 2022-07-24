import { describe, expect, it } from 'bun:test';
import MockReader from '../readers/mockReader';
import customerValidator from './customerValidator';

describe('Customer validator', async () => {
  it('should validate succesfully', async () => {
    const customers = await (new MockReader()).fetch('customers.json');

    if (!customers || !customers.length) {
      throw new Error('customers should not be null or empty');
    }
    
    customers.forEach((customer) => {
      const { error, value } = customerValidator(customer);

      expect(error).toBe(undefined);
    });
  });

  it('should return errors', async () => {
    const customers = await (new MockReader()).fetch('customers-invalid.json');

    if (!customers || !customers.length) {
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
});
