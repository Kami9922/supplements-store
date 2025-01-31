module.exports = (cartProduct) => ({
	id: cartProduct._id,
	title: cartProduct.title,
	imageUrl: cartProduct.image,
	cost: cartProduct.cost,
	quantity: cartProduct.quantity,
	publishedAt: cartProduct.createdAt,
})
