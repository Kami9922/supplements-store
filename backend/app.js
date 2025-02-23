require('dotenv').config()
const path = require('path')

// const cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const app = express()
const port = 5000

app.use(cookieParser())
app.use(express.json({ extended: true }))

app.use(express.static(path.resolve('..', 'frontend', 'build')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', routes)

app.get('*', (req, res) => {
	res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'))
})

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server started on port ${port}`)
		})
	})
	.catch((err) => {
		console.error('Database connection error:', err)
	})
