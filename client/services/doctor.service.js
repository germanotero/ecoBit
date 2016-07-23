'use strict';

(function() {

  function DoctorResource($resource) {
    return $resource('/api/doctors/:id',{id: '@_id'});
  }

  angular.module('ecobitApp.admin').factory('Doctor', DoctorResource);
})();
