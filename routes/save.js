var express = require('express');
//Required for sending fetch request from server
var fetch = require('node-fetch');
var mydb = require('../models');
var router = express.Router();

//In case you are asked to save
router.get('/', function(req, res, next) {

    if(!req.cookies['username'])
        res.render('login', {user_problem: false, password_problem: false});

    //Gets the username field from the request
    let username = req.query.username.trim();

    if (username === "")
        res.send({status: "exist", details: "cannot saved empty user"});

    mydb.SavedList.findOne({
        where: {name: username}
    }).then(item => {
        //If it doesn't exist, get its details from github and save it
        if (!item) {
            //Go to the github site
            fetch("https://api.github.com/users/" + username)
                .then(response => {
                    //Check the status of the response
                    if (response.status >= 200 && response.status < 300) {
                        //save to db
                        mydb.SavedList.create({
                            name: username,
                            url: "https://github.com/" + username
                        });
                        //send res to client
                        res.send({
                            status: "ok",
                        });
                    }
                    //If none exists on the site, you will return an appropriate error message
                    else if (response.status === 404) {
                        res.send({status: "unfindeUser", details: "This user was not found on the github site"});
                    }
                    //If any other problem, send a general error message
                    else {
                        res.send({
                            status: "error",
                            details: "Something wrong ): Try something else"
                        });
                    }
                }).catch(err => {
                    console.log(err)
                }
            );
        }
        //If it exists, you will send an error message back
        else {
            res.send({status: "exist", details: "This username is already saved"});
        }
    });
});

module.exports = router;
