const express = require('express')
const router = express.Router()

router.get('/:input', (req, res) => {
    const userInput = req.params.input
    const redirectUrl = `https://api.whatsapp.com/send?phone=${userInput}`
    res.redirect(301, redirectUrl);
});

module.exports = router