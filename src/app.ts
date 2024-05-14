const express = require('express')
import {Request, Response} from "express";
import {router} from './routes'

const cors = require('cors')
const app = express()
const port=3000
app.listen(port, () => {
    console.log(`express server runnin at ${port}`)
})

app.use('/', router)