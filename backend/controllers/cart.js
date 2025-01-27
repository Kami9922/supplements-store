const Cart = require('../models/Cart')
const Product = require('../models/Product')

const addCartProduct = async (productId) => {
	const { id } = productId

	const { title, cost, image } = await Product.findById(id)

	let quantity = 1

	return await Cart.create({ title, cost, image, quantity })
}

// await newCart.populate('purchaser')

const getCartProducts = async () => await Cart.find()
// .populate({ path: 'purchaser', populate: 'login' })

const deleteCartProduct = async (cartId) => {
	await Cart.deleteOne({ _id: cartId })
}

const editCartProduct = async (id, { quantity, operation }) => {
	let updatedQuantity

	if (operation === 'increase') {
		updatedQuantity = quantity + 1
	}

	if (operation === 'reduce') {
		updatedQuantity = quantity - 1
	}

	const updatedCartProduct = await Cart.findByIdAndUpdate(
		id,
		{ quantity: updatedQuantity },
		{
			new: true,
		}
	)
	return updatedCartProduct
}

module.exports = {
	addCartProduct,
	deleteCartProduct,
	getCartProducts,
	editCartProduct,
}
