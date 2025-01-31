const mongoose = require('mongoose')
const validator = require('validator')

const CartProductSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		cost: {
			type: Number,
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
		quantity: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	{ timestamps: true }
)

const CartProduct = mongoose.model('CartProduct', CartProductSchema)

module.exports = CartProduct
