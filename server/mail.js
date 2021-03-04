const mailer = require("nodemailer");
const { Hello } = require("./templates/hello");

const getEmailData = (to, dat, template) => {
    let data = null;
    
    switch(template) {
        case "teacher_session_confirm":
            data = {
                from: "Eduapp <jjeff3087@gmail.com>",
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
                from: "Eduapp <jjeff3087@gmail.com>",
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
                from: "Eduapp <jjeff3087@gmail.com>",
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
                from: "Eduapp <jjeff3087@gmail.com>",
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