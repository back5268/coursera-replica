import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { router } from './router';
import http from 'http';
import { connectDatabse } from './app/database/config';
import './test';

connectDatabse();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
router(app);
app.use(express.static('src/public'));

server.listen(process.env.SERVER_HOST || 5000, () => console.log(`listening on port ${process.env.SERVER_HOST || 5000}`));
