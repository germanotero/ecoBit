'use strict';

import app from '../..';
import Study from './study.model';
import request from 'supertest';

describe('Study API:', function() {
  var study;

  // Clear data before testing
  before(function() {
    User.remove().then(function() {
    user = new User({
      name: 'Fake User',
      email: 'test@example.com',
      phone: '112233'
    }).save();

    return Study.remove().then(function() {
      study = new Study({
				code: 1112,
			  description: 'Ecografia Lalala',
				costCount: 12,
				honorarioCount: 23,
				isRegistered: true
      });

      return study.save();
    });
  });

  // Clear users after testing
  after(function() {
    User.remove();
    return Study.remove();
  });

  describe('GET /api/studys', function() {
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
        .get('/api/studys')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body[0].name.toString()).to.equal(study.name.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/studys')
        .expect(401)
        .end(done);
    });
  });
});
});
