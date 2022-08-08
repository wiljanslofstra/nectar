import Mailchimp, { MailchimpMethodReturn } from '../mailchimpType';
import { Store } from '../../../types/store';

const getStore = async (mailchimp: Mailchimp, store: Store): Promise<Array<Error | any>> => {
  try {
    const response = await mailchimp.get(`/ecommerce/stores/${store.id}`);
    return [null, response];
  } catch (err) {
    return [err];
  }
};

const updateStore = async (
  mailchimp: Mailchimp,
  store: Store,
  body: {},
): Promise<Array<Error | any>> => {
  try {
    const response = await mailchimp.patch(`/ecommerce/stores/${store.id}`, body);
    return [null, response];
  } catch (err) {
    return [err];
  }
};

const createStore = async (
  mailchimp: Mailchimp,
  store: Store,
  body: {},
): Promise<Array<Error | any>> => {
  try {
    const response = await mailchimp.post('/ecommerce/stores', body);
    return [null, response];
  } catch (err) {
    return [err];
  }
};

export default async function writeStore(
  mailchimp: Mailchimp,
  store: Store,
): Promise<MailchimpMethodReturn> {
  // Fetch the existing store.
  const [err] = await getStore(mailchimp, store);

  const body = {
    id: store.id,
    list_id: store.list_id,
    name: store.name,
    address: store.address || {},
    currency_code: store.currency_code,
    domain: store.domain,
    email_address: store.email_address,
    money_format: store.money_format,
    phone: store.phone,
    platform: store.platform,
    primary_locale: store.primary_locale,
    timezone: store.timezone,
  };

  // If the existing store did return with an error, it probably
  // means it doesnt exist yet. So we create one.
  if (err) {
    const [createErr, createResponse] = await createStore(mailchimp, store, body);

    return {
      errors: createErr ? [createErr as Error] : [],
      response: [createResponse],
    };
  }

  // Update existing store.
  const [updateErr, updateResponse] = await updateStore(mailchimp, store, body);

  return {
    errors: updateErr ? [updateErr as Error] : [],
    response: [updateResponse],
  };
}
