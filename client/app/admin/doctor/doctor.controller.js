'use strict';

( function () {

  class DoctorController {

    constructor( Doctor ) {
      // Use the Doctor $resource to fetch all users
      this._Doctor = Doctor;
      this.docs = Doctor.query();
      this.doctor = {};
    }


    create() {
      var vm = this;
      this._Doctor.save( this.doctor, ( doc ) => {
        vm.docs.push( doc );
      } );
      this.doctor = {};
    }

    update( doc ) {
      doc.$save();
    }

    delete( doc ) {
      doc.$remove();
      this.docs.splice( this.docs.indexOf( doc ), 1 );
    }
  }

  angular.module( 'ecobitApp.admin' )
    .controller( 'DoctorController', DoctorController );

} )();
