declare var __dirname: string;

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Reader } from '../types/reader';

export default class MockReader implements Reader {
  async fetch(path: string): Promise<any[]|null> {
    const basePath = resolve(__dirname, '../testMocks');
    const fullPath = resolve(basePath, path);
    
    const fileData: string = readFileSync(fullPath, 'utf-8');
    const arr: any[] = JSON.parse(fileData);

    if (!Array.isArray(arr)) {
      return null;
    }

    return arr;
  }
}
