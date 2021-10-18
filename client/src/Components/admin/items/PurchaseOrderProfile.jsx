import { Box, Button, Tooltip, TextField, Collapse, Table, Typography, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import AllInbox from '@material-ui/icons/AllInbox';
import { useParams, Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { format, parseISO } from 'date-fns';
import EditIcon from '@material-ui/icons/Edit';
import ClientSearch from '../../reusables/clientSearch';
import WorkerSearch from '../../reusables/workerSearch';

export default function PurchaseOrderProfile() {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [alertTimer, setAlertTimer] = useState(null)
    let [purchaseOrder, setPurchaseOrder] = useState(null)
    let [editing, setEditing] = useState(false)

    let { id } = useParams()

    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let getPurchaseOrder = async () => {
        let { data } = await axiosScript('post', '/api/admin/getPurchaseOrder', { search: { _id: id } })
        console.log(data.data)
        setPurchaseOrder(data.data[0])
    }

    let recieveItem = async (id) => {
        let data = await axiosScript('post', '/api/admin/editItem', { search: { _id: id }, update: { $set: { inStock: 'true', dateRecieved: new Date() } } })
        console.log(data)
        getPurchaseOrder()
    }

    let cleanDate = (date) => {
        let parsed = parseISO(date)
        return format(parsed, 'EEEE MMMM do yyyy')
    }

    let saveData = async () => {
        let { data } = await axiosScript('post', '/api/admin/editPurchaseOrder', { search: { _id: purchaseOrder._id }, update: { $set: { name: purchaseOrder.name, Card: purchaseOrder.Card, tax: purchaseOrder.tax, taxType: purchaseOrder.taxType, date: purchaseOrder.date, warehouse: purchaseOrder.warehouse, msg: purchaseOrder.msg, internalmsg: purchaseOrder.internalmsg, status: purchaseOrder.status, shipTo: purchaseOrder.shipTo?._id, total: purchaseOrder.total, items: purchaseOrder.items, purchaser: purchaseOrder.purchaser?._id } } })
        if (data.success) {
            alertLogic('Data successfully saved', 'success', 3000)
            return setEditing(false)
        }
        alertLogic('Something went wrong', 'error', 5000)
    }

    let getTotal = () => {
            let total = 0
            purchaseOrder.items.map((item)=>{
                console.log(item.cost)
                total = total + item.cost
            })
            return `$${total}`
    }

    useEffect(() => {
        console.log('Get your data here')
        getPurchaseOrder()
    }, [])

    return (
        <Box flex='1'>
            <Collapse in={open} style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1100' }}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AllInbox style={{ fontSize: '52px', marginRight: '15px' }} /><Typography variant='h5'>{!purchaseOrder ? 'loading...' : purchaseOrder.name}</Typography>
                <Box justifySelf='flex-end' pl={3} >
                    {!editing ? <Tooltip className='linkClean' title='Edit Job'><EditIcon onClick={() => {
                        alertLogic('You are now editing', 'warning', 10000)
                        setEditing(true)
                    }} style={{ justifySelf: 'flex-end' }} /></Tooltip> : <Button onClick={() => { saveData() }}>Save</Button>}
                </Box>
            </Box>
            {!purchaseOrder ? <div>Loading...</div> :
                <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5} m={5}>
                    <Table style={{ width: '90%' }}>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Card:</Typography>
                                        {!editing ?
                                            <Typography variant='h5'>{!purchaseOrder.Card ? 'No Card Added' : purchaseOrder.Card}</Typography> :
                                            <TextField style={{ width: '50%' }} label='Card' value={purchaseOrder.Card} onChange={(e) => { setPurchaseOrder({ ...purchaseOrder, Card: e.target.value }) }} />
                                        }
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Date Ordered:</Typography>
                                        <Typography variant='h5'>{!purchaseOrder.date ? 'Date Not Saved' : cleanDate(purchaseOrder.date)}</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Warehouse:</Typography>
                                        {!editing ?
                                            <Typography variant='h5'>{!purchaseOrder.warehouse ? 'No warehouse saved' : purchaseOrder.warehouse}</Typography> :
                                            <TextField style={{ width: '50%' }} label='Warehouse' value={purchaseOrder.warehouse} onChange={(e) => { setPurchaseOrder({ ...purchaseOrder, warehouse: e.target.value }) }} />
                                        }
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Message(Client Can See This):</Typography>
                                        {!editing ?
                                            <Typography variant='h5'>{!purchaseOrder.msg ? 'No Message Saved' : purchaseOrder.msg}</Typography> :
                                            <TextField style={{ width: '50%' }} label='Message' value={purchaseOrder.msg} onChange={(e) => { setPurchaseOrder({ ...purchaseOrder, msg: e.target.value }) }} />}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Internal Message(Client Cant See This):</Typography>
                                        {!editing ?
                                            <Typography variant='h5'>{!purchaseOrder.internalmsg ? 'No Internal Message Saved' : purchaseOrder.internalmsg}</Typography> :
                                            <TextField style={{ width: '50%' }} label='Int Message' value={purchaseOrder.internalmsg} onChange={(e) => { setPurchaseOrder({ ...purchaseOrder, internalmsg: e.target.value }) }} />}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Status:</Typography>
                                        {!editing ?
                                            <Typography variant='h5'>{!purchaseOrder.status ? 'Status unclear' : purchaseOrder.status}</Typography> : <Box>
                                                <Button variant={purchaseOrder.status === 'closed' ? 'contained' : null} onClick={() => { setPurchaseOrder({ ...purchaseOrder, status: 'closed' }) }}>Close</Button>
                                                <Button variant={purchaseOrder.status === 'open' ? 'contained' : null} onClick={() => { setPurchaseOrder({ ...purchaseOrder, status: 'open' }) }}>Open</Button>
                                                <Button variant={purchaseOrder.status === 'canceled' ? 'contained' : null} onClick={() => { setPurchaseOrder({ ...purchaseOrder, status: 'canceled' }) }}>Cancel</Button>
                                            </Box>}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Attached Client:</Typography>
                                        {!editing ?
                                            <Box display='flex'>
                                                { !purchaseOrder.shipTo ? null : <>
                                                <Typography variant='h5'>{`${purchaseOrder.shipTo?.firstname} ${purchaseOrder.shipTo?.lastname}`}</Typography>
                                                <Link to={`/admin/clients/clientProfile/${purchaseOrder.shipTo?._id}`} className='linkClean'>
                                                    <RemoveRedEyeIcon />
                                                </Link> </>}
                                            </Box> :
                                            <Box style={{ width: '50%' }}><ClientSearch withBox selectClient={(client) => { setPurchaseOrder({ ...purchaseOrder, shipTo: client }) }} /></Box>}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Purchaser:</Typography>
                                        {!editing ?
                                            <Box display='flex'>
                                                {!purchaseOrder.purchaser ? null : <>
                                                <Typography variant='h5'>{purchaseOrder.purchaser?.userName}</Typography>
                                                <Link to={`/admin/accounts/employeeProfile/${purchaseOrder.purchaser._id}`} className='linkClean'>
                                                    <RemoveRedEyeIcon />
                                                </Link> </>}
                                            </Box> :
                                            <Box style={{ width: '50%' }}><WorkerSearch withBox cb={(worker) => { setPurchaseOrder({ ...purchaseOrder, purchaser: worker }) }} label='Purchaser' /></Box>}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Tax:</Typography>
                                        {!editing ? 
                                        <Typography variant='h5'>{purchaseOrder.taxType === 'percent' ? `${purchaseOrder.tax}%` : `$${purchaseOrder.tax}`}</Typography> : 
                                        <TextField style={{ width: '50%' }} type={'number'} value={purchaseOrder.tax} label="Tax" inputProps={purchaseOrder.taxType === 'percent' ? {step: 0} : {step: "0.01"}} onChange={(e) => { setPurchaseOrder({...purchaseOrder, tax: parseFloat(e.target.value)}) }} />}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box width='100%' display='flex' justifyContent='space-between'>
                                        <Typography variant='h4'>Total Price:</Typography>
                                        <Typography variant='h5'>{!purchaseOrder ? `Loading...` : getTotal()}</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Box width='100%' mt={5}>
                        <Typography variant='h3'>Items Attached</Typography>
                    </Box>
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
                                            <TableCell>{row.dateRecieved ? cleanDate(row.dateRecieved) : 'Not Recieved'}<Button style={row.dateRecieved ? { display: 'none' } : { marginLeft: '15px' }} variant='contained' onClick={() => { recieveItem(row._id) }}>Recieve</Button></TableCell>
                                            <TableCell>
                                                <Link className='linkClean' to={`/admin/inventory/itemProfile/${row._id}`}>
                                                    <RemoveRedEyeIcon />
                                                </Link>
                                            </TableCell>
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