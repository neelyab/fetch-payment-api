const express = require('express');
const pointsRouter = express.Router();
const totalPoints = require('../Points')

pointsRouter.get('/', (req, res) => {
    for([key, value] of Object.entries({totalPoints})){
        console.log(`${key}: ${value}`);
    }
    res.json(totalPoints);
})
.put('/', (req, res) => {
    let pointsToSpend = req.body.points;
    res.json(pointsToSpend)
})

// GET return all payer point balances
// POST add transactions for a specific payer and date

// UPDATE spend points using the oldest transactions first, points can't be negative

        //sort transactions - oldest first
        // while loop - while points != 0 subtract points from each payer until points = 0







module.exports = pointsRouter;