import { Reader } from '../types/reader';

export default class JsonReader implements Reader {
  // eslint-disable-next-line class-methods-use-this
  async fetch(path: string): Promise<any[] | object | null> {
    const res = await fetch(path);
    const json = await res.json();

    if (typeof json !== 'object') {
      return null;
    }

    return json;
  }
}
