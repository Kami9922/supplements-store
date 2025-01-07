const express = require('express')
const {
	getProducts,
	getProduct,
	addProduct,
	editProduct,
	deleteProduct,
} = require('../controllers/product')
const { addOrder, deleteOrder } = require('../controllers/order')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const mapProduct = require('../helpers/mapProduct')
const mapOrder = require('../helpers/mapOrder')
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

// router.get('/:id', async (req, res) => {
// 	const post = await getProduct(req.params.id)

// 	res.send({ data: mapProduct(post) })
// })

// router.post('/:id/comments', authenticated, async (req, res) => {
// 	const newComment = await addComment(req.params.id, {
// 		content: req.body.content,
// 		author: req.user.id,
// 	})

// 	res.send({ data: mapOrder(newComment) })
// })

// router.delete(
// 	'/:postId/comments/:commentId',
// 	authenticated,
// 	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
// 	async (req, res) => {
// 		await deleteComment(req.params.postId, req.params.commentId)

// 		res.send({ error: null })
// 	}
// )

// router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
// 	const newPost = await addPost({
// 		title: req.body.title,
// 		content: req.body.content,
// 		image: req.body.imageUrl,
// 	})

// 	res.send({ data: mapProduct(newPost) })
// })

// router.patch(
// 	'/:id',
// 	authenticated,
// 	hasRole([ROLES.ADMIN]),
// 	async (req, res) => {
// 		const updatedPost = await editPost(req.params.id, {
// 			title: req.body.title,
// 			content: req.body.content,
// 			image: req.body.imageUrl,
// 		})

// 		res.send({ data: mapProduct(updatedPost) })
// 	}
// )

// router.delete(
// 	'/:id',
// 	authenticated,
// 	hasRole([ROLES.ADMIN]),
// 	async (req, res) => {
// 		await deletePost(req.params.id)

// 		res.send({ error: null })
// 	}
// )

module.exports = router
