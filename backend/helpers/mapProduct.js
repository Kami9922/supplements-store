module.exports = (product) => ({
	id: product.id,
	title: product.title,
	imageUrl: product.image,
	category: product.category,
	cost: product.cost,
	amount: product.amount,
	publishedAt: product.createdAt,
})
