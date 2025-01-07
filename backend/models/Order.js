const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
	{
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
		purchaser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order
