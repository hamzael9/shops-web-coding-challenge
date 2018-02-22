
module.exports = (app, chai) => {
    const should = chai.should();

    describe('User API', () => {

      it('Sign-up', (done) => {
          let user = {
            name: 'Hamza El Bouatmani',
            email: 'hamza@gmail.com',
            password: 'passpass'
          };
          chai.request(app)
              .post('/api/v1/users/sign-up')
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  done();
              });
        });

      it('Sign-in', (done) => {
        let credentials = {
          email: "hamza@gmail.com",
          password: "passpass"
        }
          chai.request(app)
              .post('/api/v1/users/sign-in')
              .send(credentials)
              .end((err, res) => {
                  res.should.have.status(200);
                  done();
              });
        });

      it('Get Preferred Shops ', (done) => {
          chai.request(app)
              .get('/api/v1/users/:id/preferred')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.length.should.be.at.least(1);
                  done();
              });
        });

        it('Add Preferred Shop ', (done) => {
            chai.request(app)
                .post('/api/v1/users/:id/preferred')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
          });

          it('Delete Preferred Shop ', (done) => {
              chai.request(app)
                  .delete('/api/v1/users/:id/preferred')
                  .end((err, res) => {
                      res.should.have.status(200);
                      done();
                  });
            });
    });

};
