/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Doctor from '../api/doctor/doctor.model';
import Insurance from '../api/insurance/insurance.model';


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
        reg: 1233,
        phone: '11-5178-423'
      }, {
        name: 'Test testing',
        reg: 1234,
        email: 'test2@example.com',
        phone: '12345-543-435'
      })
      .then(() => {
        console.log('finished populating doctors');
      });
  });

Insurance.find({}).remove()
  .then(() => {
    Insurance.create({
      code: 123,
      description: 'Osmecom',
      email: 'info@osmecom.com.ar',
      phone: '1231231',
      cost: 12,
      honorario: 23,
      tariff: 32
    }, {
      code: 1123,
      description: 'Osecac',
      email: 'info@osecac.com.ar',
      phone: '1231231-3323',
      cost: 0.3,
      honorario: 0.33,
      tariff: 0.11
    });
  });
