import {useState} from 'react'
import { Button } from "@mui/material"
import jwt_decode from "jwt-decode";

const AllStudentDetails = () => {
    const [id, setId] = useState('')
    const[name, setName] = useState('')
    const [branch,setBranch] = useState('')
    const [stuClass,setStuClass] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState('')

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if(id!=='' && name!=='' && branch!=='' && stuClass!==''){
        const newObj = {
            student_id : id,
            student_name : name,
            student_branch : branch,
            student_class : stuClass,
            student_img : image
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
   else {
    setError("Please Enter Valid Details")
    alert("Enter valid details")
   } 
        
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertbase64file(file)
        //console.log(base64)
        setImage(base64)
    }

    const convertbase64file = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
      
            fileReader.onload = () => {
              resolve(fileReader.result)
            }
      
            fileReader.onerror = (error) => {
              reject(error)
            }
          })
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
                <br/>
                <input type='file' onChange={(e) => uploadImage(e)}/>
                </div>
                
                <Button variant="contained" className="button-ele" onClick={onSubmitForm}>Add</Button>
            </form>
            <p className='text-danger'>{error}</p>

        </div>
    )
}

export default AllStudentDetails