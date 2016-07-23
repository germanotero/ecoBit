'use strict';

(function () {

  class InsuranceController {

    constructor($scope, Insurance, Notification, $q, Modal) {
      this._Insurance = Insurance;
      this.insurances = Insurance.query();
      this.$scope = $scope;
			var self = this;
      this.confirmDelete = Modal.confirm.delete(function (insurance) {
        if (insurance.hasOwnProperty('_id')) {
          insurance.$remove();
        }
        self.insurances.splice(self.insurances.indexOf(insurance), 1);
      });
      this.Notification = Notification;
      this.$q = $q;
      this.inserted = {};
    }

    save(insurance) {
      var d = this.$q.defer();
      if (insurance.hasOwnProperty('_id')) {
        insurance.$save(
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
        this._Insurance.save(insurance,
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

    update(insurance) {
      var d = this.$q.defer();
      insurance.$save(
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

    add() {
      this.inserted = {
        code: ''
      };
      this.insurances.push(this.inserted);
    }
  }

  InsuranceController.$inject = ['$scope', 'Insurance', 'Notification', '$q', 'Modal'];
  angular.module(
      'ecobitApp.admin')
    .controller('InsuranceController', InsuranceController);

})();
