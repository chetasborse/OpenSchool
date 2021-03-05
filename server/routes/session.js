const mysql = require("mysql")
const config = require("../config")
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/upcoming_sessions_teachers", (req, res) => {
    const query = `select * from students join (select requests.request_id, requests.subject_id, requests.topic, requests.time_slot, requests.req_date, requests.language_id, sessions_taken.session_id, sessions_taken.student_id, sessions_taken.teacher_id, sessions_taken.completed, sessions_taken.review, sessions_taken.meeting_url from requests join sessions_taken on requests.request_id = sessions_taken.request_id where sessions_taken.teacher_id = ${req.query.user_id} and completed = 0) sess on sess.student_id = students.user_id;`
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to fetch upcoming sessions")
        }
        else {
            res.status(200).send(result)
        }
    }) 
    
})

router.get("/upcoming_sessions_students", (req, res) => {
    const query = `select * from teachers join (select requests.request_id, requests.subject_id, requests.topic, requests.time_slot, requests.req_date, requests.language_id, sessions_taken.session_id, sessions_taken.student_id, sessions_taken.teacher_id, sessions_taken.completed, sessions_taken.review, sessions_taken.meeting_url from requests join sessions_taken on requests.request_id = sessions_taken.request_id where sessions_taken.student_id = ${req.query.user_id} and completed = 0) sess on sess.teacher_id = teachers.user_id;`

    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to fetch upcoming sessions")
        }
        else {
            res.status(200).send(result)
        }
    })
    
})

router.get("/past_sessions_teachers", (req, res) => {
    const query = `select * from students join (select requests.request_id, requests.subject_id, requests.topic, requests.time_slot, requests.req_date, requests.language_id, sessions_taken.session_id, sessions_taken.student_id, sessions_taken.teacher_id, sessions_taken.completed, sessions_taken.review from requests join sessions_taken on requests.request_id = sessions_taken.request_id where sessions_taken.teacher_id = ${req.query.user_id} and completed = 1) sess on sess.student_id = students.user_id;`

    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to fetch upcoming sessions")
        }
        else {
            res.status(200).send(result)
        }
    }) 
    
})


router.get("/past_sessions_students", (req, res) => {
    const query = `select * from teachers join (select requests.request_id, requests.subject_id, requests.topic, requests.time_slot, requests.req_date, requests.language_id, sessions_taken.session_id, sessions_taken.student_id, sessions_taken.teacher_id, sessions_taken.completed, sessions_taken.review from requests join sessions_taken on requests.request_id = sessions_taken.request_id where sessions_taken.student_id = ${req.query.user_id} and completed = 1) sess on sess.teacher_id = teachers.user_id;`
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to fetch upcoming sessions")
        }
        else {
            res.status(200).send(result)
        }
    })
    
})

router.get("/pending_requests", (req, res) => {
    var query = `select * from requests where sender_id = ${req.query.user_id} and approved = 0;`
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to fetch upcoming sessions")
        }
        else {
            res.status(200).send(result)
        }
    })
})

router.post("/request", (req, res) => {
    var query  = `insert into requests(sender_id, subject_id, topic, time_slot, req_date, language_id, approved, mentor_specific) values (${req.body.sender_id}, ${req.body.subject_id}, "${req.body.topic}", "${req.body.time_slot}", "${req.body.req_date}", ${req.body.language_id}, ${req.body.approved}, ${req.body.mentor_specific});`
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to post request")
            console.log(err.message)
        }
        else {
            res.status(200).send(result)
        }
    })
})

router.get("/request", (req, res) => {
    //var query = `select * from requests join (select teacher_languages.teacher_id as teacher_id, teacher_languages.language_id as language_id, teacher_subjects.subject_id as subject_id from teacher_languages join teacher_subjects on teacher_languages.teacher_id = teacher_subjects.teacher_id)comb on requests.subject_id = comb.subject_id and requests.language_id = comb.language_id where comb.teacher_id = ${req.query.user_id} and requests.approved = 0;`
    var query = `select * from students join (select requests.request_id as request_id, requests.sender_id as sender_id, requests.subject_id as subject_id, requests.topic as topic, requests.time_slot as time_slot, requests.req_date as req_date, requests.approved as approved, requests.language_id as language_id, requests.mentor_specific as mentor_specific, comb.teacher_id as teacher_id from requests join (select teacher_languages.teacher_id as teacher_id, teacher_languages.language_id as language_id, teacher_subjects.subject_id as subject_id from teacher_languages join teacher_subjects on teacher_languages.teacher_id = teacher_subjects.teacher_id)comb on requests.subject_id = comb.subject_id and requests.language_id = comb.language_id where comb.teacher_id = ${req.query.user_id} and requests.approved = 0 and (mentor_specific = -1 or mentor_specific = ${req.query.user_id})) req on req.sender_id = students.user_id;`
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to fetch")
        }
        else {
            res.status(200).send(result)
        }
    })
})



router.post("/session", (req, res) => {
    var query  = `insert into sessions_taken(teacher_id, student_id, request_id, completed, review) values (${req.body.teacher_id}, ${req.body.student_id}, ${req.body.request_id}, ${req.body.completed}, ${req.body.review});`
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to post session")
        }
        else {
            res.status(200).send(result)
        }
    })
})

router.post("/approve_post", (req, res) => {
    var query = `update requests set approved = 1 where request_id = ${req.body.request_id} and approved = 0;`
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to process")
        }
        else {
            res.status(200).send(result)
        }
    })
})

router.post("/session_completed", (req, res) => {
    var query = `update sessions_taken set completed = 1, review = ${req.body.rate} where session_id = ${req.body.session_id};`
    
    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Unable to review")
        }
        else {
            res.status(200).send(result)
        }
    })
})

router.post("/send_meeting_url", (req, res) => {
    var query = `update sessions_taken set meeting_url = "${req.body.meeting_url}" where session_id = ${req.body.session_id};`

    db.query(query, (err, result) => {
        if(err) {
            res.status(400).send("Meeting Url not set")
        }
        else {
            res.status(200).send("Meeting set successfully")
        }
    })
})



module.exports = router;