var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res) {
  return res.sendFile(path.join(__dirname, '../public/website', 'index.html'));
});

module.exports = router;
