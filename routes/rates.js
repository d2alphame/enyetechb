var express = require('express');
const https = require('https');
const querystring = require('querystring');

var router = express.Router();

var url = 'https://api.exchangeratesapi.io/latest'

router.get('/', function(req, res, next) {

	// If there's a 'currency' parameter in the query object, then change it into 'symbols'
	// The exhange rate api uses symbols as against currency in this case.
	if('currency' in req.query) {
		req.query['symbols'] = req.query['currency']
		delete req.query.currency
	}

	// querystring to convert the query object into a query string to attach to the url
	url += '?' + querystring.stringify(req.query)

	https.get(url, (resp) => {
		let data = ''
  		resp.on('data', (chunk) => {
			data += chunk
		});
		resp.on('end', () => {
			let results = JSON.parse(data)

			// The request completes but there's an error probably because of bad request
			if(results.error) {
				res.json(results)
			}
			else { res.json({ results: results }) }
		})  

	}).on('error', (e) => {
  		res.status(500).json({error: 'The request could not be completed'})
	});
	
});

module.exports = router;
