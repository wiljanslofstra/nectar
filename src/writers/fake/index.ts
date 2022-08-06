import bunyan from 'bunyan';
import { Writer, WriterInput, WriterResponse } from '../../types/writer';

export default class FakeWriter implements Writer {
  log?: bunyan;

  attachLogger(logger: bunyan) {
    this.log = logger;
  }

  // eslint-disable-next-line class-methods-use-this
  async write(input: WriterInput): Promise<WriterResponse> {
    const errors: Error[] = [];

    if (input.site) {
      //
    }

    return {
      errors,
    };
  }
}
