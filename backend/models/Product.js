const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	cost: {
		type: Number,
		required: true,
	},
	storeAmount: {
		type: Number,
		required: true,
	},
	info: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
