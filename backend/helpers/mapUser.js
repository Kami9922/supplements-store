module.exports = (user) => ({
	id: user.id,
	login: user.login,
	roleId: user.role,
	registeredAt: user.createdAt,
})
