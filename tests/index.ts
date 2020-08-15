import koa, { DefaultState, DefaultContext } from 'koa';
import http from 'http';
import { optionsMiddleware, healthMiddleware } from '../src/';
import axios from 'axios';
import { assert } from 'chai';

describe('middleware tests', () => {
  let app: koa<DefaultState, DefaultContext> | null = null;
  const port = 1337;
  let httpServer: http.Server | null = null;
  let healthy = true;
  beforeEach(() => {
    app = new koa();
    httpServer = http.createServer(app.callback());
    app.use(optionsMiddleware(/\.example\.tld/));
    app.use(healthMiddleware(() => healthy));
    httpServer.listen(port);
  });

  afterEach(() => {
    if (httpServer) {
      httpServer.close();
      httpServer = null;
      app = null;
    }
  });

  it('options middleware', () => {
    return new Promise((resolve, reject) => {
      axios
        .options(`http://127.0.0.1:${port}/health`, {
          headers: {
            Origin: 'https://sub.example.tld',
          },
        })
        .then((res) => {
          assert(
            res.headers['access-control-allow-origin'].toString() == 'sub.example.tld',
            'Origin that should be allowed: ' + res.headers['access-control-allow-origin'].toString(),
          );
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }).timeout(3000);

  it('health  middleware - unhealthy', () => {
    healthy = false;
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:${port}/health`)
        .then((res) => {
          reject();
        })
        .catch((err) => {
          assert(err.response.status === 500, 'the response needs to return a 500 status code');
          resolve();
        });
    });
  }).timeout(3000);

  it('health  middleware', () => {
    healthy = true;
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:${port}/health`)
        .then((res) => {
          assert(res.status === 200, 'the response needs to return a 500 status code');
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }).timeout(3000);
});
