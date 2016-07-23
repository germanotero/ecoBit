'use strict';

import app from '../..';
import Insurance from './insurance.model';
var insurance;

var genInsurance = function() {
  insurance = new Insurance({
    name: 'Fake Doc',
    email: 'test@example.com'
  });
  return insurance;
};

describe('Insurance Model', function() {
  before(function() {
    // Clear insurances before testing
    return Insurance.remove();
  });

  beforeEach(function() {
    genInsurance();
  });

  afterEach(function() {
    return Insurance.remove();
  });

  it('should begin with no insurances', function() {
    return expect(Insurance.find({}).exec()).to
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate insurance', function() {
    return expect(insurance.save()
      .then(function() {
        var insuranceDup = genInsurance();
        return insuranceDup.save();
      })).to.be.rejected;
  });

  describe('#email', function() {
    it('should fail when saving with a blank email', function() {
      insurance.email = '';
      return expect(insurance.save()).to.be.rejected;
    });

    it('should fail when saving with a null email', function() {
      insurance.email = null;
      return expect(insurance.save()).to.be.rejected;
    });

    it('should fail when saving without an email', function() {
      insurance.email = undefined;
      return expect(insurance.save()).to.be.rejected;
    });
  });
});
