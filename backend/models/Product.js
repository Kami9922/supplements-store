const mongoose = require('mongoose')
const validator = require('validator')

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
	amount: {
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
		validate: {
			validator: validator.isURL,
			message: 'Image should be a valid url',
		},
	},
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
