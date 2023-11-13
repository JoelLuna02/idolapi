/* eslint-disable camelcase */
const express = require('express')
const apidata = require('../api/apidata.json')

const main_routes = express.Router()

main_routes.get('/', (req, res) => {
  return res.status(200).json(apidata)
})

module.exports = main_routes
