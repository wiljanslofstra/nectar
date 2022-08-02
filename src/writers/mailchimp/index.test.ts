import { Site } from '../../types/site';
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

it('should only get site when exists', async () => {
  const inputSite = await (new StubReader()).fetch('site.json') as Site;
  const mailchimpConnectedSiteGet = await (new StubReader()).fetch('mc-connected-site-get.json');
  const mailchimpConnectedSitePost = await (new StubReader()).fetch('mc-connected-site-post.json');

  if (!inputSite || Array.isArray(inputSite)) {
    throw new Error('site should not be null or empty');
  }

  const mailchimp = {
    ...mailchimpMock,
    get: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpConnectedSiteGet);
        });
      }),
    post: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpConnectedSitePost);
        });
      }),
  };

  const res = await (new MailchimpWriter(mailchimp)).writeSite(inputSite);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
  expect(mailchimp.get).toHaveBeenCalled();
  expect(mailchimp.post).toHaveBeenCalledTimes(0);
});

it('should only get site when exists', async () => {
  const inputSite = await (new StubReader()).fetch('site.json') as Site;
  const mailchimpConnectedSitePost = await (new StubReader()).fetch('mc-connected-site-post.json');

  if (!inputSite || Array.isArray(inputSite)) {
    throw new Error('site should not be null or empty');
  }

  const mailchimp = {
    ...mailchimpMock,
    get: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          reject(new Error('Not found'));
        });
      }),
    post: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpConnectedSitePost);
        });
      }),
  };

  const res = await (new MailchimpWriter(mailchimp)).writeSite(inputSite);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
  expect(mailchimp.get).toHaveBeenCalled();
  expect(mailchimp.post).toHaveBeenCalled();
});
