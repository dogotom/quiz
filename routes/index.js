var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz TMM' });  //[TMM] este title va a verse en la vista index.ejs
});

module.exports = router;
