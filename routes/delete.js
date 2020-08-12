var express = require('express');
var mydb = require('../models');
var router = express.Router();

//In case you are asked to delete
router.get('/', function(req, res, next) {
    if(!req.cookies['username'])
        res.render('login', {user_problem: false, password_problem: false});


    //Gets the username field from the request
    let username = req.query.username.trim();

    if (username === "")
        res.send({status: "exist", details: "cannot delete empty user"});

    mydb.SavedList.destroy({
        where: {name: username}
    }).then(item => {
        if(item)
            res.send({status: "ok"});
        else
            res.send({status: "exist", details:"This username is not exist"});
    }).catch(err => {
        console.log(err.toString());
    });
});

module.exports = router;
