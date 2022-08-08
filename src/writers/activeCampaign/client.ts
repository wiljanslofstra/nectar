import fetch from 'node-fetch';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default class ActiveCampaignClient {
  baseUrl: string;

  token: string;

  constructor(accountName: string, token: string) {
    this.baseUrl = `https://${accountName}.api-us1.com/api/3/`;
    this.token = token;
  }

  async get(url: string) {
    return this.request('GET', url);
  }

  async post(url: string, data: any = undefined) {
    return this.request('POST', url, data);
  }

  async put(url: string, data: any = undefined) {
    return this.request('PUT', url, data);
  }

  async delete(url: string) {
    return this.request('DELETE', url);
  }

  async request(method: RequestMethods, path: string, data: any = undefined) {
    const url = `${this.baseUrl}${path.replace(/^\//, '')}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': this.token,
      },
      redirect: 'follow',
      body: JSON.stringify(data),
    });

    return response.json();
  }
}
