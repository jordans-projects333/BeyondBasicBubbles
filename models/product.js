const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        // required: true
    },
    options: {
        type: mongoose.SchemaTypes.Mixed,
    },
    imageBlurHash: {
        type: String
    },
    alternateImages: {
        type: [String],
        default: []
    },
    priority: {
        type: Number
    },
    numberOfViews: {
        type: Number,
        default: 0
    },
    numberOfPurchases: {
        type: Number,
        default: 0
    },
    numberOfSubscriptionsAddedTo: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [mongoose.SchemaTypes.Mixed]
    }
}, { strict: false })

module.exports = mongoose.model('Product', productSchema)