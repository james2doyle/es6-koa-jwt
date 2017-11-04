import main from '../src/index.js';

const chai = require('chai');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const koajwt = require('koa-jwt');

chai.should();

function grabStdout() {
  const write = process.stdout.write;
  let content = '';
  process.stdout.write = (chunk, encoding, cb) => {
    content += chunk.toString();
    return write(chunk, encoding, cb);
  };

  return {
    letGo: () => {
      process.stdout.write = write;
    },
    content,
  };
}

describe('Server', () => {
  it('can return 200 OK', () => {
    const app = main();
    request(app.listen())
      .get('/')
      .expect(200)
      .end();
  });

  it('can deny the unauthenticated requests', () => {
    const app = main();
    request(app.listen())
      .get('/api')
      .expect(401)
      .end();
  });

  it('can allow the authenticated requests', () => {
    const app = main();

    const secret = 'shhhhhh';
    const token = jwt.sign({ foo: 'bar' }, secret);

    app.use(koajwt({ secret }));

    request(app.listen())
      .get('/api')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end();
  });
});
