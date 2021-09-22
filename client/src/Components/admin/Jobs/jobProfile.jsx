import { Box, Collapse, Table, Typography, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import {Link, useParams} from 'react-router-dom'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import WorkIcon from '@material-ui/icons/Work';
 
export default function JobProfile () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [job, setJob] = useState(null)
    let { id } = useParams()

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let GetJob = async () => {
        let {data} = await axiosScript('post', '/api/admin/getJobs', {args: {_id: id}})  
        console.log(data.data)
        setJob(data.data[0])
    }

    useEffect(()=>{
        GetJob()
        console.log('Get your data here')

    },[])
    if(!job) return <div>Loading...</div>
    return (
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <WorkIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>{!job ? 'Loading...' : job.jobName}</Typography>
            </Box>
            <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5} m={5}>
                <Table style={{width:'90%'}}>
                    <TableBody>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Lock Box:</Typography><Typography variant='h5'>{job.lockBox}</Typography></Box></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Contractor:</Typography><Typography variant='h5'>{job.contractor}</Typography></Box></TableCell>
                </TableRow>
                <TableRow><TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Supervisor:</Typography><Typography variant='h5'>{job.supervisor}</Typography></Box></TableCell></TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Supervisor Phone:</Typography><Typography variant='h5'>{job.superPhone}</Typography></Box></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Designer:</Typography><Typography variant='h5'>{job.designer}</Typography></Box></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Active:</Typography><Typography variant='h5'>{job.active ? 'Yes' : 'No'}</Typography></Box></TableCell>
                </TableRow>
                </TableBody>
                </Table>
            </Box>
        </Box>
    )
}