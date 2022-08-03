import { Store } from '../../types/store';
import { Site } from '../../types/site';
import { Customer } from '../../types/customer';
import { Member } from '../../types/member';
import MailchimpWriter from '.';
import { mailchimpMock, readStubArray, readStubObject } from './mailchimp-test-helpers';

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

  const res = await (new MailchimpWriter(mailchimp)).writeCustomers('store123', inputCustomers);

  expect(res.errors).toHaveLength(1);
  expect(res.response).toHaveLength(2);
});

test('should handle members', async () => {
  const inputMembers = await readStubArray('members.json') as Member[];
  const mailchimpMembersBatchResponse = await readStubArray('mc-members-batch.json');

  const mailchimp = mailchimpMock({
    batch: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(mailchimpMembersBatchResponse);
      });
    }),
  });

  const res = await (new MailchimpWriter(mailchimp)).writeMembers(inputMembers);

  expect(res.errors).toHaveLength(1);
  expect(res.response).toHaveLength(2);
});

test('should only get site when exists', async () => {
  const inputSite = await readStubObject('site.json') as Site;
  const mailchimpConnectedSiteGet = await readStubObject('mc-connected-site-get.json');
  const mailchimpConnectedSitePost = await readStubObject('mc-connected-site-post.json');

  const mailchimp = mailchimpMock({
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
  });

  const res = await (new MailchimpWriter(mailchimp)).writeSite(inputSite);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
  expect(mailchimp.get).toHaveBeenCalled();
  expect(mailchimp.post).toHaveBeenCalledTimes(0);
});

test('should create site if not exists', async () => {
  const inputSite = await readStubObject('site.json') as Site;
  const mailchimpConnectedSitePost = await readStubObject('mc-connected-site-post.json');

  const mailchimp = mailchimpMock({
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
  });

  const res = await (new MailchimpWriter(mailchimp)).writeSite(inputSite);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
  expect(mailchimp.get).toHaveBeenCalled();
  expect(mailchimp.post).toHaveBeenCalled();
});

test('should only get store when exists', async () => {
  const inputStore = await readStubObject('store.json') as Store;
  const mailchimpStoreGet = await readStubObject('mc-store-get.json');
  const mailchimpStorePost = await readStubObject('mc-store-post.json');

  const mailchimp = mailchimpMock({
    get: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpStoreGet);
        });
      }),
    post: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpStorePost);
        });
      }),
  });

  const res = await (new MailchimpWriter(mailchimp)).writeStore(inputStore);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
  expect(mailchimp.get).toHaveBeenCalled();
  expect(mailchimp.post).toHaveBeenCalledTimes(0);
});

test('should create store if not exists', async () => {
  const inputStore = await readStubObject('store.json') as Store;
  const mailchimpStorePost = await readStubObject('mc-store-post.json');

  const mailchimp = mailchimpMock({
    get: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          reject(new Error('Not found'));
        });
      }),
    post: jest.fn()
      .mockImplementationOnce(() => {
        return new Promise((resolve) => {
          resolve(mailchimpStorePost);
        });
      }),
  });

  const res = await (new MailchimpWriter(mailchimp)).writeStore(inputStore);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
  expect(mailchimp.get).toHaveBeenCalled();
  expect(mailchimp.post).toHaveBeenCalled();
});
