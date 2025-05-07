/* Import module */
const express = require('express')

/* Start app */
const app = express()
app.use(express.json())

/* Set route */
app.get("/", (req, res) =>{
    res.status(200).json("running")
})

const priceRouter = require('./routes/price')
app.use('/price', priceRouter)

const solatRouter = require('./routes/solat')
app.use('/solat', solatRouter)

/* Start Listener */
const port = 3000;
app.listen(port, () => {
    console.log("Server running..")
})



