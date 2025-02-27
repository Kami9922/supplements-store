const express = require('express')
const { register, login } = require('../controllers/user')
const mapUser = require('../helpers/mapUser')
const { addNewCart } = require('../controllers/cart')

const router = express.Router({ mergeParams: true })

router.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password)
		await addNewCart(user._id)
		res.cookie('token', token, { httpOnly: true }).send({ user: mapUser(user) })
	} catch (error) {
		res.send({ error: 'Failed to register' })
	}
})

router.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password)

		res.cookie('token', token, { httpOnly: true }).send({ user: mapUser(user) })
	} catch (error) {
		res.send({ error: 'Failed to login' })
	}
})

router.post('/logout', (req, res) => {
	try {
		res.cookie('token', '', { httpOnly: true }).send({})
	} catch (error) {
		res.send({ error: 'Failed to logout' })
	}
})

module.exports = router
