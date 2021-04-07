create table users 
( 
    user_id int PRIMARY KEY AUTO_INCREMENT, 
    username varchar(30) NOT NULL,
    user_type int, 
    password varchar(60) NOT NULL
);
-- 0 for student, 1 for teacher
create table teachers
(
    user_id int,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email_id varchar(40),
    image_link varchar(100),
    qualification varchar(50),
    rating_points int,
    sessions_taken int,
    verify int,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

create table students
(
    user_id int,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email_id varchar(40),
    image_link varchar(100),
    grade int,
    board varchar(30),
    session_taken int,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

create table subject
(
    subject_id int PRIMARY KEY AUTO_INCREMENT,
    subject_name varchar(30)
);

create table languages
(
    language_id int PRIMARY KEY AUTO_INCREMENT,
    language_name varchar(30)
);

create table requests
(
    request_id int PRIMARY KEY AUTO_INCREMENT,
    sender_id int,
    subject_id int,
    topic varchar(40),
    time_slot varchar(40),
    req_date DATE,
    language_id int,
    approved int,
    mentor_specific int,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_specific) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
    FOREIGN KEY (language_id) REFERENCES languages(language_id)
);

create table teacher_languages
(
    tl_id int PRIMARY KEY AUTO_INCREMENT,
    teacher_id int,
    language_id int,
    FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(language_id) 
);

create table teacher_subjects
(
    ts_id int PRIMARY KEY AUTO_INCREMENT,
    teacher_id int,
    subject_id int,
    FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

create table student_subjects
(
    ss_id int PRIMARY KEY AUTO_INCREMENT,
    student_id int,
    subject_id int,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

create table sessions_taken
(
    session_id int PRIMARY KEY AUTO_INCREMENT,
    teacher_id int,
    student_id int,
    request_id int,
    completed int,
    review int,
    FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE
);

create table message 
(
    message_id int PRIMARY KEY AUTO_INCREMENT,
    sender_id int,
    receiver_id int,
    message_text varchar(150),
    session_id int,
    timestamp_t timestamp,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions_taken(session_id)
);


-- insert into users(user_id, username, password) values (-1, "tp", "tp");  hi line taka lagech tables create jhalyavar nahitar pudhe problem hoil