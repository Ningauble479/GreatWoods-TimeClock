const express = require('express');
const router = express.Router();
const Files = require('./files')

router.use('/files', Files)

module.exports = router;