import { Box, Button, TextField, Collapse, Typography } from "@material-ui/core";
import { useState } from "react";
import axiosScript from "../scripts/axiosScripts";
import { Alert } from '@material-ui/lab'
import bigLogo from '../images/bigLogo.svg'

export default function Login () {
    let [passcode, setPass] = useState(null)
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)


    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let setPasscode = async (level) => {
        let {data} = await axiosScript('post', '/api/verify/verifyCode', {passcode: passcode, level: level})
        if(data.success){
            localStorage.setItem('passcode', passcode)
            localStorage.setItem('level', data.level)
            window.location.reload()
            return
        }
        alertLogic('Password was incorrect', 'error')
    }
    return (
        <Box flex='1' flexDirection='column' height='100vh' width='100vw' display='flex' justifyContent='center' alignItems='center'>
            <Box style={{justifyContent: 'center', display: 'flex', flex: '1', width: '500px', maxHeight: '300px'}}>
                <img src={bigLogo} style={{ maxWidth: '25vw' }} />
            </Box>
            <Box height='300px' width='500px' border='1px solid gray' boxShadow='1' borderRadius='15px' display='flex' justifyContent='space-around' alignItems='center' flexDirection='column'>
            <Typography variant='h3'>Login</Typography>
            <Collapse in={open}>
                        <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <TextField label="Password" onKeyPress={(e)=>{if(e.key === 'Enter') setPasscode()}} onChange={(e)=>{setPass(e.target.value)}} />
            <Button variant='outlined' onClick={()=>setPasscode()}>Login</Button>
            </Box>
        </Box>
    )
} 