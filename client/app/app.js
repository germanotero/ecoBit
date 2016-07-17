'use strict';

var app = angular.module( 'ecobitApp', [ 'ecobitApp.auth', 'ecobitApp.admin', 'ecobitApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match', 'xeditable'
  ] )
  .config( function ( $urlRouterProvider, $locationProvider ) {
    $urlRouterProvider.otherwise( '/' );

    $locationProvider.html5Mode( true );
  } );

app.run( function ( editableOptions ) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
} );
