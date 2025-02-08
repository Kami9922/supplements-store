const express = require('express')
const {
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
} = require('../controllers/user')
const hasRole = require('../middlewares/hasRole')
const authenticated = require('../middlewares/authenticated')
const mapUser = require('../helpers/mapUser')
const ROLES = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers()

	res.send({ data: users.map(mapUser) })
})

router.get(
	'/roles',
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			const roles = getRoles()

			res.send({ data: roles })
		} catch (error) {
			res.send({ error: 'Failed to get roles', details: error })
		}
	}
)

router.patch(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			const newUser = await updateUser(req.params.id, {
				role: req.body.roleId,
			})

			res.send({ data: mapUser(newUser) })
		} catch (error) {
			res.send({ error: 'Failed to edit role', details: error })
		}
	}
)

router.delete(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			await deleteUser(req.params.id)

			res.send({ error: null })
		} catch (error) {
			res.send({ error: 'Failed to delete user', details: error })
		}
	}
)

module.exports = router
