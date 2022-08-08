import { Site } from '../../../types';
import { readStubObject } from '../../writerTestHelpers';
import { mailchimpMock } from '../mailchimpTestHelpers';
import writeSite from './site';

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

  const res = await writeSite(mailchimp, inputSite);

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

  const res = await writeSite(mailchimp, inputSite);

  expect(res.errors).toHaveLength(0);
  expect(res.response).toHaveLength(1);
  expect(mailchimp.get).toHaveBeenCalled();
  expect(mailchimp.post).toHaveBeenCalled();
});
