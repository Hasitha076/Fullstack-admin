const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')

const clientRoute = require('./routes/clientRoute')
const generalRoute = require('./routes/generalRoute')
const managementRoute = require('./routes/managementRoute')
const salesRoute = require('./routes/salesRoute')

const userSchema = require('./models/userModel')
const product = require('./models/product')
const productStat = require('./models/productStat')
const transaction = require('./models/transactions')
const overallStat = require('./models/OverallStat')
const affiliateStat = require('./models/AffiliateStat')
const { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } = require('./data/index')

// connect DB
const connectDB = require('./config/db')
connectDB().then(() => {
    // userSchema.insertMany(dataUser)
    // product.insertMany(dataProduct)
    // productStat.insertMany(dataProductStat)
    // transaction.insertMany(dataTransaction)
    // overallStat.insertMany(dataOverallStat)
    // affiliateStat.insertMany(dataAffiliateStat)
})


// configuration
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 5000

// routes
app.use('/client', clientRoute)
app.use('/general', generalRoute)
app.use('/management', managementRoute)
app.use('/sales', salesRoute)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`)
})
