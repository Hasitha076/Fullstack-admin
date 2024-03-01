const OverallStat = require('../models/OverallStat')

const getSales = async (req, res) => {
    try {
        const overallStat = await OverallStat.find()
        return res.status(200).json(overallStat[0])
    } catch (error) {
        return res.status(500).json({ message: "Server error!" })
    }
}

module.exports = {
    getSales
}