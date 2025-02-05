const multer = require('multer')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const types = ['image/jpg', 'image/jpeg', 'image/png']

const fileFilter = (req, file, cb) => {
	if (types.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

module.exports = multer({
	storage,
	fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 },
})
