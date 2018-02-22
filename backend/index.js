const app = require('./app/app');
const port = require('./app/config/web')[process.env.NODE_ENV || 'dev'].HTTP_PORT;

app.listen(port, () => {
  console.log(`Server Listening on port ${port} ...`);
});
