type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default class ActiveCampaignClient {
  baseUrl: string;

  constructor(accountName: string) {
    this.baseUrl = `https://${accountName}.api-us1.com/api/3/`;
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
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    return response.json();
  }
}
