import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditDetails from './editDetails';




const EachStudent = (props) => {
    const {student, onDelete} = props
    const {sno,studentId, studentName, studentBranch, studentClass, studentImage} = student
    console.log(studentImage)

    
    const onDeleteDetails = async (id) => {

        const response = await fetch(`http://localhost:5001/students/${id}`, {
            method : "DELETE"
        })
        onDelete(id)
    }

    return(
        <TableRow
              key={sno}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {studentId}
              </TableCell>
              <TableCell align="right">{studentName}</TableCell>
              <TableCell align="right">{studentBranch}</TableCell>
              <TableCell align="right">{studentClass}</TableCell>
              <TableCell align="right"><img src={studentImage} class="image-style"/></TableCell>
              <TableCell align="right"><div className='d-flex'>
                <EditDetails student={student}/>
                <button className='btn-style' onClick={() => onDeleteDetails(sno)}><RemoveCircleOutlineIcon className='delete-icon-style mr-3'/></button>
                </div></TableCell>
            </TableRow>
    )
}

export default EachStudent