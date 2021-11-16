const express = require('express');
const app = express();
// require points router
const pointsRouter = require('./route/points');
const trxRouter = require('./route/transactions')


app.use(express.json());

app.use('/api/points', pointsRouter);
app.use('/api/transactions', trxRouter)

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`server listening at Port: ${PORT}`));