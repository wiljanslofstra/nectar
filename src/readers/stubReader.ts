declare var __dirname: string;

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Reader } from '../types/reader';

export default class StubReader implements Reader {
  async fetch(path: string): Promise<any[]|object|null> {
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
