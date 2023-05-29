const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended : 'true' }));
app.use(cors())



// Routes

// add student details

app.post('/students', async(req,res) => {
    try {
        const { student_id,student_name,student_branch,student_class, student_img } = req.body
        const newStudentDetails = await pool.query('INSERT INTO student_table (student_id,student_name,student_branch,student_class, student_img) VALUES($1, $2, $3, $4, $5)',[student_id,student_name, student_branch, student_class, student_img] );

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
    const { student_id,student_name,student_branch,student_class, student_img} = req.body
    const updateStudentDetails = await pool.query('UPDATE student_table SET student_id = $1, student_name = $2, student_branch = $3, student_class=$4, student_img = $5 WHERE sno=$6', [student_id, student_name, student_branch, student_class, student_img, id])

    res.send("student details updated !!")
})

// delete student details

app.delete('/students/:id', async(req,res) => {
    const {id} = req.params

    const deleteStudentDetails = await pool.query("DELETE FROM student_table WHERE sno = $1", [id])

    res.send("student datails deleted !!")

})

// filter search results

app.get('/', async (req, res) => {
    try {
        
        const {name} = req.query
        console.log(name)
        const result = name.toLowerCase()
        const searchResults = await pool.query(`SELECT * FROM student_table WHERE LOWER(student_name) LIKE '%${result}%'`)

        res.send(searchResults)
        
    } catch (e) {
        console.error(e.message)
    }
})

app.listen(5001,() => {console.log("server running on port 5001..")})