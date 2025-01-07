module.exports = (order) => ({
	products: order.products,
	purchaser: order.purchaser.login,
	id: order._id,
	publishedAt: order.createdAt,
})
