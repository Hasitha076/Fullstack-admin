const product = require('../models/product')
const ProductStat = require('../models/productStat')
const User = require('../models/userModel')
const Transaction = require('../models/transactions')
const getCountryIso3 = require('country-iso-2-to-3')

const getProducts = async (req, res) => {
    try {
        const products = await product.find()

        const productsWithStat = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return { ...product._doc, stat }
            })
        )

        return res.status(200).json({ message: "All products with stat", productsWithStat })
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const getCustomers = async (req, res) => {
    try {
        const Customers = await User.find({ role: "user" }).select("-password")
        return res.status(200).json({ message: "All the customers", Customers })
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const getTransactions = async (req, res) => {
    try {
        // sort should look like this: { "field": "userId", "sort" : "desc" }
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query

        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort)
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1)
            }

            return sortFormatted
        }

        const sortFormatted = Boolean(sort) ? generateSort() : {}

        const Transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }
            ]
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize)

        const total = await Transaction.countDocuments({
            cost: { $regex: search, $options: "i" }
        })

        console.log("total count: ", total)

        return res.status(200).json({ message: "All the transactions", Transactions, total })
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const getGeography = async (req, res) => {
    try {
        const users = await User.find()

        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country)
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0
            }
            acc[countryISO3]++
            return acc
        }, {})

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count }
            }
        )
        return res.status(200).json({ message: "All countries details", formattedLocations })

    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

module.exports = {
    getProducts,
    getCustomers,
    getTransactions,
    getGeography
}