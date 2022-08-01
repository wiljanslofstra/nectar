// Copied from the node_modules mailchimp-api-v3, but stripped
// all callback options.

export default interface Mailchimp {
  get(
    pathOrOptions: PathOrOptions,
    query?: Query,
  ): Promise<any>;

  post(
    pathOrOptions: PathOrOptions,
    body?: Body,
  ): Promise<any>;

  patch(
    pathOrOptions: PathOrOptions,
    body?: Body,
  ): Promise<any>;

  put(
    pathOrOptions: PathOrOptions,
    body?: Body,
  ): Promise<any>;

  delete(
    pathOrOptions: PathOrOptions,
  ): Promise<any>;

  batch(...args: any[]): any
}

type Path = string;
type Options = {};
type PathOrOptions = Path | Options;
type Query = string;
type Body = {}
