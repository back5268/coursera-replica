import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { routes } from './routes';
import './test';
import { connectDatabse } from '@config';
import { connectNodemailer } from '@lib';
dotenv.config();

connectDatabse();
// connectNodemailer();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
routes(app);
app.use(express.static('src/public'));

server.listen(process.env.SERVER_HOST || 9999, () => console.log(`listening on port ${process.env.SERVER_HOST || 9999}`));
