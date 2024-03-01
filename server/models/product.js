const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number
}, { timestamps: true })

const Product = mongoose.model("product", productSchema)

module.exports = Product