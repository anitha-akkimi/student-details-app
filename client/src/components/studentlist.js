import * as React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EachStudent from './eachStudent';



const ListOfStudents = () => {
    const [details, setDetails] = useState([])

    const getDetails = async () => {
        try {
            const response = await fetch("http://localhost:5001/students")
            const data = await response.json()
            
            
            const updatedData = data.rows.map(each => ({
                sno : each.sno,
                studentId : each.student_id,
                studentName : each.student_name,
                studentBranch : each.student_branch,
                studentClass : each.student_class
            }))

            setDetails(updatedData)

        } catch (e) {
            console.error(e.message)
        }

    }

    useEffect(() => {
        getDetails()
    }, [])
 
    const onDelete = (id) => {
        const filteredData = details.filter(each => each.sno !== id)
        setDetails(filteredData)
    }
    
  return (
    <TableContainer className='mr-5'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Id</TableCell>
            <TableCell align="right">Student Name</TableCell>
            <TableCell align="right">Student Branch</TableCell>
            <TableCell align="right">Student Class</TableCell>
            <TableCell>Icons</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { /*{rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}

          {details.map(each => <EachStudent student={each} key={each.sno} onDelete={onDelete}/>)}

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListOfStudents