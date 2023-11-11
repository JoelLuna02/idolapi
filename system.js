import express, { json } from 'express' // Express.js
import path from 'path' // Path for client routes
import morgan from 'morgan' // Morgan middleware
import vtuberRoutes from './routes/vtuber.routes.js'
import agencyRoutes from './routes/agency.routes.js'
import JWTRoutes from './routes/jwt.routes.js'
import cors from 'cors'

const idolapiOptions = {
  origin: [
    'http://localhost:3000', // Express.js, Next.js and React
    'http://localhost:4200', // Angular
    'http://localhost:5000', // Flask
    'http://localhost:8000', // Django
    'http://localhost:8080' // Spring boot, Vue.js, tomcat, etc.
  ],
  methods: 'GET,POST,DELETE,PUT,PATCH,HEAD,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 204
}

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000
const app = express()

/* Express Uses */

app.use(json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors(idolapiOptions))
app.use(morgan('dev'))
app.use('/api', vtuberRoutes)
app.use('/api', agencyRoutes)
app.use('/api/auth', JWTRoutes)
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
})

/* Main page

app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'views/index.html'))
}) */

/* Listen server */

app.listen(PORT, () => {
  console.log(`\n Server listening in http://localhost:${PORT}\n`)
})

export default app
