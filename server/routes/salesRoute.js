const express = require('express')
const router = express.Router()

const { getSales } = require('../controllers/salesController')

router.get('/sales', getSales)

module.exports = router