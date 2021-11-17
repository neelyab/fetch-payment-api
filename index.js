const express = require('express');
const app = express();

const pointsRouter = require('./route/points');
const trxRouter = require('./route/transactions');


app.use(express.json());
//router for points
app.use('/api/points', pointsRouter);
//router for transactions
app.use('/api/transactions', trxRouter);

const PORT = process.env.PORT || 5000;

//error handler
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
    })

app.listen(PORT, () => console.log(`server listening at Port: ${PORT}`));