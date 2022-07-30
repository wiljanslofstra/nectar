import { Reader } from './reader';
import { Writer } from './writer';

export default interface Config {
  reader: Reader;
  readerPaths: {
    customers: string;
  };
  writers: Writer[];
}
