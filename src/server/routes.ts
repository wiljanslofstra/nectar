import rateLimit from 'express-rate-limit';
import { Express } from 'express';
import Validator from 'express-joi-validation';
import { promises as fs } from 'fs';
import serverSyncSchema from '../schemas/server-sync';

export default function routes(app: Express) {
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
  });

  const validator = Validator.createValidator({});

  app.post('/sync', validator.query(serverSyncSchema.required()), apiLimiter, (req, res) => {
    res.send('hello world');
  });

  app.get('/', async (req, res) => {
    const docsHtml = await fs.readFile(`${__dirname}/../public/api-docs.html`);
    res.send(docsHtml.toString());
  });
}
