import MockReader from './readers/mockReader';
import Config from './types/config';
import MailchimpWriter from './writers/mailchimpWriter';

const config: Config = {
  reader: new MockReader(),
  readerPaths: {
    customers: 'customers.json',
  },
  writers: [
    new MailchimpWriter(),
  ],
};

export default config;
