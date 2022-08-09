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
      key: process.env.MAILCHIMP_KEY || '',
    },
    activeCampaign: {
      accountName: process.env.ACTIVE_CAMPAIGN_ACCOUNT || '',
      token: process.env.ACTIVE_CAMPAIGN_TOKEN || '',
    },
    spotler: {
      host: 'https://restapi.mailplus.nl/integrationservice-1.1.0',
      key: process.env.SPOTLER_KEY || '',
      secret: process.env.SPOTLER_SECRET || '',
    },
  },
};

export default config;
