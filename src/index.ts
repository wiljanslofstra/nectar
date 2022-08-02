import Config from './types/config';
import { FetchResponses } from './types/reader';
import { Validators } from './types/validator';
import customerValidator from './validators/customerValidator';
import memberValidator from './validators/memberValidator';
import siteValidator from './validators/siteValidator';

const validators: Validators = {
  customers: customerValidator,
  members: memberValidator,
  site: siteValidator,
};

class Nectar {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async run() {
    const fetchResponses = await this.fetch();
    const { errors, values } = this.validateFetchResponses(fetchResponses);

    if (Object.keys(errors).length) {
      throw new Error(JSON.stringify(values, undefined, 2));
    }

    this.config.writers.forEach((writer) => {
      writer.write({
        site: undefined,
        store: undefined,
        customers: values.customers,
        members: [],
      });
    });
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
}

export default Nectar;
