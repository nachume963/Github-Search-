var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies['username'])
  {
    req.cookies['username'].maxAge = 86400000;
    res.render('index');
  }
  else
  {
    res.render('login', {user_problem: false, password_problem: false});
  }


  //res.render('index', { title: 'Express' });
});

module.exports = router;