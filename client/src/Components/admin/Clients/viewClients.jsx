import { Box, Collapse, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import PeopleIcon from '@material-ui/icons/People';
import { parseISO } from 'date-fns';
import format from 'date-fns/format';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { Link } from 'react-router-dom';
import ClientSearch from '../../reusables/clientSearch';

export default function ViewClient () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [clients, setClients] = useState(null)

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let getClients = async () => {
        let {data} = await axiosScript('post', '/api/admin/getClients')
        console.log(data)
        if(!data || data===undefined || !data.success) return alertLogic('Error failed to load clients.', 'error')
        setClients(data.data)
    }

    let parseTime = async (time) => {
        return 'today'
        // let parsedTime = parseISO(time)
        // return format(parsedTime, 'MMM do yyyy')
    }

    let searchClients = (clients) => {
        console.log(clients)
        setClients(clients)
    }

    useEffect(()=>{
        console.log('Get your data here')
        getClients()
    },[])

    return (
        <Box flex='1'>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <PeopleIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>View Clients</Typography>
            </Box>
            <Box flex='1' pl={5} pr={5} display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                <ClientSearch callBack={(client)=>searchClients(client)}/>
                <Table style={{width:'70%'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Client Since</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Billing Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !clients ? <TableRow style={{width: '100%'}}><TableCell>Loading...</TableCell></TableRow> : clients.map((row)=>{
                            let fixedTime = null
                                if(row.customerSince){let time = parseISO(row.customerSince)
                                fixedTime = format(time, 'MMM do yyyy')
                            }
                            return (<TableRow>
                            <TableCell>{row.firstname} {row.lastname}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{!fixedTime ? null : fixedTime}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{!row.billingAddress ? null : !row.billingAddress.street1 ?  null : row.billingAddress.street1} {!row.billingAddress ? null : row.billingAddress.street2 ? `& ${row.billingAddress.street2}` : null} {!row.billingAddress ? null : row.billingAddress.city} {!row.billingAddress ? null : row.billingAddress.state} {!row.billingAddress ? null : row.billingAddress.country} {!row.billingAddress ? null : row.billingAddress.zip} </TableCell>
                            <TableCell><Link to={`/admin/clients/clientProfile/${row._id}`}><RemoveRedEyeIcon/></Link></TableCell>
                        </TableRow>)})}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}