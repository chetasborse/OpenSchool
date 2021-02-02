const mysql = require("mysql")
const config = require("../config")
const router = require("express").Router();
const bcrypt = require("bcrypt");
const session = require('express-session')
const saltRounds = 10

const jwt = require('jsonwebtoken')


const db = mysql.createPool(config.mysql);

router.post("/register", (req, res) => {
    //var query = `insert into users (username, password) values ("${req.body.username}", "${req.body.password}");`
    
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {

        var query = `insert into users (username, password) select "${req.body.username}", "${hash}" where not exists (select username from users where username = "${req.body.username}");`

        db.query(query, (err, result) => {
            if(err) {
                res.status(400).send(err.message);
            }
            res.status(200).send(result);
        })
    
    })

});


router.post("/login", (req, res) => {
    var query = `select username, password from users where username="${req.body.username}";`
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send(err.message);
        }
        
        if(result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (error, response) => {
                
                if(response) {
                    req.session.user = result;
                    //console.log(`After login ${req.session.user}`)
                    res.send(result);
                }
                else {
                    res.send({message: "Wrong combination of username/password"})
                }
            })
            
        }
        else {
            res.send({message: "User doesn't exist"})
        }     
       
    })
})

router.get('/login', (req, res) => {
    //console.log(`After login req ${req.session.user}`)
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    }
    else {
        res.send({loggedIn: false})
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({loggedIn: false})
})


module.exports = router;