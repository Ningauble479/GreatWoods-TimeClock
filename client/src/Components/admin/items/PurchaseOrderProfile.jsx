import { Box, Collapse, Table, Typography, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import AllInbox from '@material-ui/icons/AllInbox';
import { useParams, Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { format, parseISO } from 'date-fns';
export default function PurchaseOrderProfile () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [alertTimer, setAlertTimer] = useState(null)
    let [purchaseOrder, setPurchaseOrder] = useState(null)

    let { id } = useParams()

    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let getPurchaseOrder = async () => {
        let {data} = await axiosScript('post', '/api/admin/getPurchaseOrder', {search: {_id: id}})
        console.log(data.data)
        setPurchaseOrder(data.data[0])
    }

    let cleanDate = (date) => {
        let parsed = parseISO(date)
        return format(parsed, 'EEEE MMMM do yyyy')
    }

    useEffect(()=>{
        console.log('Get your data here')
        getPurchaseOrder()
    },[])

    return (
        <Box flex='1'>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AllInbox style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>{!purchaseOrder ? 'loading...' : purchaseOrder.name}</Typography>
            </Box>
            {!purchaseOrder ? <div>Loading...</div> : 
            <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5} m={5}>
                <Table style={{ width: '90%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Card:</Typography><Typography variant='h5'>{!purchaseOrder.Card ? 'No Card Added' : purchaseOrder.Card}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Date Ordered:</Typography><Typography variant='h5'>{!purchaseOrder.date ? 'Date Not Saved' : cleanDate(purchaseOrder.date)}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Warehouse:</Typography><Typography variant='h5'>{!purchaseOrder.warehouse ? 'No warehouse saved' : purchaseOrder.warehouse}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Message(Client Can See This):</Typography><Typography variant='h5'>{!purchaseOrder.msg ? 'No Message Saved' : purchaseOrder.msg}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Internal Message(Client Cant See This):</Typography><Typography variant='h5'>{!purchaseOrder.internalmsg ? 'No Internal Message Saved' : purchaseOrder.internalmsg}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Status:</Typography><Typography variant='h5'>{!purchaseOrder.status ? 'Status unclear' : purchaseOrder.status}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Attached Client:</Typography><Typography variant='h5'>{!purchaseOrder.shipTo?.name}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Purchaser:</Typography><Typography variant='h5'>{purchaseOrder.purchaser?.name}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Tax:</Typography><Typography variant='h5'>{purchaseOrder.taxType === 'percent' ? `${purchaseOrder.tax}%` : `$${purchaseOrder.tax}`}</Typography></Box></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Total Price:</Typography><Typography variant='h5'>$100</Typography></Box></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Box width='100%' mt={5}> <Typography variant='h3'>Items Attached</Typography></Box>
                <Table style={{ width: '90%', marginTop: '20px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Recieved On</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !purchaseOrder.items ? <div>Items Not Loaded...</div> : purchaseOrder.items.map((row, i) => {
                                return (
                                    <TableRow>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.sku}</TableCell>
                                        <TableCell>{row.dateRecieved ? cleanDate(row.dateRecieved) : 'Not Recieved'}</TableCell>
                                        <TableCell><Link className='linkClean' to={`/admin/inventory/itemProfile/${row._id}`}><RemoveRedEyeIcon /></Link></TableCell>
                                    </TableRow>
                                )
                            })

                        }
                    </TableBody>
                </Table>
            </Box>}
        </Box>
    )
}