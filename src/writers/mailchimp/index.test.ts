import MailchimpWriter from '.';
import StubReader from '../../readers/stubReader';
import Mailchimp from './mailchimp-type';

const mailchimpMock: Mailchimp = { 
  get: async () => {},
  post: async () => {},
  put: async () => {},
  patch: async () => {},
  delete: async () => {},
  batch: async () => {},
};

test('should handle customers', async () => {
  const inputCustomers = await (new StubReader()).fetch('customers.json');
  const mailchimpCustomersBatchResponse = await (new StubReader()).fetch('mc-customers-batch.json');

  if (!inputCustomers || !Array.isArray(inputCustomers)) {
    throw new Error('customers should not be null or empty');
  }
 
  const mailchimp = {
    ...mailchimpMock,
    batch: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(mailchimpCustomersBatchResponse);
      });
    }),
  };
  
  const res = await (new MailchimpWriter(mailchimp)).writeCustomers('store123', inputCustomers);

  expect(res.errors).toHaveLength(1);
  expect(res.response).toHaveLength(2);
});

test('should handle members', async () => {
  const inputMembers = await (new StubReader()).fetch('members.json');
  const mailchimpMembersBatchResponse = await (new StubReader()).fetch('mc-members-batch.json');

  if (!inputMembers || !Array.isArray(inputMembers)) {
    throw new Error('members should not be null or empty');
  }
 
  const mailchimp = {
    ...mailchimpMock,
    batch: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(mailchimpMembersBatchResponse);
      });
    }),
  };
  
  const res = await (new MailchimpWriter(mailchimp)).writeMembers(inputMembers);

  expect(res.errors).toHaveLength(1);
  expect(res.response).toHaveLength(2);
});
