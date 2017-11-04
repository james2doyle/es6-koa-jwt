import jwt from 'jsonwebtoken';
import secret from '../../secret';

export default [{
  method: 'post',
  path: '/login',
  fn(ctx) {
    // replace with some calls to a real user system
    if (!(ctx.request.body.username === 'john.doe' && ctx.request.body.password === 'foobar')) {
      ctx.throw(401);
      return;
    }

    // fake profile that would come from a db or something
    const profile = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@doe.com',
      id: 123,
    };

    // We are sending the profile inside the token
    const token = jwt.sign(profile, secret, {
      expiresIn: 7200, // 120 minutes or 2 hours
    });

    ctx.body = {
      token,
    };
  },
}];
