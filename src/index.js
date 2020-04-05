import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import { makeUsersRouter } from './routes/users';
import { createServiceSid } from './helpers/create-service-sid';
import { twilioClient } from './helpers/twilio-client';

const init = async () => {
  const app = express();
  const port = process.env.PORT || 3010;

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    next();
  });
  const serviceSid = await createServiceSid(twilioClient);

  app.use('/users', await makeUsersRouter(serviceSid, twilioClient));

  app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
    next(err);
  });
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Server is listening on ${port} port`));
};

init();
