import express from 'express'
import {router} from './routes'

const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const port = 3000

app.use('/', router)

app.listen(port)
