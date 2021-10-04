import { Box, Collapse, Typography, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Dialog } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import AllInbox from '@material-ui/icons/AllInbox';
import WorkerSearch from '../../reusables/workerSearch';
import ClientSearch from '../../reusables/clientSearch';
import ItemDialog from './itemDialog';

export default function CreatePurchaseOrders() {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [alertTimer, setAlertTimer] = useState(null)
    let [name, setName] = useState(null)
    let [vendor, setVendor] = useState(null)
    let [cost, setCost] = useState(0.0)
    let [tax, setTax] = useState(0)
    let [taxType, setTaxType] = useState('percent')
    let [status, setStatus] = useState('open')
    let [purchaser, setPurchaser] = useState(null)
    let [date, setDate] = useState(null)
    let [warehouse, setWarehouse] = useState(null)
    let [message, setMessage] = useState(null)
    let [internalMsg, setInternalMsg] = useState(null)
    let [shipTo, setShipTo] = useState(null)
    let [items, setItems] = useState(null)
    let [itemAddName, setItemAddName] = useState(null)
    let [editBoxOpen, setEditBoxOpen] = useState(false)
    let [editBoxItem, setEditBoxItem] = useState(null)


    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let addPurchaseOrder = () => {
        let purchaseOrder = {
            name: name,
            Card: vendor,
            cost: cost,
            tax: tax,
            taxType: setTaxType,
            date: setDate,
            warehouse: warehouse,
            msg: message,
            internalmsg: internalMsg,
            status: status,
            shipTo: shipTo._id,
            purchaser: purchaser._id
        }
        console.log('test')
        console.log(purchaseOrder)


    }

    let setTheDate = async (e) => {
        let unformated = e.target.value
        let splitSTR = unformated.split('-')
        let fixedDate = new Date(splitSTR)
        console.log(fixedDate)
        setDate(fixedDate)
    }

    let getTotal = () => {
        if(taxType === 'exact'){
            let preFixed = cost+tax
            return `$${preFixed.toFixed(2)}`
        }
        else{
            let preFixed = cost*(tax/100)+cost
            return `$${preFixed.toFixed(2)}`
        }
    }

    let addItem = async () => {
        if(!itemAddName || itemAddName === '')return alertLogic('Please Set A Name For Item To Add', 'error', 3000)
        let itemTemplate = {
            name: itemAddName,
            details: null,
            type: itemAddName,
            purchaseID: null,
            soldTo: null,
            additionalInfo: null,
            dateEntered: new Date(),
            inStock: false,
            cost: null,
            tax: null,
            total: null,
            sku: null,
            index: Array.isArray(items) ? items.length : 0,
        }
        setItemAddName('')
        let oldArray = items
        if(!oldArray){
            return setItems([itemTemplate])
        }
        setItems([...items, itemTemplate])
        
    }

    let closeDialog = async (e) => {
        setEditBoxOpen(false)
    }

    useEffect(() => {
        console.log('Get your data here')
    })

    return (
        <Box flex='1'>
            <ItemDialog item={editBoxItem} open={editBoxOpen} onClose={(e)=>{closeDialog(e)}}/>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AllInbox style={{ fontSize: '52px', marginRight: '15px' }} /><Typography variant='h5'>New Purchase Order</Typography>
            </Box>
            <Box flex='1' p={5} onKeyPress={(e) => { if (e.key === 'Enter') addPurchaseOrder() }}>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Name For Order</Typography>
                    <TextField value={name} style={{ width: '50%' }} id="filled-basic" label="Name" onChange={(e) => { setName(e.target.value) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Vendor</Typography>
                    <TextField value={vendor} style={{ width: '50%' }} id="filled-basic" label="Vendor" onChange={(e) => { setVendor(e.target.value) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Price</Typography>
                    <TextField value={cost} style={{ width: '50%' }} id="filled-basic" type={'number'} label="Cost" inputProps={{step: "1"}} onChange={(e) => { setCost(parseFloat(e.target.value)) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Tax</Typography>
                    <TextField value={tax} style={{ width: '50%' }} id="filled-basic" type={'number'} label="Tax" inputProps={taxType === 'percent' ? {step: 0} : {step: "0.01"}} onChange={(e) => { setTax(parseFloat(e.target.value)) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='flex-end'>
                    <Box width='50%' display='flex' justifyContent='space-around' >
                        <Button variant={taxType === 'percent' ? 'contained' : 'outlined'} onClick={()=>{setTaxType('percent')}}>Percent</Button><Button variant={taxType === 'exact' ? 'contained' : 'outlined'} onClick={()=>setTaxType('exact')}>Exact Amount</Button>
                    </Box>
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Total</Typography>
                    {getTotal()}
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Purchaser</Typography>
                    <Box width='50%'>
                        <WorkerSearch withBox CB={(worker) => { setPurchaser(worker) }} placeHolder={'Purchaser'} />
                    </Box>
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Install Date</Typography>
                    <TextField type='date' style={{ width: '50%' }} id="filled-basic" label=' ' onChange={(e) => { setTheDate(e) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Warehouse</Typography>
                    <TextField value={warehouse} style={{ width: '50%' }} id="filled-basic" label="Warehouse" onChange={(e) => { setWarehouse(e.target.value) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Message (Client can see this)</Typography>
                    <TextField value={message} style={{ width: '50%' }} id="filled-basic" label="Message" onChange={(e) => { setMessage(e.target.value) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Internal Message (Client can not see this)</Typography>
                    <TextField value={internalMsg} style={{ width: '50%' }} id="filled-basic" label="Internal Message" onChange={(e) => { setInternalMsg(e.target.value) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Ship To</Typography>
                    <Box width='50%'><ClientSearch withBox selectClient={(client) => { setShipTo(client) }} /></Box>
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Add Item To Order</Typography>
                    <Box width='50%' display='flex' justifyContent='space-between'><TextField value={itemAddName} style={{ flex:'1' }} id="filled-basic" label="Item Name" onChange={(e) => { setItemAddName(e.target.value) }} /><Button variant='contained' onClick={()=>addItem()}>+</Button></Box>
                </Box>
                <Box m={5} borderTop='1px solid gray' pt={5}>
                    <Button variant='outlined' onClick={() => addPurchaseOrder}>Create Purchase Order</Button>
                </Box>
                <Table style={{width: '90%', borderBottom:'1px solid rgba(215, 215, 215, 1)', borderTop:'1px solid rgba(215, 215, 215, 1)'}}>
                <TableHead style={{backgroundColor: 'rgba(233, 234, 237, 1)'}}>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Type
                        </TableCell>
                        <TableCell>
                            Total
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !items ? null : items.map((row) => {
                            return (
                                <TableRow className='tableRow'>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{!row.price ? 'Please Set Price' : row.price}</TableCell>
                                    <TableCell><Button onClick={() => {
                                        setEditBoxItem(row)
                                        setEditBoxOpen(true)}}>Edit</Button></TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
            </Box>
        </Box>
    )
}