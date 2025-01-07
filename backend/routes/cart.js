const express = require('express')
const mapOrder = require('../helpers/mapOrder')
const { addOrder } = require('../controllers/order')
const authenticated = require('../middlewares/authenticated')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
	const orders = await getOrders()

	res.send({ data: { orders: orders.map(mapOrder) } })
})

// possible mistakes

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newOrder = await addOrder({
		title: req.body.title,
		content: req.body.content,
		image: req.body.imageUrl,
	})

	res.send({ data: mapOrder(newOrder) })
})

module.exports = router
