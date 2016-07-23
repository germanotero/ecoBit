'use strict';

import app from '../..';
import Insurance from './insurance.model';
import request from 'supertest';

describe('Insurance API:', function() {
  var insurance;

  // Clear data before testing
  before(function() {
    User.remove().then(function() {
    user = new User({
      name: 'Fake User',
      email: 'test@example.com',
      phone: '112233'
    }).save();

    return Insurance.remove().then(function() {
      insurance = new Insurance({
				code: 1112,
			  description: 'Osmecom',
			  email: 'info@osmecom.com.ar',
			  phone: '1231231',
				cost: 12,
				honorario: 23,
				tariff: 32
      });

      return insurance.save();
    });
  });

  // Clear users after testing
  after(function() {
    User.remove();
    return Insurance.remove();
  });

  describe('GET /api/insurances', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/insurances')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body[0].name.toString()).to.equal(insurance.name.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/insurances')
        .expect(401)
        .end(done);
    });
  });
});
});
