const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const router = express.Router()

router.get("/", (req, res)=> {
    axios.get('https://publicgold.com.my/').then((respond) => {
        const html_data = respond.data
        const $ = cheerio.load(html_data)
        const price = $(':contains("1.0000")')
        const priceArray = [];
        price.each((i, element) => {
            priceArray.push($(element).text().trim());
        });
        const lastprice = (priceArray[priceArray.length - 1]);
        const now = new Date();
        const timestamp = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        res.status(200).json({timestamp ,lastprice})
        
    })

})

module.exports = router