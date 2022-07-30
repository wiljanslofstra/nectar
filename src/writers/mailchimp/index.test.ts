import { describe, expect, it } from 'bun:test';
import MailchimpWriter from '.';
import MockReader from '../../readers/mockReader';

describe('Mailchimp writer', async () => {
  it('should handle customers', async () => {
    const customers = await (new MockReader()).fetch('customers.json');

    if (!customers || !customers.length) {
      throw new Error('customers should not be null or empty');
    }
    
    (new MailchimpWriter('test')).writeCustomers(customers);
  });
});
