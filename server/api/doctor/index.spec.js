'use strict';

var proxyquire = require( 'proxyquire' ).noPreserveCache();

var doctorCtrlStub = {
  index: 'doctorCtrl.index',
  destroy: 'doctorCtrl.destroy',
  show: 'doctorCtrl.show',
  create: 'doctorCtrl.create',
  update: 'doctorCtrl.update'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole( role ) {
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
var doctorIndex = proxyquire( './index', {
  'express': {
    Router() {
      return routerStub;
    }
  },
  './doctor.controller': doctorCtrlStub,
  '../../auth/auth.service': authServiceStub
} );

describe( 'Doctor API Router:', () => {

  it( 'should return an express router instance', () => {
    expect( doctorIndex ).to.equal( routerStub );
  } );

  describe( 'GET /api/doctors', () => {
    it( 'should verify admin role and route to doctor.controller.index', () => {
      expect( routerStub.get
        .withArgs( '/', 'authService.hasRole.admin', 'doctorCtrl.index' )
      ).to.have.been.calledOnce;
    } );
  } );

  describe( 'DELETE /api/doctors/:id', () => {
    it( 'should verify admin role and route to doctor.controller.destroy', () => {
      expect( routerStub.delete
        .withArgs( '/:id', 'authService.hasRole.admin', 'doctorCtrl.destroy' )
      ).to.have.been.calledOnce;
    } );
  } );


  describe( 'GET /api/doctors/:id', () => {
    it( 'should be authenticated and route to doctor.controller.show', () => {
      expect( routerStub.get
        .withArgs( '/:id', 'authService.hasRole.admin', 'doctorCtrl.show' )
      ).to.have.been.calledOnce;
    } );
  } );

  describe( 'POST /api/doctors', () => {
    it( 'should route to doctor.controller.create', () => {
      expect( routerStub.post.withArgs( '/', 'authService.hasRole.admin', 'doctorCtrl.create' ) ).to.have.been
        .calledOnce;
    } );
  } );

  describe( 'POST /api/doctors/:id', () => {
    it( 'should route to doctor.controller.update', () => {
      expect( routerStub.post.withArgs( '/:id', 'authService.hasRole.admin', 'doctorCtrl.update' ) ).to.have
        .been.calledOnce;
    } );
  } );
} );
