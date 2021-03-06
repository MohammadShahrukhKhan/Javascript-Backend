// Multiple Middleware Functions

const express = require('express')
const app = express()
const port = 5000
const logger = require('./logger.js')
const authorize = require('./authorize.js')

app.use([logger, authorize]) 

app.get('/', (req, res) => {
    res.send('<h1>HOME</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>ABOUT</h1>')
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', (req, res) => {
    console.log(req.user)
    res.send('Items')
})

app.listen(port, ()=>{
    console.log(`Serving at http://localhost:${port}`)
})
