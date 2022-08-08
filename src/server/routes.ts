import rateLimit from 'express-rate-limit';
import { Express } from 'express';
import Validator from 'express-joi-validation';
import { promises as fs } from 'fs';
import serverSyncSchema from '../schemas/serverSync';
import Nectar from '..';
import JsonReader from '../readers/jsonReader';
import StubReader from '../readers/stubReader';

export default function routes(app: Express) {
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
  });

  const validator = Validator.createValidator({});

  app.post('/sync', validator.body(serverSyncSchema.required()), apiLimiter, async (req, res) => {
    const config = {
      reader: req.body.reader === 'stub' ? new StubReader() : new JsonReader(),
      readerPaths: req.body.paths,
      writers: req.body.writers,
    };

    const { errors } = await (new Nectar(config)).run();

    if (errors && Object.keys(errors).length) {
      res.status(400).send(errors);
      return;
    }

    res.send('Done');
  });

  app.get('/', async (req, res) => {
    const docsHtml = await fs.readFile(`${__dirname}/../public/api-docs.html`);
    res.send(docsHtml.toString());
  });
}
