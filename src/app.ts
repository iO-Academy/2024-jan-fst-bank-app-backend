import express from 'express'
import {router} from './routes'

const app = express()
app.use(express.json())
const port = 3000

app.listen(port)

app.use('/', router)