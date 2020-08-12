var express = require('express');
var mydb = require('../models');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var username = req.body.username.trim().toLowerCase();
    var password = req.body.password.trim().toLowerCase();


    if(username === 'admin')
    {
        if(password === '1234'){
            res.cookie('username', username, {maxAge: 86400000});
            res.render('index');
        }
        else
            res.render('login', {user_problem: false, password_problem: true, error_msg: "wrong password"});
    }
    else
        res.render('login', {user_problem: true, password_problem: false, error_msg: "user not exist"});
});

router.get('/', function(req, res, next) {
    res.clearCookie('username');
    res.render('login', {user_problem: false, password_problem: false});
});

module.exports = router;