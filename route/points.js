const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello')
})

// GET return all payer point balances
// POST add transactions for a specific payer and date

// UPDATE spend points using the oldest transactions first, points can't be negative

        //sort transactions - oldest first
        // while loop - while points != 0 subtract points from each payer until points = 0







module.exports = router;