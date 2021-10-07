import { Box, Collapse, Typography, TextField, Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import BusinessIcon from '@material-ui/icons/Business';

export default function CreateThirdParty () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [company, setCompany] = useState(null)
    let [address, setAddress] = useState(null)
    let [email, setEmail] = useState(null)
    let [phone, setPhone] = useState(null)

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let addThirdParty = async () => {
        if(!company || !address || !email || !phone)return alertLogic('Please fill in all information', 'error')
        let thirdPartyData = {
            company: company,
            address: address,
            email: email,
            phone: phone
        }
        let {data} = await axiosScript('post', '/api/admin/createThirdParty', {thirdParty: thirdPartyData})
        if(!data.success){
            return alertLogic('An error has occured please try again', 'error')
        }
        alert('Third party successfully created.', 'success')
    }

    useEffect(()=>{
        console.log('Get your data here')
    })

    return (
        <Box flex='1'>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <BusinessIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>Add a New Third Party</Typography>
            </Box>
            <Box flex='1' p={5} onKeyPress={(e)=>{if(e.key === 'Enter') addThirdParty()}}>
            <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Company Name</Typography><TextField value={company} style={{width:'50%'}} id="filled-basic" label="Company" onChange={(e)=>{setCompany(e.target.value)}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Company Address</Typography><TextField value={address} style={{width:'50%'}} id="filled-basic" label="Address" onChange={(e)=>{setAddress(e.target.value)}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Company Email</Typography><TextField value={email} style={{width:'50%'}} id="filled-basic" label="Email" onChange={(e)=>{setEmail(e.target.value)}} /></Box>
                <Box width='100%' mb={2} display='flex' justifyContent='space-between'> <Typography variant='h5'>Company Phone</Typography><TextField value={phone} style={{width:'50%'}} id="filled-basic" label="Phone" onChange={(e)=>{setPhone(e.target.value)}} /></Box>
                <Box width='100%' display='flex' justifyContent='center' mb={5} mt={5} pt={5} borderTop='1px solid gray'><Button variant='outlined' onClick={()=>{addThirdParty()}}>Create</Button></Box>
            </Box>
        </Box>
    )
}