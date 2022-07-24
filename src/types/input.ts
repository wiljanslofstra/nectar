export interface Customer {
  first_name: string;
  last_name: string;
  email_address: string;
  status: string;
  language: string;
  custom_fields: {[key: string]: string},
  tags: string[];
}
