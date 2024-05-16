import express from 'express'
import {router} from './routes'

const app = express()
app.use(express.json())
const port = 3000

app.use('/', router)

app.listen(port)
