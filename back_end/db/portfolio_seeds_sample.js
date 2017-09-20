use stockoverflow;

db.portfolio.remove({});

db.portfolio.insert( 
  [
    {
      "name": "Walmart",
      "epic":"WMT",
      "price": 120.00,
      "quantity": 2000,
      "buyPrice": 80.00,
      "lastUpdated": "2017-09-01",
      "pastCloseOfDayPrices": [92.00, 89.00, 103.00, 125.00, 108.00, 98.00, 110.00],
      "buyDate":"2014-11-15"
    },
    {
      "name": "Blackrock",
      "epic":"BLK",
      "price": 100.00,
      "quantity": 1000,
      "buyPrice": 60.00,
      "lastUpdated": "2017-09-20",
      "pastCloseOfDayPrices": [72.00, 49.00, 83.00, 85.00, 88.00, 88.00, 110.00],
      "buyDate":"2014-11-15"
    },
    {
      "name": "Amazon",
      "epic":"AMZN",
      "price": 110.00,
      "quantity": 1000,
      "buyPrice": 60.00,
      "lastUpdated": "2017-09-10",
      "pastCloseOfDayPrices": [42.00, 79.00, 63.00, 65.00, 48.00, 38.00, 210.00],
      "buyDate":"2014-11-15"
    },
  ]
)
