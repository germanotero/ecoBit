'use strict';

var app = angular.module('ecobitApp', ['ecobitApp.auth', 'ecobitApp.admin', 'ecobitApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match', 'xeditable', 'ui-notification', 'angularMoment', 'ui.calendar', 'ui.select'
  ])
  .config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  }).config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
    });
  });

app.run(function (editableOptions) {
  editableOptions.theme = 'bs3';
});
