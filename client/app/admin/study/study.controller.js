'use strict';

(function () {

  class StudyController {

    constructor($scope, Study, Notification, $q, Modal) {
      this._Study = Study;
      this.studies = Study.query();
      var self = this;
      this.confirmDelete = Modal.confirm.delete(function (study) {
        if (study.hasOwnProperty('_id')) {
          study.$remove();
        }
        self.studies.splice(self.studies.indexOf(study), 1);
      });
      this.$scope = $scope;
      this.Notification = Notification;
      this.$q = $q;
      this.inserted = {};
    }

    save(study) {
      var d = this.$q.defer();
      if (study.hasOwnProperty('_id')) {
        this.update(study, d);
      } else {
        this._Study.save(study,
          () => {
            this.Notification.success('Ok');
            d.resolve();
          },
          (err) => {
            this.Notification.error({ message: err.data.message });
            d.resolve(err.data.message);
          }
        );
      }
      return d.promise;
    }

    update(study, d) {
      study.$save(
        () => {
          this.Notification.success('Ok');
          d.resolve();
        },
        (err) => {
          this.Notification.error({ message: err.data.message });
          d.resolve(err.data.message);
        }
      );
    }

    add() {
      this.inserted = {};
      this.studies.push(this.inserted);
    }
  }

  StudyController.$inject = ['$scope', 'Study', 'Notification', '$q', 'Modal'];
  angular.module('ecobitApp.admin')
    .controller('StudyController', StudyController);
})();
