import MailchimpWriter from '.';
import MockReader from '../../readers/mockReader';

test('should handle customers', async () => {
  const customers = await (new MockReader()).fetch('customers.json');

  if (!customers || !customers.length) {
    throw new Error('customers should not be null or empty');
  }

  const mailchimpMock = jest.fn();
  
  (new MailchimpWriter(mailchimpMock)).writeCustomers(customers);
});
