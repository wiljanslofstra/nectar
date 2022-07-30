import MockReader from './readers/mockReader';
import Config from './types/config';
import MailchimpWriter from './writers/mailchimp';

const config: Config = {
  reader: new MockReader(),
  readerPaths: {
    customers: 'customers.json',
  },
  writers: [
    new MailchimpWriter('key123'),
  ],
};

export default config;
