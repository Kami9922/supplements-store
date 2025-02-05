const Product = require('../models/Product')
const fs = require('fs')
const path = require('path')

const addProduct = async (product) => {
	const newProduct = await Product.create(product)

	return newProduct
}

const editProduct = async (id, product) => {
	const newProduct = await Product.findByIdAndUpdate(id, product, {
		returnDocument: 'after',
	})

	return newProduct
}

const deleteProduct = async (id) => {
	const product = await Product.findById(id)

	if (!product) {
		throw new Error('Product not found')
	}

	const imagePath = path.join(__dirname, '..', product.image)

	fs.unlink(imagePath, (err) => {
		if (err) {
			console.error('Error deleting file:', err)
		}
	})

	await Product.findByIdAndDelete(id)
}

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
