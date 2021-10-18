import { Box, Collapse, Typography, TextField, Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import AllInbox from '@material-ui/icons/AllInbox';
import { useParams, Link } from 'react-router';

export default function CreateItem() {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [alertTimer, setAlertTimer] = useState(null)
    let [item, setItem] = useState({
        name: null,
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
        tags: []
    })
    let [tagControl, setTagControl] = useState(null)
    let [skuErr, setSkuErr] = useState(false)

    let { id } = useParams()

    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let addTag = (e) => {
        if (!tagControl || tagControl === '') return alert('Please Type In A Tag')
        if (Array.isArray(item.tags)) {
            if (item.tags.includes(tagControl)) return alert('This item already has that tag')
            console.log('huh')
            setItem({ ...item, tags: [...item.tags, tagControl] })
            setTagControl('')
            return
        }
        setItem({ ...item, tags: [tagControl] })
        setTagControl('')
    }

    let checkSKU = async (e) => {
        let { data } = await axiosScript('post', '/api/admin/getItem', { search: { sku: e.target.value } })
        console.log(data.data.length)
        if (data.data.length > 0) return setSkuErr(true)
        setSkuErr(false)
    }

    useEffect(() => {
        console.log('Get your data here')
    }, [])

    return (
        <Box flex='1'>
            <Collapse in={open} style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1100' }}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AllInbox style={{ fontSize: '52px', marginRight: '15px' }} /><Typography variant='h5'>Create A New Item</Typography>
            </Box>
            <Box flex='1' p={5}>
                <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                    <Box>
                        <Typography variant='h5'>Details:</Typography>
                    </Box>
                    <TextField style={{width: '50%'}} style={{width: '50%'}} label='Description' value={item.details} onChange={(e) => setItem({ ...item, details: e.target.value })} />
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                    <Box><Typography variant='h5'>Sold To:</Typography></Box>
                    <TextField style={{width: '50%'}} label='Customer' />
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                    <Box><Typography variant='h5'>Additional Info (Inhouse):</Typography></Box>
                    <TextField style={{width: '50%'}} label='Additional Info (Inhouse)' value={item.additionalInfo} onChange={(e) => setItem({ ...item, additionalInfo: e.target.value })} />
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                    <Box><Typography variant='h5'>SKU:</Typography></Box>
                    <TextField style={{width: '50%'}} label='SKU' error={skuErr} helperText={skuErr ? 'This SKU already Exists' : null} value={item.sku} onChange={(e) => {
                        checkSKU(e)
                        setItem({ ...item, sku: e.target.value })
                    }} />
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                    <Box><Typography variant='h5'>Cost:</Typography></Box>
                    <TextField style={{width: '50%'}} type={'number'} label="Cost" inputProps={{ step: "1" }} value={item.cost} onChange={(e) => setItem({ ...item, cost: parseFloat(e.target.value) })} />
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                    <Box display='flex' justifyContent='space-between'><Typography variant='h5'>Tags:</Typography>
                    </Box>
                    <Box width='50%' display='flex' justifyContent='center' alignItems='center'>
                        <TextField style={{width: '50%'}} value={tagControl} onKeyUp={(e) => e.key === 'Enter' ? addTag() : null} onChange={(e) => setTagControl(e.target.value)} label='Tag' />
                        <Button variant='contained' onClick={() => addTag()}>+</Button>
                    </Box>
                </Box>
                <Box pt={3} pb={3} display='flex' justifyContent='space-between' width='75%' flexWrap='wrap'>
                    {!item.tags ? 'Please add some tags' : item.tags.map((row) => {
                        return (
                            <Box display='flex' justifyContent='space-between' alignItems='center' minWidth='100px' minHeight='25px' bgcolor='#5184d3' style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>
                                <Box minWidth='25%' maxWidth='25%'><Box width='10px' height='10px' bgcolor='white' borderRadius='100%' position='relative' left='28'></Box></Box>
                                #{row}
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}