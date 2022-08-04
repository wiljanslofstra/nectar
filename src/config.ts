import Mailchimp from 'mailchimp-api-v3';
import StubReader from './readers/stubReader';
import Config from './types/config';
import MailchimpWriter from './writers/mailchimp';

const config: Config = {
  reader: new StubReader(),
  readerPaths: {
    members: 'members.json',
    site: 'site.json',
    store: 'store.json',
    customers: 'customers.json',
    products: 'products.json',
  },
  writers: [
    new MailchimpWriter(new Mailchimp(process.env.MAILCHIMP_KEY || 'test123')),
  ],
};

export default config;
