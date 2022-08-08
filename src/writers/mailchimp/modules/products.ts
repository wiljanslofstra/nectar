import Mailchimp, { MailchimpMethodReturn } from '../mailchimpType';
import { Product } from '../../../types';
import { recursiveFetch } from '../helpers';

export default async function writeProducts(
  mailchimp: Mailchimp,
  storeId: string,
  products: Product[],
): Promise<MailchimpMethodReturn> {
  const existingProducts = await recursiveFetch(mailchimp, `/ecommerce/stores/${storeId}/products`, 'products');
  const existingProductIds = existingProducts.map((product: any) => product.id);

  const updates = products.map((product) => {
    const productId = product.id;

    const body = {
      description: product.description,
      handle: product.handle,
      id: product.id,
      image_url: product.image_url,
      published_at_foreign: product.published_at_foreign,
      store_id: product.store_id,
      title: product.title,
      type: product.type,
      url: product.url,
      vendor: product.vendor,
      variants: product.variants.map((variant) => ({
        id: variant.id,
        image_url: variant.image_url,
        inventory_quantity: variant.inventory_quantity,
        price: variant.price,
        sku: variant.sku,
        title: variant.title,
        url: variant.url,
        visibility: variant.visibility,
      })),
    };

    if (existingProductIds.indexOf(productId) < 0) {
      return {
        method: 'POST',
        path: `/ecommerce/stores/${storeId}/products`,
        body,
      };
    }

    return {
      method: 'PATCH',
      path: `/ecommerce/stores/${storeId}/products/${productId}`,
      body,
    };
  });

  const res = await mailchimp.batch(updates);

  if (!Array.isArray(res)) {
    return {
      errors: [
        new Error('Batch should\'ve returned an array'),
      ],
    };
  }

  return {
    errors: res.filter((item) => {
      return !Number.isNaN(parseInt(item.status, 10));
    }),
    response: res,
  };
}
