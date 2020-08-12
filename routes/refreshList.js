var express = require('express');
var mydb = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(!req.cookies['username'])
        res.render('login', {user_problem: false, password_problem: false});

    mydb.SavedList.findAll()
        .then(items => {

            let savedList = "";

            for(let item of items){
                savedList += "<li id='" + item.name + "'><a href='"+ item.url + "' target='_blank'>" + item.name + "</a></li>";
            }
            //send to client
            res.send({
                status: "ok",
                details: savedList
            });
        }).catch(err => {
        console.log(err.toString());
    });
});

module.exports = router;
