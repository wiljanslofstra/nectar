import Mailchimp, { MailchimpMethodReturn } from '../mailchimp-type';
import { Site } from '../../../types/site';

export default async function writeSite(
  mailchimp: Mailchimp,
  site: Site,
): Promise<MailchimpMethodReturn> {
  let response = null;

  try {
    // Try fetching the connected site
    response = await mailchimp.get(`/connected-sites/${site.id}`);
  } catch (getError) {
    try {
      // Fetching failed, most likely because it doesn't exist, create site.
      response = await mailchimp.post('/connected-sites', {
        foreign_id: site.id,
        domain: site.domain,
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
