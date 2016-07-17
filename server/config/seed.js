/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Doctor from '../api/doctor/doctor.model';


User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });


Doctor.find({}).remove()
    .then(() => {
      Doctor.create({
        name: 'German Otero',
        email: 'test@example.com',
				phone: '11-5178-423'
      }, {
        name: 'Test testing',
        email: 'test2@example.com',
				phone: '12345-543-435'
      })
      .then(() => {
        console.log('finished populating doctors');
      });
});
