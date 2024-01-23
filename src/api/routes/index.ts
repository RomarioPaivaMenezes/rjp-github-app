import bodyParser from 'body-parser';
import express from 'express';
import monitor from './monitor';
import middleware from '../../service/github';

const router = express.Router();

export function setRoutes(app) {
  // API Midware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/api', monitor(router));

  router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header(
      'Access-Control-Allow-Headers',
      'origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      return res.status(200).json({});
    }
    next();
  });
  
  router.use('/', router);
  
  /** Error handling */
  router.use((_, res) => {
    const error = new Error('not found');
    return res.status(404).json({
      message: error.message,
    });
  });

  // GitHub notify
  app.use(middleware)

  app.use(router);
};