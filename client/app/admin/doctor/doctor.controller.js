'use strict';

(function () {

  class DoctorController {

    constructor($scope, Doctor, Notification, $q) {
      // Use the Doctor $resource to fetch all users
      this._Doctor = Doctor;
      this.docs = Doctor.query();
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

    update(doc) {
      var d = this.$q.defer();
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
      return d.promise;
    }

    delete(doc) {
      if (doc.hasOwnProperty('_id')) {
        doc.$remove();
      }
      this.docs.splice(this.docs.indexOf(doc), 1);
    }

    add() {
      this.inserted = {};
      this.docs.push(this.inserted);
    }
  }

  DoctorController.$inject = ['$scope', 'Doctor', 'Notification', '$q'];
  angular.module('ecobitApp.admin')
    .controller('DoctorController', DoctorController);

})();
