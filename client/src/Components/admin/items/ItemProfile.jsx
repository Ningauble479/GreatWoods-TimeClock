import { Box, Button, Collapse, Table, Typography, TableBody, TableRow, TableCell, TableHead, Dialog } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import AllInbox from '@material-ui/icons/AllInbox';
import { useParams } from 'react-router';
import { format, parseISO } from 'date-fns';
import QRCode from 'qrcode.react'
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import { Link } from 'react-router-dom'


export default function ItemProfile () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [alertTimer, setAlertTimer] = useState(null)
    let [item, setItem] = useState(null)
    let [purchaseOrder, setPurchaseOrder] = useState(null)
    let [recieveOpen, setRecieveOpen] = useState(false)


    let { id } = useParams()
    let mobile = useCheckMobileScreen()
    console.log(mobile)
    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let getItem = async () => {
        let { data } = await axiosScript('post', '/api/admin/getItem', {search: {_id: id}})
        console.log(data.data[0])
        if(!data || !data.data){return alertLogic('Failed to load item please call for support', 'error', 2000)}
        setItem(data.data[0])
    }

    let getPurchaseOrders = async () => {
        let { data } = await axiosScript('post', '/api/admin/getPurchaseOrder', {search: {items: id}})
        console.log(data)
        setPurchaseOrder(data.data[0])
    }

    let cleanDate = (date) => {
        let parsed = parseISO(date)
        return format(parsed, 'EEEE MMMM do yyyy')
    }

    let recieveItem = async () => {
        let data = await axiosScript('post', '/api/admin/editItem', {search: {_id: id}, update: {$set: {inStock: 'true', dateRecieved: new Date()}}})
        console.log(data)
        getItem()
    }

    let onClose = () => {
        setRecieveOpen(true)

    }

    useEffect(()=>{
        console.log('Get your data here')
        getItem()
        getPurchaseOrders()
    },[])

    return (
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AllInbox style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>{!item ? 'Loading...' : item.name}</Typography>
            </Box>
            <Dialog open={recieveOpen} onClose={()=>{onClose()}}>
                <Box display='flex' flexDirection='column' alignItems='center' minWidth='30vw' minHeight='70vh' bgcolor='white'>
                    Test
                </Box>
            </Dialog>
            {!item ? <div>Loading...</div> : 
            <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={mobile ? 0 : 5} m={mobile ? 0 : 5}>
                <Table style={mobile ? {width:'100%'} :{width:'90%'}}>
                    <TableBody>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Details:</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{item.details}</Typography></Box></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Sold To:</Typography><Typography variant='h5'>{!item.soldTo?.name ? 'Not Sold Yet' : item.soldTo.name}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Additional Info (Client Will Not See This):</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{item.additionalInfo}</Typography></Box></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Date Ordered:</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{cleanDate(item.dateEntered)}</Typography></Box></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>In Stock:</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{item.inStock ? 'Yes' : 'No'}</Typography></Box></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Cost:</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{`$${item.cost}.00`}</Typography></Box></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>sku:</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{item.sku}</Typography></Box></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Purchase Order:</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{!purchaseOrder ? 'No Purchase Order Attached' : purchaseOrder.name}</Typography>{!purchaseOrder ? null : <Link className='linkClean' to={`/admin/inventory/purchaseOrderProfile/${purchaseOrder._id}`}><RemoveRedEye/></Link>}</Box></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Recieved On:</Typography><Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h5'>{!item.dateRecieved ? <Box>Not Recieved. <Button variant='outlined' onClick={()=>recieveItem()}>Recieve</Button></Box> : cleanDate(item.dateRecieved)}</Typography></Box></Box></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Box display='flex'>
                    {item.tags.map((row)=>{
                        return (
                            <Link to='/admin/inventory/viewItems' className='linkClean' state={{tagSearch: row}}><Box pt={1} pb={1} pl={2} pr={2} m={3} bgcolor='lightblue' borderRadius='15px'>{row}</Box></Link>
                        )
                    })}
                </Box>
                <Box pt={5} mt={5} mb={5} pb={5}>
                <QRCode value={`https://${window.location.hostname}/admin/inventory/itemProfile/${id}`}/>
                </Box>
            </Box>}
        </Box>
    )
}