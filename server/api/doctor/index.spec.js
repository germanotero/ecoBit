'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var doctorCtrlStub = {
  index: 'doctorCtrl.index',
  destroy: 'doctorCtrl.destroy',
  show: 'doctorCtrl.show',
  create: 'doctorCtrl.create'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var doctorIndex = proxyquire('./index', {
  'express': {
    Router() {
      return routerStub;
    }
  },
  './doctor.controller': doctorCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Doctor API Router:', function() {

  it('should return an express router instance', function() {
    expect(doctorIndex).to.equal(routerStub);
  });

  describe('GET /api/doctors', function() {

    it('should verify admin role and route to doctor.controller.index', function() {
      expect(routerStub.get
        .withArgs('/doctors', 'authService.hasRole.admin', 'doctorCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/doctors/:id', function() {

    it('should verify admin role and route to doctor.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/doctors/:id', 'authService.hasRole.admin', 'doctorCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });


  describe('GET /api/doctors/:id', function() {

    it('should be authenticated and route to doctor.controller.show', function() {
      expect(routerStub.get
        .withArgs('/doctors/:id', 'authService.isAuthenticated', 'doctorCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/doctors', function() {

    it('should route to doctor.controller.create', function() {
      expect(routerStub.post
        .withArgs('/doctors', 'doctorCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

	describe('POST /api/doctors/:id', function() {

    it('should route to doctor.controller.update', function() {
      expect(routerStub.post
        .withArgs('/doctors/2342', 'doctorCtrl.update')
        ).to.have.been.calledOnce;
    });
  });
});
