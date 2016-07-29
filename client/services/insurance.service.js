'use strict';

(function() {

  function InsuranceResource($resource) {
    return $resource('/api/insurances/:id',{id: '@_id'});
  }

  angular.module('ecobitApp').factory('Insurance', InsuranceResource);
})();
