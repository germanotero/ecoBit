'use strict';

(function () {

  class DoctorController {

    constructor($scope, Doctor, Notification) {
      // Use the Doctor $resource to fetch all users
      this._Doctor = Doctor;
      this.docs = Doctor.query();
      this.$scope = $scope;
      this.Notification = Notification;
    }

    save(doc) {
      if (doc.hasOwnProperty('_id')) {
        doc.$save(
          () => { this.Notification.success('Ok'); },
          (err) => {
            this.Notification.error({ message: err.data.message, delay: 1000 });
          }
				);
      } else {
        this._Doctor.save(doc,
					() => { this.Notification.success('Ok'); },
          (err) => {
            this.Notification.error({ message: err.data.message, delay: 1000 });
          }
				);
      }

    }

    update(doc) {
      doc.$save();
    }

    delete(doc) {
      if (doc.hasOwnProperty('_id')) {
        doc.$remove();
      }
      this.docs.splice(this.docs.indexOf(doc), 1);
    }

    add() {
      this.docs.push({});
    }
  }

  DoctorController.$inject = ['$scope', 'Doctor', 'Notification'];
  angular.module('ecobitApp.admin')
    .controller('DoctorController', DoctorController);

})();
