## AUTHENTICATION

does not require a token or key to use
Each request must include  `content-type: application/json`

## POST new transaction

* POST /api/transactions
* Request Body must include: payer, points, timestamp


## GET transactions

* GET /api/transactions


## GET points
* GET /api/points

## POST spend points
* POST /api/points
* Request Body must include: points