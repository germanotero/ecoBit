'use strict';

import {Router} from 'express';
import * as controller from './study.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.post('/:id', auth.hasRole('admin'), controller.update);

module.exports = router;
