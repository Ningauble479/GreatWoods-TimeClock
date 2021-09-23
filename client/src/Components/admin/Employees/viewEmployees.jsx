import { Box, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@material-ui/core";
import axios from '../../../scripts/axiosScripts'
import { useEffect, useState } from "react";
import PersonIcon from '@material-ui/icons/Person';
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import { Link } from 'react-router-dom'
export default function ViewEmployees() {
    let [workers, setWorkers] = useState(null)

    const getWorkers = async () => {
        let {data} = await axios('post', '/api/admin/getAccounts')
        console.log(data)
        setWorkers(data.data)
    }

    useEffect(()=>{
        getWorkers()
    },[])

    return (
        <Box style={{ flex: '1' }} display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <PersonIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>View Employees</Typography>
            </Box>
            <Box display='flex' justifyContent='center' width='100%' mt={5}>
            <Table style={{width: '90%', borderBottom:'1px solid rgba(215, 215, 215, 1)', borderTop:'1px solid rgba(215, 215, 215, 1)'}}>
                <TableHead style={{backgroundColor: 'rgba(233, 234, 237, 1)'}}>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Title
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !workers ? null : workers.map((row) => {
                            return (
                                <TableRow className='tableRow'>
                                    <TableCell>{row.userName}</TableCell>
                                    <TableCell>{row.jobTitle}</TableCell>
                                    <TableCell><Link className='linkClean' to={`/admin/accounts/employeeProfile/${row._id}`}><RemoveRedEye/></Link></TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
            </Box>
        </Box>
    )
}