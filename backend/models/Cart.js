const mongoose = require('mongoose')

const CartSchema = mongoose.Schema(
	{
		purchaser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		cartProducts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'CartProduct',
			},
		],
	},

	{ timestamps: true }
)

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
