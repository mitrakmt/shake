import express from 'express';
import { isActiveUser } from '../middlewares/isActiveUser.js';
import validate from '../utils/yupValidations.js';
import controller from '../controllers/userController.js';
import trimRequest from 'trim-request';

import schemas from '../validations/userValidations.js';

const router = express.Router();

 router
  .route('/')
  .get(
    trimRequest.all,
    isActiveUser,
    controller.getUserInfo
  )
  .put(
    trimRequest.all,
    isActiveUser,
    controller.updateUserInfo
  );

router
  .route('/:userId')
  .get(
    trimRequest.all,
    controller.getPublicUser
  )

export default router;
