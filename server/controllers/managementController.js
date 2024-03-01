const mongoose = require('mongoose')
const User = require('../models/userModel')
const Transaction = require('../models/transactions')

const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password")
        return res.status(200).json(admins)
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params

        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats" }
        ])

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id)
            })
        )

        const filteredSaleTransaction = saleTransactions.filter(
            (transaction) => transaction !== null
        )

        return res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransaction })
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    getAdmins,
    getUserPerformance
}