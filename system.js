import express, { json } from 'express' // Express.js
import path from 'path'
import morgan from 'morgan' // Morgan middleware
import vtuberRoutes from './routes/vtuber.routes.js'
import agencyRoutes from './routes/agency.routes.js'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000
const apli = express()

/* Express Uses */

apli.use(json())
apli.use(express.static(path.join(__dirname, 'client')))
apli.use(morgan('dev'))
apli.use('/api', vtuberRoutes)
apli.use('/api', agencyRoutes)

/* Main page */

apli.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'client/index.html'))
})

/* Listen server */

apli.listen(PORT, () => {
  console.log(`\n Server listening in http://localhost:${PORT}\n`)
})
