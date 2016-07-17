'use strict';

import app from '../..';
import Doctor from './doctor.model';
var doctor;

var genDoctor = function() {
  doctor = new Doctor({
    name: 'Fake Doc',
    email: 'test@example.com'
  });
  return doctor;
};

describe('Doctor Model', function() {
  before(function() {
    // Clear docs before testing
    return Doctor.remove();
  });

  beforeEach(function() {
    genDoctor();
  });

  afterEach(function() {
    return Doctor.remove();
  });

  it('should begin with no doctors', function() {
    return expect(Doctor.find({}).exec()).to
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate doctor', function() {
    return expect(doctor.save()
      .then(function() {
        var docDup = genDoctor();
        return docDup.save();
      })).to.be.rejected;
  });

  describe('#email', function() {
    it('should fail when saving with a blank email', function() {
      doctor.email = '';
      return expect(doctor.save()).to.be.rejected;
    });

    it('should fail when saving with a null email', function() {
      doctor.email = null;
      return expect(doctor.save()).to.be.rejected;
    });

    it('should fail when saving without an email', function() {
      doctor.email = undefined;
      return expect(doctor.save()).to.be.rejected;
    });
  });
});
