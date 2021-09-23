import { Box, Collapse, Table, Typography, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import {Link, useParams} from 'react-router-dom'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import PersonIcon from '@material-ui/icons/Person';
 
export default function EmployeeProfile () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [employee, setEmployee] = useState(null)
    let { id } = useParams()

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let GetEmployee = async () => {
        let {data} = await axiosScript('post', '/api/admin/getAccounts', {args: {_id: id}})  
        console.log(data.data)
        setEmployee(data.data[0])
    }

    useEffect(()=>{
        GetEmployee()
        console.log('Get your data here')

    },[])
    if(!employee) return <div>Loading...</div>
    return (
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <PersonIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>{!employee ? 'Loading...' : employee.userName}</Typography>
            </Box>
            <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5} m={5}>
                <Table style={{width:'90%'}}>
                    <TableBody>
                    <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Name:</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{employee.userName}</Typography></Box></Box></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Lock Box:</Typography><Typography variant='h5'>{employee.jobTitle}</Typography></Box></TableCell>
                </TableRow>
                </TableBody>
                </Table>
            </Box>
        </Box>
    )
}