const express = require('express') // Express.js
const morgan = require('morgan') // Morgan middleware
const vtrouter = require('./routes/vtuber.routes.js')
const agencyRoutes = require('./routes/agency.routes.js')
const path = require('path')
const { authrouter } = require('./routes/jwt.routes.js')
const cors = require('cors')

const idolapiOptions = {
  origin: [
    'http://localhost:3000', // Express.js, Next.js and React
    'http://localhost:4200', // Angular
    'http://localhost:5000', // Flask
    'http://localhost:8000', // Django
    'http://localhost:8080', // Spring boot, Vue.js, tomcat, etc.
    '.vercel.app' // Vercel
  ],
  methods: 'GET,POST,DELETE,PUT,PATCH,HEAD,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 204
}

const PORT = process.env.PORT || 3000
const apli = express()

/* Express Uses */

apli.use(express.json())
apli.use(cors(idolapiOptions))
apli.use(morgan('dev'))

apli.use(express.static(path.join(__dirname, 'client')))
apli.use('/docs', express.static(path.join(__dirname, 'client/docs.html')))
apli.use('/about', express.static(path.join(__dirname, 'client/about.html')))
apli.use('/support', express.static(path.join(__dirname, 'client/support.html')))

apli.use('/api', vtrouter)
apli.use('/api', agencyRoutes)
apli.use('/api/auth', authrouter)

apli.get('/', function (req, res) {
  res.status(200).sendFile('client/index.html')
})


/* Listen server */

apli.listen(PORT, () => {
  console.log(`\n Server listening in http://localhost:${PORT}\n`)
})

module.exports = apli
