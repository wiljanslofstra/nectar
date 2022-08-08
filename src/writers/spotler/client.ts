import fetch from 'node-fetch';
import crypto from 'crypto';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default class SpotlerClient {
  host: string;

  key: string;

  secret: string;

  constructor(host: string, key: string, secret: string) {
    this.host = host;
    this.key = key;
    this.secret = secret;
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
    const url = `${this.host}${path.replace(/^\//, '')}`;

    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.createAuthorizationHeader(method, url),
      },
      redirect: 'follow',
      body: JSON.stringify(data),
    });

    return response.json();
  }

  createAuthorizationHeader(method: RequestMethods, url: string) {
    const params = {
      oauth_consumer_key: this.key,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.round((new Date()).getTime() / 1000),
      oauth_nonce: crypto.createHash('md5').update(this.microtimeAsFloat().toString()).digest().toString(),
      oauth_version: '1.0',
      oauth_signature: '',
    };

    params.oauth_signature = this.createOauthSignature(params, method, url);

    const authParamsValues = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [paramName, paramValue] of Object.entries(params)) {
      authParamsValues.push(`${paramName}="${paramValue}"`);
    }

    return `OAuth ${authParamsValues.join(',')}`;
  }

  createOauthSignature(params: any, method: RequestMethods, url: string) {
    const rawurlencode = (str: string) => encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');

    const sigBase = [];
    sigBase.push(method.toUpperCase());
    sigBase.push(rawurlencode(url));
    sigBase.push([
      `oauth_consumer_key=${rawurlencode(this.key)}`,
      `oauth_nonce=${rawurlencode(params.oauth_nonce)}`,
      `oauth_signature_method=${rawurlencode('HMAC-SHA1')}`,
      `oauth_timestamp=${params.oauth_timestamp}`,
      'oauth_version=1.0',
    ].join('&'));

    return crypto.createHmac('sha1', this.secret)
      .update(sigBase.join('&'))
      .digest()
      .toString();
  }

  // eslint-disable-next-line class-methods-use-this
  microtimeAsFloat() {
    const now = (Date.now ? Date.now() : new Date().getTime()) / 1000;

    return now;
  }
}
