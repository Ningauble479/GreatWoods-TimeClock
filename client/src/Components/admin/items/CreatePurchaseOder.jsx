import { Box, Collapse, Typography, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
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
    let [bank, setBank] = useState(null)
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
    let [itemAddAmount, setItemAddAmount] = useState(1)
    let [editBoxOpen, setEditBoxOpen] = useState(false)
    let [editBoxItem, setEditBoxItem] = useState(null)


    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let addPurchaseOrder = async () => {
        if(tax===undefined||tax===null||Number.isNaN(tax)){
            return alertLogic('Error please set tax or set tax to 0.', 'error', 5000)
        }
        if(!name){
            return alertLogic('Error Please Fill In Name Field', 'error', 5000)
        }
        if(!taxType){
            return alertLogic('Error Please Select A Tax Type', 'error', 5000)
        }
        if(!items){
            return alertLogic('Error Please Add Some Items To Purchase Order', 'error', 5000)
        }
        let total = 0
        items.map((item)=>total = total + item.cost)
        if(taxType === 'percent'){
            let preFixed = total*(tax/100)+total
            total = preFixed.toFixed(2)
        }
        else{   
            let preFixed = total+tax
            total = preFixed.toFixed(2)
        }
        let {data} = await axiosScript('post', '/api/admin/createItem', {multiple: true, items: items})
        let itemIDS = data.ids
        let purchaseOrder = {
            name: name,
            Card: bank,
            tax: tax,
            taxType: taxType,
            date: date,
            warehouse: warehouse,
            msg: message,
            internalmsg: internalMsg,
            status: status,
            shipTo: shipTo?._id,
            total: total,
            items: itemIDS,
            purchaser: purchaser?._id
        }
        let {data2} = await axiosScript('post', '/api/admin/createPurchaseOrder', {order: purchaseOrder})
        console.log(data2)
    }

    let setTheDate = async (e) => {
        let unformated = e.target.value
        let splitSTR = unformated.split('-')
        let fixedDate = new Date(splitSTR)
        setDate(fixedDate)
    }

    let getTotal = () => {
        let total = 0
        let taxFix = tax
        if(!items)return `$0`
        items.map((item)=>total = total + item.cost)
        if(Number.isNaN(taxFix)){taxFix = 0}
        if(taxType === 'percent'){
            let preFixed = total*(taxFix/100)+total
            return `$${preFixed.toFixed(2)}`
        }
        else{   
            let preFixed = total+taxFix
            return `$${preFixed.toFixed(2)}`
        }
    }

    let addItem = async () => {
        if(!itemAddName || itemAddName === '')return alertLogic('Please Set A Name For Item To Add', 'error', 3000)
        let itemsToAdd = []
        let index = Array.isArray(items) ? items.length : 0
        for(let i=0; i<itemAddAmount; i++){
            let itemTemplate = {
                name: itemAddName,
                details: null,
                purchaseID: null,
                soldTo: null,
                additionalInfo: null,
                dateEntered: new Date(),
                inStock: false,
                cost: null,
                tax: null,
                total: null,
                sku: null,
                tags: [],
                index: index,
            }
            index++
            itemsToAdd.push(itemTemplate)
        }
        let oldArray = items
        if(!oldArray){
            return setItems(itemsToAdd)
        } else {
            oldArray.push(...itemsToAdd)
            setItems(oldArray)
    }
        setItemAddName('')
        
    }

    let closeDialog = (item, skuErr) => {
        console.log(item)
        console.log({skuError: skuErr})
        if(skuErr) return alertLogic('Please Change SKU', 'error', 3000)
        let oldArray = items
        let objIndex = oldArray.findIndex((obj)=>obj.index == item.index)
        if (oldArray[objIndex] !== item) {
            oldArray[objIndex].additionalInfo = item.additionalInfo
            oldArray[objIndex].cost = item.cost
            oldArray[objIndex].details = item.details
            oldArray[objIndex].sku = item.sku
            oldArray[objIndex].soldTo = item.soldTo
            oldArray[objIndex].tax = item.tax
            oldArray[objIndex].total = item.total
            oldArray[objIndex].tags = item.tags
        }
        setEditBoxOpen(false)
    }

    let updateItem = (tags, item) => {
        let oldArray = items
        let objIndex = oldArray.findIndex((obj)=>obj.index == item.index)
        oldArray[objIndex].additionalInfo = item.additionalInfo
        oldArray[objIndex].cost = item.cost
        oldArray[objIndex].details = item.details
        oldArray[objIndex].sku = item.sku
        oldArray[objIndex].soldTo = item.soldTo
        oldArray[objIndex].tax = item.tax
        oldArray[objIndex].total = item.total
        oldArray[objIndex].tags = tags
    }

    useEffect(() => {
        console.log('Get your data here')
    },[])

    return (
        <Box flex='1'>
            <ItemDialog item={editBoxItem} open={editBoxOpen} onClose={(e, sku)=>{closeDialog(e, sku)}} updateItem={updateItem}/>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AllInbox style={{ fontSize: '52px', marginRight: '15px' }} /><Typography variant='h5'>New Purchase Order</Typography>
            </Box>
            <Box flex='1' p={5} display='flex' flexDirection='column' onKeyPress={(e) => { if (e.key === 'Enter') addPurchaseOrder() }}>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Name For Order</Typography>
                    <TextField value={name} style={{ width: '50%' }} id="filled-basic" label="Name" onChange={(e) => { setName(e.target.value) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Bank</Typography>
                    <TextField value={bank} style={{ width: '50%' }} id="filled-basic" label="Bank" onChange={(e) => { setBank(e.target.value) }} />
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
                    <Typography variant='h5'>Date Of Initial Order</Typography>
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
                    <Typography variant='h5'>Tax</Typography>
                    <TextField value={tax} style={{ width: '50%' }} id="filled-basic" type={'number'} label="Tax" inputProps={taxType === 'percent' ? {step: 0} : {step: "0.01"}} onChange={(e) => { setTax(parseFloat(e.target.value)) }} />
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='flex-end'>
                    <Box width='50%' display='flex' justifyContent='space-around' >
                        <Button variant={taxType === 'percent' ? 'contained' : 'outlined'} onClick={()=>{setTaxType('percent')}}>Percent</Button><Button variant={taxType === 'exact' ? 'contained' : 'outlined'} onClick={()=>setTaxType('exact')}>Exact Amount</Button>
                    </Box>
                </Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                    <Typography variant='h5'>Add Item To Order</Typography>
                    <Box width='50%' display='flex' justifyContent='space-between'>
                        <TextField value={itemAddName} style={{ flex:'1' }} id="filled-basic" label="Item Name" onChange={(e) => { setItemAddName(e.target.value) }} />
                        <TextField value={itemAddAmount} style={{ maxWidth: '10%' }} id="filled-basic" label="Amount" onChange={(e) => { setItemAddAmount(e.target.value) }} />
                        <Button variant='contained' onClick={()=>addItem()}>+</Button></Box>
                </Box>
                
                <Table style={{width: '90%', borderBottom:'1px solid rgba(215, 215, 215, 1)', borderTop:'1px solid rgba(215, 215, 215, 1)', alignSelf: 'center', marginTop: '50px'}}>
                <TableHead style={{backgroundColor: 'rgba(233, 234, 237, 1)'}}>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Cost
                        </TableCell>
                        <TableCell>
                            Total Price/Edit
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !items ? null : items.map((row) => {
                            return (
                                <TableRow className='tableRow' style={!row.cost ? {backgroundColor:'red'} : !row.sku ? {backgroundColor:'red'} : !row.tags ? {backgroundColor:'red'} : {backgroundColor: 'white'}}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{!row.cost ? 'Please Set Cost' : row.cost}</TableCell>
                                    <TableCell><Button onClick={() => {
                                        setEditBoxItem(row)
                                        setEditBoxOpen(true)}}>Edit</Button></TableCell>
                                </TableRow>
                            )
                        })}
                        <TableRow>
                            <TableCell>Total:</TableCell>
                            <TableCell></TableCell>
                            <TableCell>{getTotal()}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
                <Box m={5} borderTop='1px solid gray' pt={5}>
                    <Button variant='outlined' onClick={() => addPurchaseOrder()}>Create Purchase Order</Button>
                </Box>
            </Box>
        </Box>
    )
}