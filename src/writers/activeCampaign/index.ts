import bunyan from 'bunyan';
import { Writer, WriterInput, WriterResponse } from '../../types/writer';
import ActiveCampaignClient from './client';
import writeContacts from './modules/contacts';

export default class ActiveCampaignWriter implements Writer {
  log?: bunyan;

  client: ActiveCampaignClient;

  constructor(client: ActiveCampaignClient) {
    this.client = client;
  }

  attachLogger(logger: bunyan) {
    this.log = logger;
  }

  // eslint-disable-next-line class-methods-use-this
  async write(input: WriterInput): Promise<WriterResponse> {
    let errors: Error[] = [];

    if (input.members) {
      const { errors: contactsErrors } = await writeContacts(this.client, input.members);
      errors = errors.concat(contactsErrors);
    }

    return {
      errors,
    };
  }
}
