/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import express from 'express';
import next from 'next';
import Bootstrap from '../middlewares/Kernel';
import Log from '../middlewares/Log';
import Locals from './Locals';
import Routes from './Routes';
import { errorResponce } from '../utils/exchange';

export default function erverInit() {
  const { port } = Locals;
  const nextApp = next({ dev: Locals.env !== 'production' });
  const handle = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {
    let expressApp = express();
    expressApp = Bootstrap(expressApp);
    expressApp = Routes(expressApp);

    expressApp.get('*', (req, res) => {
      if (req.xhr) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
        return errorResponce(req, res, 'URL not found from server', 404, 'server');
      }
      return handle(req, res);
    });

    expressApp.use((err, req, res, next) => {
      Log.error(err.stack);
      return errorResponce(req, res, 'Unexpected error from server', 500, 'server');
    });

    expressApp.listen(port, (_error) => {
      if (_error) {
        // eslint-disable-next-line no-console
        return console.log('Error: ', _error);
      }
      Log.info(`Server :: Running @ ${port}`);
      // eslint-disable-next-line no-console
      return console.log(
        '\x1b[33m%s\x1b[0m',
        `Server :: Running @ 'http://localhost:${port}'`,
      );
    });
  });
}