import { Router } from 'express';

import * as controller from './authController';

const router = Router();

router.get('/', controller.getAuth);
router.post('/', controller.createAuth);
router.put('/:id', controller.updateAuth);
router.delete('/:id', controller.deleteAuth);

export default router;
