'use strict';

(function() {

  function StudyResource($resource) {
    return $resource('/api/studies/:id',{id: '@_id'});
  }

  angular.module('ecobitApp.admin').factory('Study', StudyResource);
})();
