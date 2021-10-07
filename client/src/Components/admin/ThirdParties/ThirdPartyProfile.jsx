import { Box, Collapse, Typography, Table, TableRow, TableBody, TableHead, TableCell } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import BusinessIcon from '@material-ui/icons/Business';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

export default function ThirdPartyProfile () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [thirdParty, setThirdParty] = useState(null)
    let [jobs, setJobs] = useState(null)
    let {id} = useParams()

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let getThirdParty = async () => {
        let {data} = await axiosScript('post', '/api/admin/getThirdParty', {search: {_id: id}})
        setThirdParty(data.data[0])
    }

    let getJobs = async () => {
        let {data} = await axiosScript('post', '/api/admin/getJobs', {args: {$or: [{finishers: id},{installers: id}]}})
        setJobs(data.data)
    }

    useEffect(()=>{
        console.log('Get your data here')
        getThirdParty()
        getJobs()
    },[])

    if(!thirdParty) return <Box>Loading...</Box>
    return (
        <Box flex='1'>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <BusinessIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>{!thirdParty ? 'Loading...' : thirdParty.company}</Typography>
            </Box>
            <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5} m={5}>
                <Table style={{width:'90%'}}>
                    <TableBody>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Company:</Typography><Typography variant='h5'>{thirdParty.company}</Typography></Box></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Address:</Typography><Typography variant='h5'>{thirdParty.address}</Typography></Box></TableCell>
                </TableRow>
                <TableRow><TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Email:</Typography><Typography variant='h5'>{thirdParty.email}</Typography></Box></TableCell></TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Phone:</Typography><Typography variant='h5'>{thirdParty.phone}</Typography></Box></TableCell>
                </TableRow>
                </TableBody>
                </Table>
                <Box width='100%' mt={5}> <Typography variant='h3'>Jobs Associated</Typography></Box>
                <Table style={{width: '90%', marginTop: '20px'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Name</TableCell>
                            <TableCell>Ongoing</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !jobs ? <div>This client has no jobs attatched...</div> : jobs.map((row, i)=>{
                                return (
                                    <TableRow>
                                        <TableCell>{row.jobName}</TableCell>
                                        <TableCell>{row.active ? 'Yes' : 'No'}</TableCell>
                                        <TableCell><Link className='linkClean' to={`/admin/jobs/jobProfile/${row._id}`}><RemoveRedEyeIcon/></Link></TableCell>
                                    </TableRow>
                                )
                            })

                        }
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}