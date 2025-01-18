module.exports = (product) => ({
	id: product.id,
	title: product.title,
	category: product.category,
	cost: product.cost,
	info: product.info,
	amount: product.amount,
	imageUrl: product.image,
	publishedAt: product.createdAt,
})
