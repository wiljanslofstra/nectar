import express from 'express';
import routes from './routes';

export default function server(listen = true) {
  const app = express();

  routes(app);

  if (listen) {
    let port = process.env.PORT || 3000;

    if (typeof port !== 'number') {
      port = 3000;
    }

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on port ${port}`);
    });
  }

  return app;
}
