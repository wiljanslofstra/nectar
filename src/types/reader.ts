export interface Reader {
  fetch(path: string): Promise<any[]|object|null>;
}

export type FetchResponses = {
  [key: string]: any[]|object;
};
