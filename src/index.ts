import bunyan from 'bunyan';
import Mailchimp from 'mailchimp-api-v3';
import Config from './types/config';
import { Writer } from './types/writer';
import { FetchResponses } from './types/reader';
import { Validators } from './types/validator';
import customerValidator from './validators/customerValidator';
import memberValidator from './validators/memberValidator';
import productValidator from './validators/productValidator';
import siteValidator from './validators/siteValidator';
import storeValidator from './validators/storeValidator';
import MailchimpWriter from './writers/mailchimp';
import FakeWriter from './writers/fake';
import cartValidator from './validators/cartValidator';
import orderValidator from './validators/orderValidator';

const validators: Validators = {
  customers: customerValidator,
  members: memberValidator,
  site: siteValidator,
  store: storeValidator,
  products: productValidator,
  orders: orderValidator,
  carts: cartValidator,
};

type RunResponse = {
  errors?: { [key: string]: Error[] },
};

class Nectar {
  config: Config;

  log: bunyan;

  writers: Writer[];

  constructor(config: Config) {
    this.config = config;
    this.log = bunyan.createLogger({
      name: 'nectar',
      streams: [
        {
          level: 'info',
          stream: process.stdout,
        },
        {
          level: 'info',
          path: 'nectar-info.log',
        },
      ],
    });

    this.writers = this.writerConfigToWriters(this.config.writers);

    this.writers.forEach((writer) => {
      writer.attachLogger(this.log);
    });
  }

  async run(): Promise<RunResponse> {
    const fetchResponses = await this.fetch();
    const { errors, values } = this.validateFetchResponses(fetchResponses);

    if (Object.keys(errors).length) {
      return {
        errors: {
          validation: Object.values(errors).flat(1),
        },
      };
    }

    const writerErrors: { [key: string]: Error[] } = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const writer of this.writers) {
      // eslint-disable-next-line no-await-in-loop
      const { errors: writeErrors } = await writer.write({
        site: values.site && values.site.length ? values.site[0] : null,
        store: values.store && values.store.length ? values.store[0] : null,
        customers: values.customers,
        members: values.members,
        products: values.products,
      });

      if (writeErrors && Object.keys(writeErrors).length) {
        const writerName = writer.constructor.name;

        writerErrors[writerName] = writeErrors;
      }
    }

    return {
      errors: writerErrors,
    };
  }

  validateFetchResponses(fetchResponses: FetchResponses) {
    const errors: { [key: string]: Error[] } = {};
    const values: { [key: string]: any[] } = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, items] of Object.entries(fetchResponses)) {
      const {
        errors: itemErrors,
        itemValues,
      } = this.validateFetchResponse(key, items);

      if (itemErrors.length) {
        errors[key] = itemErrors;
      }

      values[key] = itemValues;
    }

    return { errors, values };
  }

  // eslint-disable-next-line class-methods-use-this
  validateFetchResponse(key: string, items: any[] | object) {
    const validator = validators[key as keyof Validators];

    if (!validator) {
      throw new Error(`Validator for key ${key} not found`);
    }

    const errors: Error[] = [];
    const itemValues: any[] = [];

    if (Array.isArray(items)) {
      // Loop over every item (like a product, customer, order, etc)
      items.forEach((item) => {
        // Validate the object
        const { error, value } = validator(item);

        if (error) {
          errors.push(error);
          return;
        }

        itemValues.push(value);
      });

      return { errors, itemValues };
    }

    const { error, value } = validator(items);

    return {
      errors: error ? [error] : [],
      itemValues: [value],
    };
  }

  async fetch(): Promise<FetchResponses> {
    const fetchResponses: FetchResponses = {};
    const { reader, readerPaths } = this.config;

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, readerPath] of Object.entries(readerPaths)) {
      // Fetch data to be exported
      // eslint-disable-next-line no-await-in-loop
      const response = await reader.fetch(readerPath);

      if (!response) {
        throw new Error(`Could not fetch ${readerPath}`);
      }

      fetchResponses[key] = response;
    }

    return fetchResponses;
  }

  // eslint-disable-next-line class-methods-use-this
  writerConfigToWriters(writers: Config['writers']): Writer[] {
    const writerInstances = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [writerKey, writerConfig] of Object.entries(writers)) {
      if (writerKey === 'mailchimp' && writerConfig) {
        writerInstances.push(new MailchimpWriter(new Mailchimp(writerConfig.key)));
      }

      if (writerKey === 'fake' && writerConfig) {
        writerInstances.push(new FakeWriter());
      }
    }

    return writerInstances;
  }
}

export default Nectar;
