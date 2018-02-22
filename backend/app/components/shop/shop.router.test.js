
module.exports = (app, chai) => {
  const should = chai.should();
  describe('Shops API', () => {

    it('Get All Shops sorted by distance', (done) => {
        chai.request(app)
            .get('/api/v1/shops/nearby')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.at.least(1);
                done();
            });
      });

  });
};
