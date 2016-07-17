'use strict';

import Doctor from './doctor.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError( res, statusCode ) {
  statusCode = statusCode || 422;
  return function ( err ) {
    res.status( statusCode ).json( err );
  }
}

function handleError( res, statusCode ) {
  statusCode = statusCode || 500;
  return function ( err ) {
    res.status( statusCode ).send( err );
  };
}

/**
 * Get list of doctors
 * restriction: 'admin'
 */
export function index( req, res ) {
  return Doctor.find( {} ).exec()
    .then( doctors => {
      return res.status( 200 ).json( doctors );
    } )
    .catch( handleError( res ) );
}

/**
 * Creates a new user
 */
export function create( req, res, next ) {
  var newDoc = new Doctor( req.body );
  newDoc.save()
    .then( function ( doc ) {
      return res.json( doc );
    } )
    .catch( validationError( res ) );
}

/**
 * Updates a new user
 */
export function update( req, res, next ) {
  var docId = req.params.id;

	Doctor.findOneAndUpdate({_id:req.params.id}, req.body, {new: true}, function (err, doc) {
  	return res.json( doc );
	});

  // return Doctor.findById( docId ).exec()
  //   .then( doc => {
  //     doc.save(req.body)
  //       .then( function ( doc ) {
  //         return res.json( doc );
  //       } )
  //       .catch( validationError( res ) );
  //   } )
  //   .catch( err => next( err ) );
}

/**
 * Get a single user
 */
export function show( req, res, next ) {
  var userId = req.params.id;

  return Doctor.findById( userId ).exec()
    .then( user => {
      if ( !user ) {
        return res.status( 404 ).end();
      }
      res.json( user.profile );
    } )
    .catch( err => next( err ) );
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy( req, res ) {
  return Doctor.findByIdAndRemove( req.params.id ).exec()
    .then( function () {
      return res.status( 204 ).end();
    } )
    .catch( handleError( res ) );
}
