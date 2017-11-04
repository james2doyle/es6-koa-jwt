export default [{
  method: 'get',
  path: '/',
  fn(ctx) {
    ctx.body = {
      hello: 'world',
    };
  },
}];
