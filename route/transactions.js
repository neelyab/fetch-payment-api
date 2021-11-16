const express = require('express');
const trxRouter = express.Router();
const trx = require('../Transactions')

// GET return all payer point balances
trxRouter.get('/', (req, res) => {
    res.json({trx})
})
// POST add transactions for a specific payer and date
.put('/', (req, res)=> {
    res.send('hello')
})


module.exports = trxRouter;