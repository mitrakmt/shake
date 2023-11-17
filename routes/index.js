import express from 'express';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import businessCardRoute from './businessCardRoute.js';
import templateRoute from './templateRoute.js';
import analyticsRoute from './analyticsRoute.js';

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({
      status: 'ok',
      processEnv: process.env.NODE_ENV || 'not set',
      CURRENT_PROJECT: process.env.CURRENT_PROJECT,
    });
});

router.use('/auth', authRoute); //add routes
router.use('/user', userRoute)
router.use('/business-card', businessCardRoute);
router.use('/templates', templateRoute);
router.use('/analytics', analyticsRoute);

export default router;
