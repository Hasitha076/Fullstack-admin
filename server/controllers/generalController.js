
const userSchema = require('../models/userModel')
const Transaction = require('../models/transactions')
const OverallStat = require('../models/OverallStat')

const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userSchema.findById(id)
        return res.status(200).json({ message: "User found", user })
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

const getDashboardStats = async (req, res) => {
    try {
        // hardcoded value
        const currentMonth = "November"
        const currentYear = 2021
        const currentDay = "2021-11-15"

        // recent transactions
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 })

        // Overall Stats
        const overallStat = await OverallStat.find({ year: currentYear })

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            dailyData,
            salesByCategory
        } = overallStat[0]

        const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth
        })

        const todayStats = overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay
        })

        return res.status(200).json({
            messege: "Result",
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            dailyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error!!" })
    }
}

module.exports = {
    getUser,
    getDashboardStats
}