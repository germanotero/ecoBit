'use strict';

import app from '../..';
import Study from './study.model';
var study;

var genStudy = function() {
  study = new Study({
    name: 'Fake Doc',
    email: 'test@example.com'
  });
  return study;
};

describe('Study Model', function() {
  before(function() {
    // Clear studys before testing
    return Study.remove();
  });

  beforeEach(function() {
    genStudy();
  });

  afterEach(function() {
    return Study.remove();
  });

  it('should begin with no studys', function() {
    return expect(Study.find({}).exec()).to
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate study', function() {
    return expect(study.save()
      .then(function() {
        var studyDup = genStudy();
        return studyDup.save();
      })).to.be.rejected;
  });

  describe('#email', function() {
    it('should fail when saving with a blank email', function() {
      study.email = '';
      return expect(study.save()).to.be.rejected;
    });

    it('should fail when saving with a null email', function() {
      study.email = null;
      return expect(study.save()).to.be.rejected;
    });

    it('should fail when saving without an email', function() {
      study.email = undefined;
      return expect(study.save()).to.be.rejected;
    });
  });
});
