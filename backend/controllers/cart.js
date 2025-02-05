const Cart = require('../models/Cart')
const CartProduct = require('../models/CartProduct')
const Product = require('../models/Product')

const addNewCart = async (userId) => {
	return await Cart.create({ purchaser: userId })
}

const addCartProduct = async (userId, productId) => {
	const { id } = productId

	const { title, cost, image } = await Product.findById(id)
	let quantity = 1

	const cart = await Cart.findOne({ purchaser: userId })
	if (!cart) {
		throw new Error('Cart not found')
	}

	const cartProduct = await CartProduct.create({ title, cost, image, quantity })
	cart.cartProducts.push(cartProduct._id)
	await cart.save()

	return cartProduct
}

const getCartProducts = async (userId) => {
	const cart = await Cart.findOne({ purchaser: userId }).populate(
		'cartProducts'
	)
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
