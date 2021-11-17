const express = require('express');
const pointsRouter = express.Router();
const transactions = require('../Transactions');

pointsRouter.get('/', (req, res) => {
    let result;
    if (transactions.length > 0) {
        //reduce transactions - match payer name and get sum of all points
            result = transactions.reduce((acc, d) => {
                const found = acc.find(a => a.payer === d.payer);
                // const value = { payer: d.payer, points: d.points };
                if (found) {
                    //add points to existing points
                    found.points += d.points;
                }
                else {
                    //add the payer and points to the results array
                acc.push({ payer: d.payer, points: d.points });
                }
                return acc;
            }, []);
    }   

        return res.status(200).json(result);
    })
// spend points using the oldest transactions first, points can't be negative
.post('/', (req, res) => {
    // asign points to spend to variable
    let error;
    let pointsToSpend = req.body.points;
    if (!pointsToSpend || (typeof pointsToSpend) !== 'number'){
        error = `Please enter points to spend, must be a number.`
    }
    // sort transactions by oldest first 
    if (error){
        return res.status(400).json({error})
    }
    const sortedTransactions = transactions.sort((x, y) => {
        return new Date(x.timestamp) - new Date(y.timestamp);
    })
//initiate empty array to keep track of payer points that are spent
    let payerSpend= [];
    
      sortedTransactions.forEach(trx => {
            const payer = trx.payer;
            const points = trx.points;
            //check to see if payer exists in payerSpend array
            const existingPayer = payerSpend.find((p) => p.payer === payer);
            //if points to spend or transaction points are zero, return
            if (pointsToSpend === 0 || points === 0) {
                return;
            }
            // if the payer doesn't exist in the array and the points are greater than the points to spend, subtract from points and return 
            else if (!existingPayer && (points > pointsToSpend) && (points > 0)) {
                let payerDetails;

                payerDetails = {
                        payer,
                        points: -(pointsToSpend)
                        }

                // add payer to array
                payerSpend.push(payerDetails);
                pointsToSpend = 0;
                return;
            // if the payer doesn't exist in the array and the points are less than points to spend, subtract the points
            } else if (!existingPayer && (points < pointsToSpend) && (points > 0)) {

                payerDetails = {
                    payer,
                    points: -(points),
                    }

                //update points
                pointsToSpend -= points;
                payerSpend.push(payerDetails);
            } else {
                //find / match payer in payerSpend array
                let matchedPayer = payerSpend.find(payerName => payerName.payer === payer);
                        //subtract points from matched player points
                        if (points >= pointsToSpend) {
                            // if transaction points are equal to or greater than points to spend / the array contains payer spend,
                            matchedPayer.points = matchedPayer.points - pointsToSpend;
                            pointsToSpend = 0;
                            return;

                        } else {
                            pointsToSpend -= points;
                            matchedPayer.points -= points;
                        }
            }
        })
        //add timestamp to spent transactions
        payerSpend.forEach(t => {
            t.timestamp = new Date();
            // push to main transaction array
            transactions.push(t);
        })
      
        return res.status(200).json(payerSpend);

})








module.exports = pointsRouter;