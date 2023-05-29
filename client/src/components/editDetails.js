import * as React from 'react';
import {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 const EditDetails = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
  const {student} = props
  const {sno,studentId, studentName, studentBranch, studentClass, studentImage} = student


    const [id, setId] = useState(studentId)
    const[name, setName] = useState(studentName)
 
    const [branch,setBranch] = useState(studentBranch)
    const [stuClass,setStuClass] = useState(studentClass)
    const [image, setImage] = useState(studentImage)

    const onEditDetails = async (e) => {
        e.preventDefault();
        const newObj = {
            student_id : id,
            student_name : name,
            student_branch : branch,
            student_class : stuClass,
            student_img : image
        }

        try {
            const response = await fetch(`http://localhost:5001/students/${sno}`, {
                method: "PUT",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify(newObj)
            })

            window.location = '/'

            
        } catch (err) {
            console.error(err.message)
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

    

  return (
    <div>
      <Button onClick={handleOpen}><DriveFileRenameOutlineIcon className='edit-icon-style mr-3'/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Student Details
          </Typography>
          <form className="d-flex flex-row justify-content-center mt-5">
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
                <input type='file' onChange={(e) => uploadImage(e)}/>
                </div>
                
                <Button variant="contained" className="button-ele" onClick={onEditDetails}>Edit</Button>
            </form>

        </Box>
      </Modal>
    </div> 
  );
}

export default EditDetails
