import Mailchimp, { MailchimpMethodReturn } from '../mailchimp-type';
import { Store } from '../../../types/store';

export default async function writeStore(
  mailchimp: Mailchimp,
  store: Store,
): Promise<MailchimpMethodReturn> {
  let response = null;

  try {
    // Try fetching the store
    response = await mailchimp.get(`/ecommerce/stores/${store.id}`);
  } catch (getError) {
    try {
      // Fetching failed, most likely because it doesn't exist, create store.
      response = await mailchimp.post('/ecommerce/stores', {
        id: store.id,
        currency_code: store.currency_code,
        list_id: store.list_id,
        name: store.name,
      });
    } catch (postError) {
      return {
        errors: [postError as Error],
        response: [response],
      };
    }
  }

  return {
    errors: [],
    response: [response],
  };
}
