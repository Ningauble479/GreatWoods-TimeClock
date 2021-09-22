import { Box, Collapse, Typography, TextField, Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import PeopleIcon from '@material-ui/icons/People';

export default function AddClient () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [firstname, setFirstname] = useState(null)
    let [lastname, setLastname] = useState(null)
    let [address, setAddress] = useState(null)
    let [phone, setPhone] = useState(null)
    let [email, setEmail] = useState(null)
    let [billing, setBilling] = useState({
        street1: null,
        street2: null,
        city: null,
        state: null,
        country: null,
        zip: null
    })

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let addClient = () => {
        if(!firstname || !lastname || firstname === '' || lastname === '') return alertLogic('Please set client name!', 'error')
        if(!email || !phone || email === '' || phone === '') return alertLogic('Please set client contact info!', 'error')
        if(!address || address === '') return alertLogic('Please set customer address', 'error')
        if(!billing.street1 || billing.street1 === '' || !billing.city || billing.city === '' || !billing.state || billing.state === ''  || !billing.country || billing.country === ''  || !billing.zip || billing.zip === '' ) return alertLogic('Please provide billing address. Street Address 2 is not needed.', 'error')
        let client = {
            firstname: firstname,
            lastname: lastname,
            address: address,
            phone: phone,
            email: email,
            billingAddress: billing   
        }
        axiosScript('post', '/api/admin/newClient', {client: client})
        setFirstname('')
        setLastname('')
        setAddress('')
        setPhone('')
        setEmail('') 
        setBilling({
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        }) 
        alertLogic('Client successfully added!', 'success')

    }

    useEffect(()=>{
        console.log('Get your data here')

    })

    return (
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <PeopleIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>Add A Client</Typography>
            </Box>
            <Box flex='1' p={5} onKeyPress={(e)=>{if(e.key === 'Enter') addClient()}}>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>First Name</Typography><TextField value={firstname} style={{width:'50%'}} id="filled-basic" label="First Name" onChange={(e)=>{setFirstname(e.target.value)}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Last Name</Typography><TextField value={lastname} style={{width:'50%'}} id="filled-basic" label="Last Name" onChange={(e)=>{setLastname(e.target.value)}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Address</Typography><TextField value={address} style={{width:'50%'}} id="filled-basic" label="Address" onChange={(e)=>{setAddress(e.target.value)}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Phone</Typography><TextField value={phone} style={{width:'50%'}} id="filled-basic" label="Phone" onChange={(e)=>{setPhone(e.target.value)}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Email</Typography><TextField value={email} style={{width:'50%'}} id="filled-basic" label="Email" onChange={(e)=>{setEmail(e.target.value)}} /></Box>
                <Box textAlign='start' mb={5}><Typography variant='h4'>Billing Info</Typography></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Street Address 1</Typography><TextField value={billing.street1} style={{width:'50%'}} id="filled-basic" label="Street 1" onChange={(e)=>{setBilling({...billing, street1: e.target.value})}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Street Address 2</Typography><TextField value={billing.street2} style={{width:'50%'}} id="filled-basic" label="Street 2" onChange={(e)=>{setBilling({...billing, street2: e.target.value})}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>City</Typography><TextField value={billing.city} style={{width:'50%'}} id="filled-basic" label="City" onChange={(e)=>{setBilling({...billing, city: e.target.value})}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>State</Typography><TextField value={billing.state} style={{width:'50%'}} id="filled-basic" label="State" onChange={(e)=>{setBilling({...billing, state: e.target.value})}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Country</Typography><TextField value={billing.country} style={{width:'50%'}} id="filled-basic" label="Country" onChange={(e)=>{setBilling({...billing, country: e.target.value})}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>ZIP</Typography><TextField value={billing.zip} style={{width:'50%'}} id="filled-basic" label="Zip" onChange={(e)=>{setBilling({...billing, zip: e.target.value})}} /></Box>
                <Box width='100%' display='flex' justifyContent='center' mb={5} mt={5} pt={5} borderTop='1px solid gray'><Button variant='outlined' onClick={()=>{addClient()}}>Create</Button></Box>
            </Box>
        </Box>
    )
}