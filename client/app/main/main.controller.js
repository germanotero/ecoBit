'use strict';

(function () {

  class MainController {


    constructor(Study, Insurance, moment) {
      this.studies = Study.query();
      this.insurances = Insurance.query();
      let date = new Date();
      let d = date.getDate();
      let m = date.getMonth();
      let y = date.getFullYear();
      this.appointment = {};

      this.events = [[
        {
          title: 'eco 1 eco 1 eco 1 eco 1eco 1 eco 1eco 1eco 1eco 1eco 1eco 1eco 1eco 1eco 1eco 1eco 1',
          start: new Date(y, m, d, 9, 0),
          end: new Date(y, m, d, 9, 20),
          backgroundColor: '#777',
          borderColor: '#777'
        },
        {
          title: 'eco2',
          start: new Date(y, m, d, 9, 20),
          end: new Date(y, m, d, 9, 40),
          backgroundColor: '#777',
          borderColor: '#777'
        },
        {
          title: 'eco3',
          start: new Date(y, m, d, 9, 40),
          end: new Date(y, m, d, 10, 10),
          backgroundColor: '#777',
          borderColor: '#777'
        },
        {
          title: 'eco4',
          start: new Date(y, m, d, 10, 10),
          end: new Date(y, m, d, 10, 30),
          backgroundColor: '#777',
          borderColor: '#777'
        },
    	]];

      this.calendar = {
        header: {
          center: 'title',
          right: 'today prev,next',
          left: 'month,agendaDay'
        },
        defaultView: 'agendaDay',
        minTime: '07:45',
        maxTime: '18:15',
        allDaySlot: false,
        slotDuration: moment.duration(15, 'minutes'),
        selectable: true,
        selectHelper: true,

        businessHours: {
          start: '08:00', // a start time (10am in this example)
          end: '18:00', // an end time (6pm in this example)
          dow: [1, 2, 3, 4, 5]
        },
        select: (start, end, jsEvent, view) => {
          $(".fc-state-highlight").removeClass("fc-state-highlight");
          $(this).addClass("fc-state-highlight");
          this.appointment.start = start;
          this.appointment.end = end;
        },
        eventClick: this.alertOnEventClick,
        lang: 'es'
      };
    }

    select(start, end, jsEvent, view) {
      $(".fc-state-highlight").removeClass("fc-state-highlight");
      $(this).addClass("fc-state-highlight");
      this.appointment.start = start;
      this.appointment.end = end;
    }

    alertOnEventClick(date, allDay, jsEvent, view) {
      $(".fc-state-highlight").removeClass("fc-state-highlight");
      $(this).addClass("fc-state-highlight");
    }
  }

  MainController.$inject = ['Study', 'Insurance', 'moment'];

  angular.module('ecobitApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'ctrl'
    });
})();
