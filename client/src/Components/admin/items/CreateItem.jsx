import { Box, Collapse, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import AllInbox from '@material-ui/icons/AllInbox';
import { useParams, Link } from 'react-router';

export default function CreateItem () {
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
                <AllInbox style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>{purchaseOrder.name}</Typography>
            </Box>
        </Box>
    )
}