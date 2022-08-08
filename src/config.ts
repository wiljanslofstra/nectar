import StubReader from './readers/stubReader';
import Config from './types/config';

const config: Config = {
  reader: new StubReader(),
  readerPaths: {
    members: 'members.json',
    site: 'site.json',
    store: 'store.json',
    customers: 'customers.json',
    products: 'products.json',
    orders: 'orders.json',
  },
  writers: {
    mailchimp: {
      key: process.env.MAILCHIMP_KEY || 'test123',
    },
    activeCampaign: {
      accountName: process.env.ACTIVE_CAMPAIGN_ACCOUNT || 'test123',
    },
  },
};

export default config;
