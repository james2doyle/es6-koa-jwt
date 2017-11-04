export default [{
  method: 'get',
  path: '/api',
  fn(ctx) {
    ctx.body = {
      api: 'Thanks for the token!',
    };
  },
}];
