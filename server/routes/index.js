import express from 'express';
let router = express.Router();
import Files from './files/index.js'
import admin from './admin/index.js'
import timeClock from './timeClock/index.js'

router.use('/files', Files)
router.use('/admin', admin)
router.use('/timeClock', timeClock)

export default router;