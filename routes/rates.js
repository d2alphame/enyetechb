var express = require('express');
var router = express.Router();

router.get('/rates', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
