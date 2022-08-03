import { Customer } from '../../../types';
import { mailchimpMock, readStubArray } from '../mailchimp-test-helpers';
import writeCustomers from './customers';

test('should handle customers', async () => {
  const inputCustomers = await readStubArray('customers.json') as Customer[];
  const mailchimpCustomersBatchResponse = await readStubArray('mc-customers-batch.json');

  const mailchimp = mailchimpMock({
    batch: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(mailchimpCustomersBatchResponse);
      });
    }),
  });

  const res = await writeCustomers(mailchimp, 'store123', inputCustomers);

  expect(res.errors).toHaveLength(1);
  expect(res.response).toHaveLength(2);
});
