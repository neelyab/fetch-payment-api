const express = require('express');
const trxRouter = express.Router();
const trx = require('../Transactions')

// GET return all payer point balances
trxRouter.get('/', (req, res) => {
    res.json({trx})
})
// POST add transactions for a specific payer and date
.post('/', (req, res)=> {
    res.send('hello')
    //takes an object with payer, points, and timestamp
    //check to see if all keys/values are present
    //if no timestamp is included, add a new timestamp
    //add to array
    //return 204 and json object
})

module.exports = trxRouter;