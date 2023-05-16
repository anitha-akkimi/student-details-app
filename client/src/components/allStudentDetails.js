import {useState} from 'react'
import { Button } from "@mui/material"

const AllStudentDetails = () => {
    const [id, setId] = useState('')
    const[name, setName] = useState('')
    const [branch,setBranch] = useState('')
    const [stuClass,setStuClass] = useState('')

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const newObj = {
            student_id : id,
            student_name : name,
            student_branch : branch,
            student_class : stuClass
        }
        try {
        const response = await fetch("http://localhost:5001/students", {
            method : 'POST',
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify(newObj)
        })
        const data = await response.json()
        window.location = '/'
    }
    catch(e) {
        console.error(e.message)
    }

        
        
    }
    

    return(
        <div>
            <form className="d-flex flex-row justify-content-center mt-5" onSubmit={onSubmitForm}>
                <div className="mr-3">
                <label>Student Id</label>
                <br/>
                <input type="text" className="form-control" placeholder="Enter Student Id" value={id} onChange={(e) => setId(e.target.value)}/>
                </div>
                <div className="mr-3">
                <label>Student Name</label>
                <br/>
                <input type="text" className="form-control" placeholder="Enter Student Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mr-3">
                <label>Student branch</label>
                <br/>
                <input type="text" className="form-control" placeholder="Enter Student branch" value={branch} onChange={(e) => setBranch(e.target.value)}/>
                </div>
                <div className="mr-3">
                <label>Student class</label>
                <br/>
                <input type="text" className="form-control" placeholder="Enter Student class" value={stuClass} onChange={(e) => setStuClass(e.target.value)}/>
                </div>
                
                <Button variant="contained" className="button-ele" onClick={onSubmitForm}>Add</Button>
            </form>
        </div>
    )
}

export default AllStudentDetails