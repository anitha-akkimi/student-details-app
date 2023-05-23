import * as React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EachStudent from './eachStudent';
import { Button } from "@mui/material"



const ListOfStudents = () => {
    const [details, setDetails] = useState([])
    const [name, setName] = useState('')

    const getDetails = async () => {
        try {
            const response = await fetch("http://localhost:5001/students/")
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

    const onSubmitSearchResults =  async (e) => {
      e.preventDefault();

      const result = name

      try {
          const response = await fetch(`http://localhost:5001/?name=${result}`)
          const data = await response.json()

          const updatedData = data.rows.map(each => ({
            sno : each.sno,
            studentId : each.student_id,
            studentName : each.student_name,
            studentBranch : each.student_branch,
            studentClass : each.student_class
        }))

        console.log(updatedData)

        setDetails(updatedData)

          
          
      } catch (err) {
          console.error(err.message)
      }
      
      
  }

  const sortDetails = (e) => {
    if(e.target.value === 'ASC'){
      const asce = [...details].sort((a,b) => a.studentId - b.studentId)
      setDetails(asce)
    }

    else if(e.target.value === 'DESC'){
      const desc = [...details].sort((a,b) => b.studentId - a.studentId)
      setDetails(desc)
    }

  }


    
  return (
    <>
    <form className="d-flex" onChange={onSubmitSearchResults}>
            <input type="search" className="form-control mt-5 mb-5 mr-3" placeholder="search" onChange={(e) => setName(e.target.value.toLowerCase())}/>
            <Button type="submit" variant="contained" className="button-style mt-5">Search</Button>
    </form>

    <select className='m-3' onChange={sortDetails}>
      <option value="ASC">top to bottom</option>
      <option value="DESC">bottom to top</option>
    </select>

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

          {details.map(each => <EachStudent student={each} key={each.sno} onDelete={onDelete}/>)}

        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default ListOfStudents