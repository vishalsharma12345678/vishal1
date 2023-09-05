const express = require('express')
const router = express.Router()

router.use('/v4',require('./v4'))
module.exports = router
