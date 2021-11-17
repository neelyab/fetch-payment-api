const express = require('express');
const trxRouter = express.Router();
const trx = require('../Transactions');

// GET return all payer point balances
trxRouter.get('/', (req, res) => {
   return res.json({trx});
})
// POST add transactions for a specific payer and date
.post('/', (req, res)=> {
    //takes an object with payer, points, and timestamp
    let transaction = req.body;
    let error;
    // check to make sure all fields and values are included
    for (const field of ['payer', 'points']) {
        if (!transaction[field]){
            error = `Missing ${field}`
        }
    }
    for ([key, value] of Object.entries(transaction)) {
        if (value === null) {
            error = `please add a value to ${key}`
        }
    }
    if (error) {
        return res.status(400).json({error});
    }
    // if no timestamp is included, make a new one
    if (!transaction.timestamp) {
        transaction.timestamp = new Date();
    }
    // add to the array of transactions
    trx.push(transaction);
    return res.status(200).json(transaction);
   
})

module.exports = trxRouter;