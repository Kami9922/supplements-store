const Product = require('../models/Product')
const fs = require('fs')
const path = require('path')

const deleteImage = async (productId) => {
	const product = await Product.findById(productId)
	if (!product) {
		return
	}

	const imagePath = path.join(__dirname, '..', product.image)

	if (!fs.existsSync(imagePath)) {
		return
	}

	fs.unlink(imagePath, (err) => {
		if (err) {
			console.error('Error deleting file:', err)
			return err
		}
	})
}

const addProduct = async (product) => {
	const newProduct = await Product.create(product)

	return newProduct
}

const editProduct = async (id, deleteImageFlag, updatedProductData) => {
	if (deleteImageFlag === 'true') {
		await deleteImage(id)
	}

	const finalProduct = await Product.findByIdAndUpdate(id, updatedProductData, {
		new: true,
	})

	return finalProduct
}

const deleteProduct = async (id) => {
	await deleteImage(id)
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

const getProduct = (id) => Product.findById(id)

module.exports = {
	addProduct,
	editProduct,
	deleteProduct,
	getProducts,
	getProduct,
}
