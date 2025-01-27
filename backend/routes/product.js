const express = require('express')
const {
	getProducts,
	getProduct,
	addProduct,
	editProduct,
	deleteProduct,
} = require('../controllers/product')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const mapProduct = require('../helpers/mapProduct')
const ROLES = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
	const { products, lastPage } = await getProducts(
		req.query.search,
		req.query.limit,
		req.query.page
	)

	res.send({ data: { lastPage, products: products.map(mapProduct) } })
})

router.get('/:id', async (req, res) => {
	const post = await getProduct(req.params.id)

	res.send({ data: mapProduct(post) })
})

// router.post('/:id/comments', authenticated, async (req, res) => {
// 	const newComment = await addComment(req.params.id, {
// 		content: req.body.content,
// 		author: req.user.id,
// 	})

// 	res.send({ data: mapCart(newComment) })
// })

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newProduct = await addProduct({
		title: req.body.title,
		category: req.body.category,
		cost: req.body.cost,
		storeAmount: req.body.storeAmount,
		image: req.body.imageUrl,
		info: req.body.info,
	})

	res.send({ data: mapProduct(newProduct) })
})

router.patch(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		const updatedProduct = await editProduct(req.params.id, {
			title: req.body.title,
			category: req.body.category,
			cost: req.body.cost,
			storeAmount: req.body.storeAmount,
			image: req.body.imageUrl,
			info: req.body.info,
		})

		res.send({ data: mapProduct(updatedProduct) })
	}
)

router.delete(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		await deleteProduct(req.params.id)

		res.send({ error: null })
	}
)

module.exports = router
