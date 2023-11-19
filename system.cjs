/* eslint-disable camelcase */
const express = require('express') // Express.JS
const next = require('next') // Next.JS

const morgan = require('morgan') // Morgan middleware
const vtrouter = require('./routes/vtuber.routes.js')
const agencyRoutes = require('./routes/agency.routes.js')
const main_routes = require('./routes/api.routes.js')
const { authrouter } = require('./routes/jwt.routes.js')
const cors = require('cors')
const gradient = require('gradient-string')
const figlet = require('figlet')
const assets = require('./routes/assets.routes.js')
const nextConfig = require('./next.config.js');

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
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000
const apli = express()
const app = next({ dev, conf: nextConfig })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  /* Express Uses */

  apli.use(express.json())
  apli.use(cors(idolapiOptions))
  apli.use(morgan('dev'))

  apli.use('/api', vtrouter)
  apli.use('/api', main_routes)
  apli.use('/api', agencyRoutes)
  apli.use('/api/assets', assets)
  apli.use('/api/auth', authrouter)
  apli.get('*', (req, res) => {
    return handle(req, res)
  })
  /* Listen server */

  apli.listen(PORT, () => {
    const banner = figlet.textSync(' IdolAPI', { font: 'Colossal' })
    const info = '\n Server listening in '
    console.log(
      gradient.fruit('\n' + banner + '\n\t\t A fanmade RESTful API based in Idol\n'),
      '\n Express.js Version: ' + gradient.cristal('4.18.2'),
      '\n IdolAPI Version: ' + gradient.summer('BETA 0.5.1'),
      info + gradient(['#00ff00', '#00ff00'])(`http://localhost:${PORT}`))
  })
})

module.exports = app
