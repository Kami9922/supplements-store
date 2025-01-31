const express = require('express')
const mapCartProduct = require('../helpers/mapCartProduct')
const {
	addCartProduct,
	getCartProducts,
	deleteCartProduct,
	editCartProduct,
} = require('../controllers/cart')
const jwt = require('jsonwebtoken')
const authenticated = require('../middlewares/authenticated')

const router = express.Router({ mergeParams: true })

const getUserFromToken = (req, res, next) => {
	const token = req.cookies.token
	if (!token) {
		return res.status(401).send({ error: 'Unauthorized: No token provided' })
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		req.userId = decodedToken.id
		next()
	} catch (error) {
		return res.status(401).send({ error: 'Unauthorized: Invalid token' })
	}
}

router.use(getUserFromToken)

router.get('/', authenticated, async (req, res) => {
	try {
		const cartProducts = await getCartProducts(req.userId)
		res.send({ data: { cartProducts: cartProducts.map(mapCartProduct) } })
	} catch (error) {
		res.status(500).send({ error: error.message })
	}
})

router.post('/', authenticated, async (req, res) => {
	try {
		const newCartProduct = await addCartProduct(req.userId, { id: req.body.id })
		res.send({ data: mapCartProduct(newCartProduct) })
	} catch (error) {
		res.status(500).send({ error: error.message })
	}
})

router.patch('/:id', authenticated, async (req, res) => {
	try {
		const updatedCartProduct = await editCartProduct(
			req.userId,
			req.params.id,
			{
				quantity: req.body.quantity,
				operation: req.body.operation,
			}
		)
		res.send({ data: mapCartProduct(updatedCartProduct) })
	} catch (error) {
		res.status(500).send({ error: error.message })
	}
})

router.delete('/:id', authenticated, async (req, res) => {
	try {
		await deleteCartProduct(req.userId, req.params.id)
		res.send({ error: null })
	} catch (error) {
		res.status(500).send({ error: error.message })
	}
})

module.exports = router
