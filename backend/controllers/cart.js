const Cart = require('../models/Cart')
const CartProduct = require('../models/CartProduct')
const Product = require('../models/Product')

const addNewCart = async (userId) => Cart.create({ purchaser: userId })

const addCartProduct = async (userId, productId) => {
	try {
		const { id } = productId

		const product = await Product.findById(id)
		if (!product) {
			throw new Error('Product not found')
		}

		const { title, cost, image } = product
		let quantity = 1

		const cart = await Cart.findOne({ purchaser: userId })
		if (!cart) {
			throw new Error('Cart not found')
		}

		const newCartProduct = await CartProduct.create({
			title,
			cost,
			image,
			quantity,
		})

		cart.cartProducts.push(newCartProduct._id)
		await cart.save()
		return newCartProduct
	} catch (error) {
		console.error('Error adding cart product:', error)
		throw error
	}
}

const getCartProducts = async (userId) => {
	const cart = await Cart.findOne({ purchaser: userId }).populate({
		path: 'cartProducts',
		model: 'CartProduct',
	})

	if (!cart) {
		return []
	}
	return cart.cartProducts
}

const deleteCartProduct = async (userId, cartProductId) => {
	const cart = await Cart.findOne({ purchaser: userId })
	if (cart) {
		cart.cartProducts.pull(cartProductId)
		await cart.save()
		await CartProduct.deleteOne({ _id: cartProductId })
	}
}

const editCartProduct = async (userId, id, { quantity, operation }) => {
	const cart = await Cart.findOne({ purchaser: userId })
	if (!cart) {
		throw new Error('Cart not found')
	}

	let updatedQuantity
	const cartProduct = await CartProduct.findById(id)

	if (operation === 'increase') {
		updatedQuantity = cartProduct.quantity + 1
	}
	if (operation === 'reduce') {
		updatedQuantity = cartProduct.quantity - 1
	}

	const updatedCartProduct = await CartProduct.findByIdAndUpdate(
		id,
		{ quantity: updatedQuantity },
		{ new: true }
	)
	return updatedCartProduct
}

module.exports = {
	addCartProduct,
	deleteCartProduct,
	getCartProducts,
	editCartProduct,
	addNewCart,
}
