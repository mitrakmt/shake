import express from 'express';
import { isActiveUser } from '../middlewares/isActiveUser.js';
import controller from '../controllers/templateController.js';
import trimRequest from 'trim-request';

const router = express.Router();

// Fetch all templates
router
  .route('/')
  .get(
    trimRequest.all,
    isActiveUser,
    controller.fetchAllTemplates
  )
  .post(
    trimRequest.all,
    isActiveUser,
    controller.addTemplate
  );

// Operations on a specific template
router
  .route('/:id')
  .get(
    trimRequest.all,
    isActiveUser,
    controller.fetchTemplateById
  )
  .put(
    trimRequest.all,
    isActiveUser,
    controller.updateTemplateDetails // Assuming PUT request to update a template
  )
  .delete(
    trimRequest.all,
    isActiveUser,
    controller.removeTemplate // Assuming DELETE request to delete a template
  );

export default router;