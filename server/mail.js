const mailer = require("nodemailer");

const getEmailData = (to, dat, template) => {
    let data = null;
    
    switch(template) {
        case "teacher_session_confirm":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `Approval of request`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Approval
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Good Day Teacher</h1>
                            <h3>You have approved the session on ${dat.topic}</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Student: ${dat.first_name} ${dat.last_name}</p>
                            <p>Grade: ${dat.grade}</p>
                            <p>Board: ${dat.board}</p>
                            <p>Date: ${dat.req_date}</p>
                            <p>Time Slot: ${dat.time_slot}</p>
                            <p>Topic: ${dat.topic}</p>
                        </div>
                    </body>
                </html>`
            }
            break;

        case "student_session_confirm":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `Your request has been approved`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Approval
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Good Day Student</h1>
                            <h3>Your request for a session on ${dat.topic} has been approved</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Mentor: ${dat.first_name} ${dat.last_name}</p>
                            <p>Qualification: ${dat.qualification}</p>
                            <p>Ratings: ${dat.rating}</p>
                            <p>Sessions taken: ${dat.sessions_taken}</p>
                            <p>Date: ${dat.req_date}</p>
                            <p>Time Slot: ${dat.time_slot}</p>
                            <p>Topic: ${dat.topic}</p>
                        </div>
                    </body>
                </html>`
            }
            break;
        case "finish_student":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `Thank you for taking the session`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Good Day Student</h1>
                            <h3>Thank you for completing the session on ${dat.topic}</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Mentor: ${dat.first_name} ${dat.last_name}</p>
                            <p>Topic: ${dat.topic}</p>
                            <h5>Review given: ${dat.review}/5</h5>
                        </div>
                    </body>
                </html>`
            }
            break;
        case "finish_teacher":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `Thank you for taking the session`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Good Day Teacher</h1>
                            <h3>You have successfully completed session on ${dat.topic}</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Student: ${dat.first_name} ${dat.last_name}</p>
                            <p>Topic: ${dat.topic}</p>
                            <h5>Review given: ${dat.review}/5</h5>
                        </div>
                    </body>
                </html>`
            }
            break;
        case "student_send_url":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `Meeting Link`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}</h1>
                            <h3>Your mentor for a session on ${dat.topic} has sent meeting URL</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Topic: ${dat.topic}</p>
                            <p>Time: ${dat.time}</p>
                            <p>Date: ${dat.date}</p>
                            <h5>Meeting URL: <a href="${dat.meeting_url}">${dat.meeting_url}</a></h5>
                            <br>
                            <h6>Enjoy the session :)</h6>
                        </div>
                    </body>
                </html>`
            }
            break;
        case "teacher_send_url":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `Meeting Link`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}</h1>
                            <h3>You have created a meeting on the topic of ${dat.topic}</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Topic: ${dat.topic}</p>
                            <p>Time: ${dat.time}</p>
                            <p>Date: ${dat.date}</p>
                            <h5>Meeting URL: <a href="${dat.meeting_url}">${dat.meeting_url}</a></h5>
                            <br>
                            <h6>Enjoy the session :)</h6>
                        </div>
                    </body>
                </html>`
            }
            break;
        case "send_verification":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `Verification of account`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}</h1>
                            <h3>Your account has been verified</h3>
                        </div>
                    </body>
                </html>`
            }
            break;
        case "send_suspension":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `Meeting Link`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}</h1>
                            <h3>Your account has been suspended</h3>
                        </div>
                    </body>
                </html>`
            }
            break;
        case "otp":
            data = {
                from: "OpenSchool <jjeff3087@gmail.com>",
                to: to,
                subject: `OTP for changing password`,
                html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Request for Password Change
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}</h1>
                            <br>
                            <h4>OTP for your changing password is <b>${dat.otp}</b></h4>
                            <br>
                            <h5>Enter this otp in the space provided in the application</h5>
                        </div>
                    </body>
                </html>`
            }
            break;
        default:
            data;        
    }
    return data
}

const sendEmail = (bod) => {
    
    const smtpTransport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "jjeff3087@gmail.com",
            pass: "Jerry@3087"
        }
    })

    const mail = getEmailData(bod.receiver, bod, bod.type)

    smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
            console.log(error.message)
        }
        else {
            console.log("Email sent successfully")
        }
        smtpTransport.close()
    })


}

module.exports = { sendEmail }