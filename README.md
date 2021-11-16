## Running the server
In Git Bash or on the command line 'npm start' will start the server

## AUTHENTICATION

does not require a token or key to use
Each request must include  `content-type: application/json`

## POST new transaction

* POST /api/transactions
* Request Body must include: {payer: 'STRING', points: NUMBER, timestamp: 'STRING'}


## GET all transactions

* GET /api/transactions


## GET points available for each payer
* GET /api/points

## POST spend points
* POST /api/points
* Request Body must include: {points: NUMBER}