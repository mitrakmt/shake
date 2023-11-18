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
  .route('/location')
  .post(
    trimRequest.all,
    isActiveUser,
    controller.setLocation
)

router.get('/verify/:token', controller.verifyUserEmail);

router
  .route('/reset-password-request')
  .post(
    trimRequest.all,
    controller.requestPasswordReset
);
  
router.post('/reset-password', controller.resetPasswordWithToken);

router
  .route('/nearby')
  .get(
    trimRequest.all,
    isActiveUser,
    controller.getPublicUserLocations
  )

router
  .route('/:userId')
  .get(
    trimRequest.all,
    isActiveUser,
    controller.getPublicUser
  )

export default router;
