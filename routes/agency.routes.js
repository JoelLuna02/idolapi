// eslint-disable-next-line no-unused-vars
const { prisma } = require('../prisma/database.js')
const { Router } = require('express')
const agencyjson = require('../api/agencydata.json')

const router = Router()

router.get('/agency', (req, res) => {
  return res.status(200).json({ agency: agencyjson })
})

module.exports = router
