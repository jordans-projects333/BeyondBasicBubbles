const mongoose = require('mongoose')

const adminDataSchema = new mongoose.Schema({
    productViewCounts: {
        type: [mongoose.SchemaTypes.Mixed],
        default: []
    },
    productBoughtCounts: {
        type: [mongoose.SchemaTypes.Mixed],
        default: []
    },
    productRevenues: {
        type: [mongoose.SchemaTypes.Mixed],
        default: []
    },
    totalRevenue: {
        type: Number,
        default: 0
    },
    newPageViewCount: {
        type: Number,
        default: 0
    },
    returningPageViewCount: {
        type: Number,
        default: 0
    },
    signedUpTotal: {
        type: Number,
        default: 0
    },
    madePurchase: {
        type: Number,
        default: 0
    },
    madeSubscription: {
        type: Number,
        default: 0
    },
    galleryPreview: {
        type: [mongoose.SchemaTypes.Mixed]
    }
})

module.exports = mongoose.model('AdminData', adminDataSchema)