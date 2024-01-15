/* eslint-disable camelcase */
import express from 'express'
import apidata from '../api/apidata.json';

const main_routes = express.Router()

main_routes.get('/', (req, res) => {
  return res.status(200).json(apidata)
})

export default main_routes;
