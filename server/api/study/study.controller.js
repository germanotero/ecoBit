'use strict';

import Study from './study.model';
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
 * Get list of studys
 * restriction: 'admin'
 */
export function index( req, res ) {
  return Study.find( {} ).exec()
    .then( studys => {
      return res.status( 200 ).json( studys );
    } )
    .catch( handleError( res ) );
}

/**
 * Creates a new study
 */
export function create( req, res, next ) {
  var newDoc = new Study( req.body );
  newDoc.save()
    .then( function ( study ) {
      return res.json( study );
    } )
    .catch( validationError( res ) );
}

/**
 * Updates a new study
 */
export function update( req, res, next ) {
  let studyId = req.params.id;
	Study.findOneAndUpdate({_id:req.params.id}, req.body, {new: true, runValidators: true}, function (err, study) {
		if (err) {
			console.log(err);
			return res.status(422).send(err);
		}
  	return res.json( study );
	});
}

/**
 * Get a single study
 */
export function show( req, res, next ) {
  var studyId = req.params.id;

  return Study.findById( studyId ).exec()
    .then( study => {
      if ( !study ) {
        return res.status( 404 ).end();
      }
      res.json( study.profile );
    } )
    .catch( err => next( err ) );
}

/**
 * Deletes a study
 * restriction: 'admin'
 */
export function destroy( req, res ) {
  return Study.findByIdAndRemove( req.params.id ).exec()
    .then( function () {
      return res.status( 204 ).end();
    } )
    .catch( handleError( res ) );
}
