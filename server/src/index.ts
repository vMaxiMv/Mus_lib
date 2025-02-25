require('dotenv').config()

const express = require('express')
const {PrismaClient} = require("@prisma/client");
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')


const PORT = process.env.PORT || 5000
const app = express()
const prisma = new PrismaClient()
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

app.use(cors())
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)


app.listen(PORT, ()=>console.log(`Hello, порт ${PORT}!!!`))