import { Box, Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import AllInbox from '@material-ui/icons/AllInbox';
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

export default function ViewPurchaseOrders () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [alertTimer, setAlertTimer] = useState(null)
    let [purchaseOrders, setPurchaseOrders] = useState(null)

    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let getPurchaseOrder = async () => {
        let {data} = await axiosScript('post', '/api/admin/getPurchaseOrder')
        console.log(data)
        setPurchaseOrders(data.data)
    }

    useEffect(()=>{
        console.log('Get your data here')
        getPurchaseOrder()
    },[])

    return (
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AllInbox style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>View Purchase Orders</Typography>
            </Box>
            <Box display='flex' flex='1' pt={5} flexDirection='column' justifyContent='center' alignItems='center'>
                <Table style={{width: '75%'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Purchaser</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { !purchaseOrders ? <div>Loading...</div> : purchaseOrders.map((row)=>{
                            return (                        
                            <TableRow>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.purchaser.name}</TableCell>
                                <TableCell><Link to={`/admin/inventory/purchaseOrderProfile/${row._id}`}><RemoveRedEyeIcon/></Link></TableCell>
                            </TableRow>)
                        })
                        }
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}