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

const deleteProduct = (id) => {
	return Product.deleteOne({ _id: id })
}

const getProducts = async (search = '', limit = 10, page = 1) => {
	const [products, count] = await Promise.all([
		Product.find({ title: { $regex: search, $options: 'i' } })
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		Product.countDocuments({ title: { $regex: search, $options: 'i' } }),
	])

	return {
		products,
		lastPage: Math.ceil(count / limit),
	}
}

const getProduct = (id) => {
	return Product.findById(id)
	// .populate({
	// 	path: 'product',
	// 	populate: 'purchaser',
	// })
}
// possible mistakes

module.exports = {
	addProduct,
	editProduct,
	deleteProduct,
	getProducts,
	getProduct,
}
