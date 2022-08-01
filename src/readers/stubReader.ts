import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Reader } from '../types/reader';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
declare const __dirname: string;

export default class StubReader implements Reader {
  // eslint-disable-next-line class-methods-use-this
  async fetch(path: string): Promise<any[] | object | null> {
    const basePath = resolve(__dirname, '../testStubs');
    const fullPath = resolve(basePath, path);

    const fileData: string = readFileSync(fullPath, 'utf-8');
    const arr: any[] = JSON.parse(fileData);

    if (typeof arr !== 'object') {
      return null;
    }

    return arr;
  }
}
