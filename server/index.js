const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

// middlewares
app.use(express.json())
app.use(cors())


// Routes

// add student details

app.post('/students', async(req,res) => {
    try {
        const { student_id,student_name,student_branch,student_class } = req.body
        const newStudentDetails = await pool.query('INSERT INTO student_table (student_id,student_name,student_branch,student_class) VALUES($1, $2, $3, $4)',[student_id,student_name, student_branch, student_class] );

        res.json(newStudentDetails)

        
    } catch (e) {
        console.error(e.message)
        
    }
})

// get student details

app.get('/students', async (req,res) => {
    try {
        const allStudentDetails = await pool.query("SELECT * FROM student_table")
        res.send(allStudentDetails)
        
    } catch (e) {
        console.error(e.message)
    }
})

// get a student detail

app.get('/students/:id', async(req, res) => {
    try {
        const {id} = req.params
        const studentInfo = await pool.query('SELECT * FROM student_table WHERE sno = $1', [id])
        res.send(studentInfo)
    } catch (e) {
        console.error(e.message)
        
    }
})

//update student details
app.put('/students/:id', async (req,res) => {
    const {id} = req.params
    const { student_id,student_name,student_branch,student_class } = req.body
    const updateStudentDetails = await pool.query('UPDATE student_table SET student_id = $1, student_name = $2, student_branch = $3, student_class=$4 WHERE sno=$5', [student_id, student_name, student_branch, student_class, id])

    res.send("student details updated !!")
})

// delete student details

app.delete('/students/:id', async(req,res) => {
    const {id} = req.params

    const deleteStudentDetails = await pool.query("DELETE FROM student_table WHERE sno = $1", [id])

    res.send("student datails deleted !!")

})

app.listen(5001,() => {console.log("server running on port 5001..")})