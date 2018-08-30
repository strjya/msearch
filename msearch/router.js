var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res) {
  return res.sendFile(path.join(__dirname, '../public/msearch', 'index.html'));
});

module.exports = router;
