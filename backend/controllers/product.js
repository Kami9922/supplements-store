const Product = require('../models/Product')

const addProduct = async (product) => {
	const newProduct = await Product.create(product)

	return newProduct
}

const editProduct = async (id, product) => {
	const newProduct = await Product.findByIdAndUpdate(id, product, {
		returnDocument: 'after',
	})

	// await newProduct.populate({ path: 'comments', populate: 'purchaser' })

	return newProduct
}

const deleteProduct = (id) => Product.deleteOne({ _id: id })

const getProducts = async (
	search = '',
	limit = Infinity,
	page = 1,
	sortBy = {},
	filterBy = {}
) => {
	const query = {
		title: { $regex: search, $options: 'i' },
		...filterBy,
	}

	const [products, count] = await Promise.all([
		Product.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(sortBy),
		Product.countDocuments(query),
	])

	return {
		products,
		lastPage: Math.ceil(count / limit),
	}
}

const getProduct = (id) => {
	return Product.findById(id)
}

module.exports = {
	addProduct,
	editProduct,
	deleteProduct,
	getProducts,
	getProduct,
}
