/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Cart {
  checkout_url?: string;
  created_at?: string;
  currency_code?: 'USD' | 'EUR' | 'GBP' | 'AUD' | 'INR' | 'NZD' | 'BRL' | 'DKK' | 'SEK' | 'SGD' | 'ZAR' | 'CHF' | 'MXN' | 'CAD' | 'HKD' | 'JPY';
  customer: {
    address?: {
      address1?: string;
      address2?: string;
      city?: string;
      country_code?: string;
      postal_code?: string;
      state?: string;
    };
    company?: string;
    email_address: string;
    first_name?: string;
    id: string;
    last_name?: string;
    status?: 'subscribed' | 'unsubscribed' | 'transactional';
  };
  id: string;
  lines: {
    id: string;
    price?: number;
    product_id: string;
    product_variant_id: string;
    quantity?: number;
  }[];
  order_total: number;
  store_id: string;
  tax_total?: number;
  updated_at?: string;
}
