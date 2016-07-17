'use strict';

import app from '../..';
import Doctor from './doctor.model';
import request from 'supertest';

describe('Doctor API:', function() {
  var doc;

  // Clear data before testing
  before(function() {
    User.remove().then(function() {
    user = new User({
      name: 'Fake User',
      email: 'test@example.com',
      password: 'password'
    }).save();

    return Doctor.remove().then(function() {
      doc = new Doctor({
        name: 'Fake Doc',
        email: 'test@example.com'
      });

      return doc.save();
    });
  });

  // Clear users after testing
  after(function() {
    User.remove();
    return Doctor.remove();
  });

  describe('GET /api/doctors', function() {
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
        .get('/api/doctors')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body[0].name.toString()).to.equal(doc.name.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/doctors')
        .expect(401)
        .end(done);
    });
  });
});
});
