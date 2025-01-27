module.exports = (product) => ({
	id: product.id,
	title: product.title,
	category: product.category,
	cost: product.cost,
	info: product.info,
	storeAmount: product.storeAmount,
	imageUrl: product.image,
	publishedAt: product.createdAt,
})
