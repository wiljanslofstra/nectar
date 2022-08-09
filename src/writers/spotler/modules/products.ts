import { Product } from '../../../types/product';
import SpotlerClient from '../client';
import { SpotlerMethodReturn } from '../spotlerType';

export default async function writeProducts(
  client: SpotlerClient,
  products: Product[],
): Promise<SpotlerMethodReturn> {
  const updates: any[] = [];

  products.forEach((product) => {
    product.variants.forEach((productVariant) => {
      updates.push({
        update: true,
        properties: {
          externalId: product.id,
          name: productVariant.title,
          description: product.description,
          link: productVariant.url,
          price: productVariant.price ? productVariant.price * 100 : 0,
          imageUrl: productVariant.image_url,
          category: product.category,
          gtin: productVariant.gtin,
          sku: productVariant.sku,
          creationDate: product.published_at_foreign,
          changeDate: product.published_at_foreign,
          language: product.language || 'en',
          stock: productVariant.inventory_quantity && productVariant.inventory_quantity > 0 ? 'GOOD' : 'LIMITED',
          deleted: false,
          visible: !productVariant.visibility || productVariant.visibility === 'visible',
          // Those fields are available in Spotler, but not in our dataset at the moment.
          // oldPrice: 0,
          // brand: '',
          // ratingImageUrl: null,
          // reviewLink: null,
          // addToCartLink: '',
          // imageLargeUrl: productVariant.image_url,
          // ratingValue: null,
        },
      });
    });
  });

  const errors: Error[] = [];
  const responses = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const update of updates) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await client.post('/product', update);

      responses.push(res);
    } catch (err) {
      if (err instanceof Error) {
        errors.push(err);
      }
    }
  }

  return {
    errors,
    response: responses,
  };
}
