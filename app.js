const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const mongoose = require('mongoose')
const config = require('config')

const PORT = process.env.PORT || config.get('port') || 5000
const MONGODB_URI = config.get('mongoUri')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Database connected successfully')
    } catch (e) {
        throw e
    }
}

const listenServer = () => {
    server.listen(PORT, () => {
        console.log(`Server is on port ${PORT}`)
    })
}

const start = () => {
    try {
        connectToDatabase()
        listenServer()
    } catch (e) {
        console.log(`Server error: ${e.message}`)
        process.exit(1)
    }
}

start()
