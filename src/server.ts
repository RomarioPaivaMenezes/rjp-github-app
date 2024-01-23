const dotenv = require('dotenv')
const http = require('http')
import { setRoutes } from './api/routes';
import express, { Express } from 'express';

dotenv.config();

const appExpress: Express = express();
setRoutes(appExpress);

// Start that server
const httpServer = http.createServer(appExpress);
const PORT: string | number = process.env.PORT ?? 8080;
const host: string = process.env.HOST
const localMonitorAppUrl = `http://${host}:${PORT}`;

httpServer.listen(PORT, () => {
  console.log(`Server is listening for events at: ${localMonitorAppUrl}`)
  console.log('Press Ctrl + C to quit.')
});