'use strict';

(function () {

  class DoctorController {

    constructor($scope, Doctor, Notification, $q, Modal) {
      this._Doctor = Doctor;
      this.docs = Doctor.query();
			var self = this;
      this.confirmDelete = Modal.confirm.delete(function (doc) {
        if (doc.hasOwnProperty('_id')) {
          doc.$remove();
        }
        self.docs.splice(self.docs.indexOf(doc), 1);
      });
      this.$scope = $scope;
      this.Notification = Notification;
      this.$q = $q;
      this.inserted = {};
    }

    save(doc) {
      var d = this.$q.defer();
      if (doc.hasOwnProperty('_id')) {
        doc.$save(
          () => {
            this.Notification.success('Ok');
            d.resolve();
          },
          (err) => {
            this.Notification.error({ message: err.data.message });
            d.resolve(err.data.message);
          }
        );
      } else {
        this._Doctor.save(doc,
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

    add() {
      this.inserted = {};
      this.docs.push(this.inserted);
    }
  }

  DoctorController.$inject = ['$scope', 'Doctor', 'Notification', '$q', 'Modal'];
  angular.module('ecobitApp.admin')
    .controller('DoctorController', DoctorController);

})();
