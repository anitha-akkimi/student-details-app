CREATE DATABASE STUDENTINFO

CREATE TABLE student_table(
    sno SERIAL PRIMARY KEY,
    student_id INT,
    student_name VARCHAR(250),
    student_branch VARCHAR(255),
    student_class VARCHAR(255)
)