import express from 'express';

export const makeUsersRouter = async (serviceSid, client) => {
  const usersRouter = express.Router();

  usersRouter.post('/', async (request, response) => {
    if (!request.body) {
      response.status(400).send({ error: 'No body' });

      return;
    }

    try {
      const { status } = await client.verify.services(serviceSid)
        .verifications
        .create({ to: request.body.phoneNumber, channel: 'call' });

      response.status(200).json({ status });
    } catch (err) {
      if (err.status === 400 && err.code === 21216) {
        response.status(400).json({ error: 'BLACK_LIST' });

        return;
      }

      if (err.status === 400 && err.code === 60200) {
        response.status(400).json({ error: 'NUMBER_INVALID' });

        return;
      }

      throw err;
    }
  });

  usersRouter.post('/verification', async (request, response) => {
    if (!request.body) {
      response.status(400).send({ error: 'No body' });

      return;
    }

    const { status } = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: request.body.phoneNumber, code: request.body.code });

    if (status === 'approved') {
      response.status(201).json({ status, user: { phoneNumber: request.body.phoneNumber, token: 'DUMP_TOKEN' } });
    } else {
      response.status(401).json({ status: 'denied' });
    }
  });

  return usersRouter;
};
