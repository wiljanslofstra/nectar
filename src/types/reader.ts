export interface Reader {
  fetch(path: string): Promise<any[]|null>;
}

export type FetchResponses = {
  [key: string]: any[];
};
