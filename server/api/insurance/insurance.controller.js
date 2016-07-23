'use strict';

import Insurance from './insurance.model';
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
 * Get list of insurances
 * restriction: 'admin'
 */
export function index( req, res ) {
  return Insurance.find( {} ).exec()
    .then( insurances => {
      return res.status( 200 ).json( insurances );
    } )
    .catch( handleError( res ) );
}

/**
 * Creates a new insurance
 */
export function create( req, res, next ) {
  var newDoc = new Insurance( req.body );
  newDoc.save()
    .then( function ( insurance ) {
      return res.json( insurance );
    } )
    .catch( validationError( res ) );
}

/**
 * Updates a new insurance
 */
export function update( req, res, next ) {
  let insuranceId = req.params.id;
	Insurance.findOneAndUpdate({_id:req.params.id}, req.body, {new: true, runValidators: true}, function (err, insurance) {
		if (err) {
			console.log(err);
			return res.status(422).send(err);
		}
  	return res.json( insurance );
	});
}

/**
 * Get a single insurance
 */
export function show( req, res, next ) {
  var insuranceId = req.params.id;

  return Insurance.findById( insuranceId ).exec()
    .then( insurance => {
      if ( !insurance ) {
        return res.status( 404 ).end();
      }
      res.json( insurance.profile );
    } )
    .catch( err => next( err ) );
}

/**
 * Deletes a insurance
 * restriction: 'admin'
 */
export function destroy( req, res ) {
  return Insurance.findByIdAndRemove( req.params.id ).exec()
    .then( function () {
      return res.status( 204 ).end();
    } )
    .catch( handleError( res ) );
}
