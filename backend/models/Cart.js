const mongoose = require('mongoose')
const validator = require('validator')

const CartSchema = mongoose.Schema(
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
		// purchaser: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'User',
		// },
	},
	{ timestamps: true }
)

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
