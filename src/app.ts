import express from 'express'
import {router} from './routes'
//potentially need cors here

const app = express()
const port=3000

app.listen(port)

app.use('/', router)
