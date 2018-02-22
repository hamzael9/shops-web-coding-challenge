const winston = require('winston');

const expressJwt = require('express-jwt');

const JWT_SECRET = require('./config/web')[process.env.NODE_ENV || 'dev']["JWT_SECRET"];


module.exports = (app) => {
    const auth = expressJwt({
      secret: JWT_SECRET,
      userProperty: 'token'
    });

    const userRouter = require('./components/user/user.router')(auth);
    const shopRouter = require('./components/shop/shop.router')(auth);

    app.use('/api/v1/users/', userRouter);
    app.use('/api/v1/shops/', shopRouter);

    // Handle Unauthorized access to secured resources (JWT Token)
    app.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
      }
    });

    // Handle not found pages
    app.use((req,resp) => {
      resp.status(404).json('Route not found !');
    });

    winston.info('App Routes setup !');
};
