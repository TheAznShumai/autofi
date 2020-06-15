/**
 * Module dependencies.
 */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import dotenv from 'dotenv';
import routes from 'routes';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Create Express server.
 */
const app = express();

/**
 * Setup MongoDB.
 */
import { setupDatabase } from 'test/setup/mongo-mem-server';
setupDatabase();

/**
 * Populate with Provider Data
 * The reason we do this here is that we are using the mongodb memory server
 * which is not persistent.
 */
import loadProviderData from 'test/fixtures/provider-source-config-data';
loadProviderData();

/**
 * Express configuration.
 */
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

/**
 * Primary app routes.
 */
app.use('/', routes);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => { // eslint-disable-line
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
const port = app.get('port');
app.listen(port, () => console.log(`App is app listening at http://localhost:${port}`));

export default app;