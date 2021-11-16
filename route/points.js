const express = require('express');
const points = require('../Points');
const pointsRouter = express.Router();
const totalPoints = require('../Points')
const transactions = require('../Transactions')

pointsRouter.get('/', (req, res) => {
    for([key, value] of Object.entries({totalPoints})){
        console.log(`${key}: ${value}`);
    }
    res.json(totalPoints);
})
// UPDATE spend points using the oldest transactions first, points can't be negative
.put('/', (req, res) => {
    // asign points to spend to variable
    let pointsToSpend = req.body.points;
    // sort transactions by oldest first 
    const sortedTransactions = transactions.sort((x, y) => {
        return new Date(x.timestamp) - new Date(y.timestamp);
    })
    // while loop - while points != 0 subtract points from each payer until points = 0
    // console.log(sortedTransactions)
    let transactionHistory;
    while(pointsToSpend > 0){
        let payerSpend = [];
        sortedTransactions.forEach(trx => {
            //create an array to keep track of what each payer is spending
            let payer = trx.payer;
            //check to see if payer exists in array
            let existingPayer = payerSpend.find((p) => p.payer === payer);
            //if array is empty or payer does not exist, add it to the array
            if(payerSpend.length === 0 || !existingPayer){
                let payerDetails;
                        if (trx.points >= pointsToSpend) {
                            console.log(trx.points)
                            payerDetails = {
                                payer,
                                points: (trx.points - pointsToSpend)
                            }
                            payerSpend.push(payerDetails)
                            pointsToSpend = 0;

                        } else {
                            payerDetails = {
                                payer,
                                points: -(trx.points),
                            }
                            pointsToSpend -= trx.points;
                            payerSpend.push(payerDetails)
                        }
                        // console.log(`after:${pointsToSpend}`)
                        // add the payer to the array
                        // console.log(payerSpend)
            } else {
                //find matched payer in payerSpend array
               let matchedPayer = payerSpend.find(payerName => payerName.payer === payer)
               console.log(matchedPayer)
                        //subtract points from matched player points
                        if (trx.points >= pointsToSpend){
                            matchedPayer.points = matchedPayer.points - pointsToSpend;
                            pointsToSpend = 0;
                            // console.log(payerSpend)

                        } else {
                            pointsToSpend -= trx.points;
                            matchedPayer.points -= trx.points
                            console.log(matchedPayer)
                        }
                        //    payerSpend[matchedPayer.payer] = payerSpend[matchedPayer.payer].points - matchedPayer.points
                        //    console.log(payerSpend[matchedPayer])
                        //    console.log(pointsToSpend)
            }
        })
        // console.log(payerSpend)
        // pointsToSpend = 0;
        transactionHistory = payerSpend
    }
    console.log(transactionHistory)
    res.send('sorting')

})








module.exports = pointsRouter;