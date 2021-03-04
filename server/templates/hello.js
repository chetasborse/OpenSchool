const Hello = data => {
    return
        (`<!DOCTYPE html>
        <html>
            <head>
                <title>
                    Approval
                </title>
            </head>
            <body>
                <div>
                    <h1>Good Day Teacher</h1>
                    <h2>You have approved the session</h2>
                    <p>Student: ${data.first_name} ${data.last_name}</p>
                    <p>Grade: ${data.grade}</p>
                    <p>Date: ${data.req_date}</p>
                    <p>Time Slot: ${data.time_slot}</p>
                    <p>Topic: ${data.topic}
                </div>
            </body>
        </html>`);
    
}

module.exports = { Hello }