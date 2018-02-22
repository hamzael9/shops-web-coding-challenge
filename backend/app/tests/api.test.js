process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app');

require('../components/shop/shop.router.test')(app,chai);
require('../components/user/user.router.test')(app,chai);
