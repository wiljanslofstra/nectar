import bunyan from 'bunyan';
import { Writer, WriterInput, WriterResponse } from '../../types/writer';
import SpotlerClient from './client';
import writeContacts from './modules/contacts';
import writeOrders from './modules/orders';
import writeProducts from './modules/products';

export default class SpotlerWriter implements Writer {
  log?: bunyan;

  client: SpotlerClient;

  constructor(client: SpotlerClient) {
    this.client = client;
  }

  attachLogger(logger: bunyan) {
    this.log = logger;
  }

  async write(input: WriterInput): Promise<WriterResponse> {
    let errors: Error[] = [];

    if (input.members) {
      const { errors: contactsErrors } = await writeContacts(this.client, input.members);
      errors = errors.concat(contactsErrors);
    }

    if (input.products) {
      const { errors: productsErrors } = await writeProducts(this.client, input.products);
      errors = errors.concat(productsErrors);
    }

    if (input.orders) {
      const { errors: ordersErrors } = await writeOrders(this.client, input.orders);
      errors = errors.concat(ordersErrors);
    }

    return {
      errors,
    };
  }
}
