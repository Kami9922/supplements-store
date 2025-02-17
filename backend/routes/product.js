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
const Product = require('../models/Product')
const { DEFAULT_IMG } = require('../constants/defalut-img')

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
		res.send({ error: 'Failed to get products' })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const product = await getProduct(req.params.id)

		res.send({ data: mapProduct(product) })
	} catch (error) {
		res.send({ error: 'Failed to get product' })
	}
})

router.post(
	'/',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	fileMiddleware.single('image'),
	async (req, res) => {
		try {
			const imagePath = req.file ? req.file.path : req.body.image

			const newProduct = await addProduct({
				title: req.body.title,
				category: req.body.category,
				cost: req.body.cost,
				storeAmount: req.body.storeAmount,
				image: !imagePath ? DEFAULT_IMG : imagePath,
				info: req.body.info,
			})
			res.send({ data: mapProduct(newProduct) })
		} catch (error) {
			res.send({ error: 'Failed to post product' })
		}
	}
)

router.patch(
	'/:id',
	authenticated,
	fileMiddleware.single('image'),
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			const imagePath = req.file ? req.file.path : req.body.image

			const updatedData = {
				title: req.body.title,
				category: req.body.category,
				cost: req.body.cost,
				storeAmount: req.body.storeAmount,
				image: imagePath,
				info: req.body.info,
			}

			const updatedProduct = await editProduct(
				req.params.id,
				req.body.deleteImageFlag,
				updatedData
			)

			res.send({ data: mapProduct(updatedProduct) })
		} catch (error) {
			console.error(error)
			send({ error: 'Failed to update product' })
		}
	}
)

router.delete(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		try {
			await deleteProduct(req.params.id)

			res.send({ error: null })
		} catch (error) {
			res.send({ error: 'Failed to delete product' })
		}
	}
)

module.exports = router
