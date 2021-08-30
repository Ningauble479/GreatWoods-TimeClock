import express from 'express';
let router = express.Router();
import Files from './files/index.js'
import admin from './admin/index.js'
import timeClock from './timeClock/index.js'
import verify from './verify/index.js'

router.use('/files', Files)
router.use('/admin', admin)
router.use('/timeClock', timeClock)
router.use('/verify', verify)

export default router;