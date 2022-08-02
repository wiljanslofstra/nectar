import Mailchimp from 'mailchimp-api-v3';
import StubReader from './readers/stubReader';
import Config from './types/config';
import MailchimpWriter from './writers/mailchimp';

const config: Config = {
  reader: new StubReader(),
  readerPaths: {
    customers: 'customers.json',
    members: 'members.json',
    site: 'site.json',
  },
  writers: [
    new MailchimpWriter(new Mailchimp('key123')),
  ],
};

export default config;
