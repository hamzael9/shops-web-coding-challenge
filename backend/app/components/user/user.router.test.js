
module.exports = (app, chai) => {
    const User = require('./user.model');
    const Shop = require('../shop/shop.model');

    const should = chai.should();

    const user = {
      name: 'Hamza El Bouatmani',
      email: 'hamza@gmail.com',
      password: 'passpass'
    };

    let credentials = {};

    let token;

    let testShop;

// Sign up test
    describe('User API', () => {
      it('Sign-up', (done) => {
          User.remove({}) .then ( (resp) => {
            chai.request(app)
                .post('/api/v1/users/sign-up')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
          });
        });
// Successful Sign in Test
        it('Sign-in', (done) => {
          credentials.email = user.email;
          credentials.password = user.password;
            chai.request(app)
                .post('/api/v1/users/sign-in')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    should.exist(res.body.token);
                    res.body.name.should.equal(user.name);
                    res.body.email.should.equal(user.email);
                    token = res.body.token;
                    done();
                });
          });
// invalid request Sign in Test
        it('Sign-in', (done) => {
          credentials.email = "forgotat.com";
          credentials.password = user.password;
            chai.request(app)
                .post('/api/v1/users/sign-in')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
          });
// Add a shop to preferred
          it('Add Preferred Shop ', (done) => {
            Shop.findOne({}).then ( (res) => {
              testShop = res;
              chai.request(app)
                  .post(`/api/v1/users/shops/liked/${testShop._id}`)
                  .set ('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                      res.should.have.status(200);
                      done();
                  });
              })
            });
// Get User's preferred shop
            it('Get Preferred Shops ', (done) => {
                chai.request(app)
                    .get('/api/v1/users/shops/liked')
                    .set ('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.equal(1);
                        done();
                    });
              });
// Remove Shop from user's preferred shopService
            it('Remove from Preferred Shops ', (done) => {
                chai.request(app)
                  .delete(`/api/v1/users/shops/liked/${testShop._id}`)
                  .set ('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                      res.should.have.status(200);
                      done();
                  });
              });
      });

};
