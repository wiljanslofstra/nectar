/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Member {
  active_campaign_fields?: object;
  active_campaign_phone_number?: string;
  custom_fields?: {
    /**
     * Unknown Property
     */
    [x: string]: unknown;
  };
  email_address: string;
  first_name?: string;
  id?: string | number;
  language: 'en' | 'ar' | 'af' | 'be' | 'bg' | 'ca' | 'zh' | 'hr' | 'cs' | 'da' | 'nl' | 'et' | 'fa' | 'fi' | 'fr' | 'fr_CA' | 'de' | 'el' | 'he' | 'hi' | 'hu' | 'is' | 'id' | 'ga' | 'it' | 'ja' | 'km' | 'ko' | 'lv' | 'lt' | 'mt' | 'ms' | 'mk' | 'no' | 'pl' | 'pt' | 'pt_PT' | 'ro' | 'ru' | 'sr' | 'sk' | 'sl' | 'es' | 'es_ES' | 'sw' | 'sv' | 'ta' | 'th' | 'tr' | 'uk' | 'vi';
  last_name?: string;
  mailchimp_list_ids?: string[];
  spotler_channels?: string[];
  spotler_permissions?: string[];
  spotler_properties?: object;
  status: 'subscribed' | 'unsubscribed' | 'transactional';
  tags?: string[];
}
