/* eslint-disable no-console */
/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 * @flow
 */

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { spawn } from 'child_process';
import { resolve } from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';



import config from './webpack.config.development';

const argv = require('minimist')(process.argv.slice(2));

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3000;

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

//Morgan logging middleware
app.use(morgan('dev'));


module.exports = app
  // We'll store the whole session in a cookie
  app.use(require('cookie-session') ({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
  }))


// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Authentication middleware
app.use(session({
  secret: 'anotherwordfortongs'
}))
.use(passport.initialize())
.use(passport.session())


 // Serve static files from ../public
app
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use('/materialize-css', express.static(resolve(__dirname, '..', 'node_modules', 'materialize-css', 'dist')))
  .use('/jquery', express.static(resolve(__dirname, '..', 'node_modules', 'jquery', 'dist')))
  .use('/material-icons', express.static(resolve(__dirname, '..', 'node_modules', 'material-design-icons', 'dist')))

app.use('/api', require('./backend_routes/api'))


const server = app.listen(PORT, 'localhost', serverError => {
  if (serverError) {
    return console.error(serverError);
  }

  if (argv['start-hot']) {
    spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError));
  }
  console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
