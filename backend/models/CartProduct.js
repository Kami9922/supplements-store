const mongoose = require('mongoose')

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
