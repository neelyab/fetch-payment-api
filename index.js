const express = require('express');
const app = express();

const points = require('./route/points')

const logger = require('./middleware/logger');


app.use(express.json());

app.use('/api/points', points);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`server listening at Port: ${PORT}`));