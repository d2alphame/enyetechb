var express = require('express');
const https = require('https');

var router = express.Router();

var url = 'https://api.exchangeratesapi.io/latest'

router.get('/', function(req, res, next) {

	url += '?base=' + req.query.base + '&symbols=' + req.query.currency
	https.get(url, (resp) => {
		let data = ''
  		resp.on('data', (chunk) => {
			data += chunk
		});
		resp.on('end', () => {
			res.json({ results: JSON.parse(data)})
		})  

	}).on('error', (e) => {
  		res.status(500).json({error: 'The request could not be completed'})
	});
	
});

module.exports = router;
