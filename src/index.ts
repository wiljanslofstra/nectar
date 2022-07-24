import config from './config';
import { FetchResponses } from './types/reader';
import { Validators } from './types/validator';
import customerValidator from './validators/customerValidator';

const validators: Validators = {
  customers: customerValidator,
};

class Nectar {
  async run() {
    const fetchResponses = await this.fetch();
    const { errors, values } = this.validateFetchResponses(fetchResponses);

    console.log(errors, values);
  }

  validateFetchResponses(fetchResponses: FetchResponses) {
    const errors: {[key: string]: Error[]} = {};
    const values: {[key: string]: any[]} = {};

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

  validateFetchResponse(key: string, items: any[]) {
    const validator = validators[key as keyof Validators];

    if (!validator) {
      throw new Error(`Validator for key ${key} not found`);
    }

    const errors: Error[] = [];
    const itemValues: any[] = [];

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

  async fetch(): Promise<FetchResponses> {
    const fetchResponses: FetchResponses = {};
    const { reader, readerPaths } = config;

    for (const [key, readerPath] of Object.entries(readerPaths)) {
      // Fetch data to be exported
      const response = await reader.fetch(readerPath);
  
      if (!response) {
        throw new Error(`Could not fetch ${readerPath}`);
      }

      fetchResponses[key] = response;
    }

    return fetchResponses;
  }
}

(new Nectar).run();
