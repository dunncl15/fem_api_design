import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { connect } from './utils/db';
import config from './config';

import itemRouter from './resources/item/item.router';
import listRouter from './resources/list/list.router';
import userRouter from './resources/user/user.router';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/item', itemRouter);
app.use('/api/list', listRouter);
app.use('/api/user', userRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error('CONNECT ERROR: ', e);
  }
};
