import Mailchimp from './mailchimp-type';

// eslint-disable-next-line import/prefer-default-export
export async function recursiveFetch(
  mailchimp: Mailchimp,
  url: string,
  key: string,
  offset = 0,
  count = 500,
) {
  const list: object[] = [];
  let moreAvailable = true;

  while (moreAvailable) {
    const query = {
      count,
      offset,
    };

    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await mailchimp.get(url, query);

      const currentTotal = res[key].length + offset;

      res[key].forEach((customer: object) => {
        list.push(customer);
      });

      if (currentTotal <= res.total_items) {
        moreAvailable = false;
      }
    } catch (err) {
      moreAvailable = false;
    }
  }

  return list;
}
