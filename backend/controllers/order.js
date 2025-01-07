const Order = require('../models/Order')

const addOrder = async (products) => {
	const newOrder = await Order.create(products)

	await newOrder.populate('purchaser')

	return newOrder
}

const deleteOrder = async (orderId) => {
	await Order.deleteOne({ _id: orderId })
}

module.exports = {
	addOrder,
	deleteOrder,
}
