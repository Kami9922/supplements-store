const express = require('express')
const fileMiddleware = require('../middlewares/file')

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
	try {
		const { search, limit, page, sortBy, category } = req.query

		const sort = {}
		if (sortBy === 'costAsc') {
			sort.cost = 1
		} else if (sortBy === 'costDesc') {
			sort.cost = -1
		}

		const filter = {}
		if (category) {
			filter.category = category
		}

		const { products, lastPage } = await getProducts(
			search,
			limit,
			page,
			sort,
			filter
		)

		res.send({ data: { lastPage, products: products.map(mapProduct) } })
	} catch (error) {
		res.send({ error: 'Failed to get products', details: error })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const post = await getProduct(req.params.id)

		res.send({ data: mapProduct(post) })
	} catch (error) {
		res.send({ error: 'Failed to get product', details: error })
	}
})

router.post(
	'/',
	authenticated,
	hasRole([ROLES.ADMIN]),
	fileMiddleware.single('image'),
	async (req, res) => {
		try {
			const newProduct = await addProduct({
				title: req.body.title,
				category: req.body.category,
				cost: req.body.cost,
				storeAmount: req.body.storeAmount,
				image: req.file ? req.file.path : req.body.image,
				info: req.body.info,
			})

			res.send({ data: mapProduct(newProduct) })
		} catch (error) {
			res.send({ error: 'Failed to post product', details: error })
		}
	}
)

router.patch(
	'/:id',
	authenticated,
	fileMiddleware.single('image'),
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			const updatedProduct = await editProduct(req.params.id, {
				title: req.body.title,
				category: req.body.category,
				cost: req.body.cost,
				storeAmount: req.body.storeAmount,
				image: req.file ? req.file.path : req.body.image,
				info: req.body.info,
			})

			res.send({ data: mapProduct(updatedProduct) })
		} catch (error) {
			console.error(error)
			res
				.status(400)
				.send({ error: 'Failed to update product', details: error })
		}
	}
)

router.delete(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			await deleteProduct(req.params.id)

			res.send({ error: null })
		} catch (error) {
			res.send({ error: 'Failed to delete product', details: error })
		}
	}
)

module.exports = router
