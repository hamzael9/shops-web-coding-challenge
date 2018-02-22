const winston = require('winston');

const userRouter = require('./components/user/user.router');
const shopRouter = require('./components/shop/shop.router');

module.exports = (app) => {
    app.use('/api/v1/users/', userRouter);
    app.use('/api/v1/shops/', shopRouter);

    app.use((req,resp) => {
      resp.status(404).json('Route not found !');
    });
    winston.info('App Routes setup !');
};
