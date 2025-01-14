module.exports = (product) => ({
	id: product.id,
	title: product.title,
	category: product.category,
	cost: product.cost,
	amount: product.amount,
	imageUrl: product.image,
	publishedAt: product.createdAt,
})
