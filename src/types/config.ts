import { Reader } from './reader';

export default interface Config {
  reader: Reader;
  readerPaths: { [key: string]: string };
  writers: {
    mailchimp?: {
      key: string;
    },
    activeCampaign?: {
      accountName: string;
      token: string;
    },
    spotler?: {
      host: string;
      key: string;
      secret: string;
    },
    fake?: {
      key: string;
    },
  };
}
