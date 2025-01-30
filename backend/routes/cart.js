const express = require('express')
const mapCart = require('../helpers/mapCart')
const {
	addCartProduct,
	getCartProducts,
	deleteCartProduct,
	editCartProduct,
} = require('../controllers/cart')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
	const cartProducts = await getCartProducts()

	res.send({ data: { cartProducts: cartProducts.map(mapCart) } })
})

router.post('/', async (req, res) => {
	const newCartProduct = await addCartProduct({ id: req.body.id })

	res.send({ data: mapCart(newCartProduct) })
})

router.patch('/:id', async (req, res) => {
	const updatedCartProduct = await editCartProduct(req.params.id, {
		quantity: req.body.quantity,
		operation: req.body.operation,
	})

	res.send({ data: mapCart(updatedCartProduct) })
})

router.delete('/:id', async (req, res) => {
	await deleteCartProduct(req.params.id)

	res.send({ error: null })
})

module.exports = router
