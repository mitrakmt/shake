import express from 'express';
import { isActiveUser } from '../middlewares/isActiveUser.js';
import validate from '../utils/yupValidations.js';
import controller from '../controllers/businessCardController.js';
import trimRequest from 'trim-request';

const router = express.Router();

router
    .route('/')
    .post(
        trimRequest.all,
        isActiveUser,
        controller.createCard 
    )
    .get(
        trimRequest.all,
        isActiveUser,
        controller.listUserCards 
    );

router
    .route('/share')
        .post(
            trimRequest.all,
            isActiveUser,
            controller.shareCard
)

router
    .route('/share/email')
        .post(
            trimRequest.all,
            isActiveUser,
            controller.shareBusinessCardByEmail
)

router
    .route('/share/sms')
        .post(
            trimRequest.all,
            isActiveUser,
            controller.shareBusinessCardBySms
)

router
    .route('/shared')
        .get(
            trimRequest.all,
            isActiveUser,
            controller.getSharedCards
)
        
router
    .route('/shared-by-me')
    .get(
        trimRequest.all,
        isActiveUser,
        controller.fetchSharedCardsByCurrentUser
    );

    router
    .route('/:cardId')
        .get(
            trimRequest.all,
            isActiveUser,
            controller.getCard 
        )
        .put(
            trimRequest.all,
            isActiveUser,
            controller.updateCard 
        )
        .delete(
            trimRequest.all,
            isActiveUser,
            controller.deleteCard 
    );

export default router;