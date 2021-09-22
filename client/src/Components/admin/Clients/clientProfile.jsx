import { Box, Collapse, Table, Typography, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import PersonIcon from '@material-ui/icons/Person';
import {Link, useParams} from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
 
export default function ClientProfile () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [client, setClient] = useState(null)
    let { id } = useParams()
    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let GetClient = async () => {
        let {data} = await axiosScript('post', '/api/admin/getClients', {search: {_id: id}})
        let fixedTime = null
        if(data.data[0].customerSince){let time = parseISO(data.data[0].customerSince)
        fixedTime = format(time, 'MMM do yyyy')
        data.data[0].customerSince = fixedTime
    }   
    
        console.log(data.data[0])
        setClient(data.data[0])
    }

    useEffect(()=>{
        GetClient()
        console.log('Get your data here')

    },[])
    if(!client) return <div>Loading...</div>
    return (
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <PersonIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>{!client ? 'Loading...' : `${client.firstname} ${client.lastname}`}</Typography>
            </Box>
            <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5} m={5}>
                <Table style={{width:'90%'}}>
                    <TableBody>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Email:</Typography><Typography variant='h5'>{client.email}</Typography></Box></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Phone:</Typography><Typography variant='h5'>{client.phone}</Typography></Box></TableCell>
                </TableRow>
                <TableRow><TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Customer Since:</Typography><Typography variant='h5'>{client.customerSince}</Typography></Box></TableCell></TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Address:</Typography><Typography variant='h5'>{client.address}</Typography></Box></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Billing Address:</Typography><Typography variant='h5'>{`${client.billingAddress.street1} ${!client.billingAddress.street2 ? '' : client.billingAddress.street2} ${client.billingAddress.city} ${client.billingAddress.state} ${client.billingAddress.country} ${client.billingAddress.zip}`}</Typography></Box></TableCell>
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
                            !client.jobs ? <div>This client has no jobs attatched...</div> : client.jobs.map((row, i)=>{
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