'use strict';

var proxyquire = require( 'proxyquire' ).noPreserveCache();

var ctrlStub = {
  index: 'ctrl.index',
  destroy: 'ctrl.destroy',
  show: 'ctrl.show',
  create: 'ctrl.create',
  update: 'ctrl.update'
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
var miIndex = proxyquire( './index', {
  'express': {
    Router() {
      return routerStub;
    }
  },
  './mi.controller': ctrlStub,
  '../../auth/auth.service': authServiceStub
} );

describe( 'Medical Insurance API Router:', () => {

  it( 'should return an express router instance', () => {
    expect( miIndex ).to.equal( routerStub );
  } );

  describe( 'GET /api/mis', () => {
    it( 'should verify admin role and route to mi.controller.index', () => {
      expect( routerStub.get
        .withArgs( '/', 'authService.hasRole.admin', 'ctrl.index' )
      ).to.have.been.calledOnce;
    } );
  } );

  describe( 'DELETE /api/mis/:id', () => {
    it( 'should verify admin role and route to mi.controller.destroy', () => {
      expect( routerStub.delete
        .withArgs( '/:id', 'authService.hasRole.admin', 'ctrl.destroy' )
      ).to.have.been.calledOnce;
    } );
  } );


  describe( 'GET /api/mis/:id', () => {
    it( 'should be authenticated and route to mi.controller.show', () => {
      expect( routerStub.get
        .withArgs( '/:id', 'authService.hasRole.admin', 'ctrl.show' )
      ).to.have.been.calledOnce;
    } );
  } );

  describe( 'POST /api/mis', () => {
    it( 'should route to mi.controller.create', () => {
      expect( routerStub.post.withArgs( '/', 'authService.hasRole.admin', 'ctrl.create' ) ).to.have.been
        .calledOnce;
    } );
  } );

  describe( 'POST /api/mis/:id', () => {
    it( 'should route to mi.controller.update', () => {
      expect( routerStub.post.withArgs( '/:id', 'authService.hasRole.admin', 'ctrl.update' ) ).to.have
        .been.calledOnce;
    } );
  } );


} );
