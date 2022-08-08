import Mailchimp, { MailchimpMethodReturn } from '../mailchimpType';
import { Site } from '../../../types/site';

const getSite = async (mailchimp: Mailchimp, site: Site): Promise<Array<Error | any>> => {
  try {
    const response = await mailchimp.get(`/connected-sites/${site.id}`);
    return [null, response];
  } catch (err) {
    return [err];
  }
};

const updateSite = async (
  mailchimp: Mailchimp,
  site: Site,
  body: any,
): Promise<Array<Error | any>> => {
  try {
    const response = await mailchimp.patch(`/connected-sites/${site.id}`, body);
    return [null, response];
  } catch (err) {
    return [err];
  }
};

const createSite = async (
  mailchimp: Mailchimp,
  site: Site,
  body: any,
): Promise<Array<Error | any>> => {
  try {
    const response = await mailchimp.post('/connected-sites', body);
    return [null, response];
  } catch (err) {
    return [err];
  }
};

export default async function writeSite(
  mailchimp: Mailchimp,
  site: Site,
): Promise<MailchimpMethodReturn> {
  const [err] = await getSite(mailchimp, site);

  const body = {
    id: site.id,
    domain: site.domain,
  };

  // If the existing site did return with an error, it probably
  // means it doesnt exist yet. So we create one.
  if (err) {
    const [createErr, createResponse] = await createSite(mailchimp, site, body);

    return {
      errors: createErr ? [createErr as Error] : [],
      response: [createResponse],
    };
  }

  // Update existing site.
  const [updateErr, updateResponse] = await updateSite(mailchimp, site, body);

  return {
    errors: updateErr ? [updateErr as Error] : [],
    response: [updateResponse],
  };
}
