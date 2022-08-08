import { Store } from '../../../types';
import { readStubObject } from '../../writerTestHelpers';
import { mailchimpMock } from '../mailchimpTestHelpers';
import writeStore from './store';

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

  const res = await writeStore(mailchimp, inputStore);

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

  const res = await writeStore(mailchimp, inputStore);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
  expect(mailchimp.get).toHaveBeenCalled();
  expect(mailchimp.post).toHaveBeenCalled();
});
