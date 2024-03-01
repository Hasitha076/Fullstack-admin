const mongoose = require('mongoose')

const affiliateStatSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
        type: [mongoose.Types.ObjectId],
        ref: "Transaction"
    }
}, { timestamps: true })

const AffiliateStat = mongoose.model("affiliateStat", affiliateStatSchema)

module.exports = AffiliateStat