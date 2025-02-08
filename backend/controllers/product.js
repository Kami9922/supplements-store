const Product = require('../models/Product')
const fs = require('fs')
const path = require('path')

const handleImageAndCheckProduct = async (id) => {
	const product = await Product.findById(id)
	if (!product) {
		throw new Error('Product not found')
	}

	const imagePath = path.join(__dirname, '..', product.image)
	await new Promise((resolve, reject) => {
		fs.unlink(imagePath, (err) => {
			if (err) {
				console.error('Error deleting file:', err)
				return reject(err)
			}
			resolve()
		})
	})

	return product
}

const addProduct = async (product) => {
	const newProduct = await Product.create(product)

	return newProduct
}

const editProduct = async (id, updatedProductData) => {
	await handleImageAndCheckProduct(id)
	return Product.findByIdAndUpdate(id, updatedProductData, {
		new: true,
	})
}

const deleteProduct = async (id) => {
	await handleImageAndCheckProduct(id)
	return Product.findByIdAndDelete(id)
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
