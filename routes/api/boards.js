const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/boards');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/board');

router.get('/', authenticate, ctrl.getAll);

router.post('/', authenticate, validateBody(schemas.addBoardSchema), ctrl.add);

router.patch(
  '/:boardId',
  isValidId,
  authenticate,
  validateBody(schemas.updateBoardSchema),
  ctrl.updateById
);

router.delete('/:boardId', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
