const express = require('express');
const router = express.Router();
const Files = require('./files')
const admin = require('./admin')

router.use('/files', Files)
router.use('/admin', admin)

module.exports = router;