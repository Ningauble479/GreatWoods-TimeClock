import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid, Box, Typography, TextField, Button, Switch, FormControlLabel, Radio, RadioGroup, Table, TableHead, TableRow, TableCell, TableBody, Modal, Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import axios from '../../../scripts/axiosScripts'

export default function NewEmployee () {
    let [username, setUsername] = useState(null)
    let [jobtitle, setJobTitle] = useState('Floor')
    let [workers, setWorkers] = useState(null)
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    
    let sendData = async () => {
        if(username === '' || !username){
            setAType('error')
            setAlert('Please choose a username.')
            setOpen(true)
            return setTimeout(()=>{setOpen(false)},3000)
        }
        let data = await axios('post', '/api/admin/addUser', {username, jobtitle})
        setAlert('User successfully created!')
        setAType('success')
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
        setUsername('')
    }
    
    const setTitle = (e) => {
        setJobTitle(e.target.value)
    }

    const getWorkers = async () => {
        let {data} = await axios('post', '/api/admin/getAccounts')
        console.log(data)
        setWorkers(data.data)
    }

    let handleClose = () => {
        setOpen(false)
    }

    useEffect(()=>{
        getWorkers()
    },[])


    return (
        <Box style={{flex: '1'}}>
                    <Collapse in={open}>
                        <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
                    </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <PersonAddIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>Add a new employee</Typography>
            </Box>
            <Box width='100%' height='400px'>
                <Box display='flex' container flexDirection="column" justifyContent="center" alignItems="flex-start" pl={5} nowrap style={{height: '100%'}}>
                    <Box height='100%' width='100%'>
                        <form style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start'}}>
                            <Box display='flex' alignItems='center' width='70%' justifyContent='space-between'><Typography variant='h4'>Name</Typography><TextField id="filled-basic" value={username} style={{width: '80%'}} onChange={(e)=>{setUsername(e.target.value)}} /></Box>
                            <Box display='flex' alignItems='center' width='26%' justifyContent='space-between'>
                            <Typography variant='h4'>Job Title</Typography>
                            <RadioGroup style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} name="jobtitle" value={jobtitle} onChange={setTitle}>
                                <FormControlLabel value="Floor" control={<Radio/>} label='Floor'/>
                                <FormControlLabel value="Office" control={<Radio/>} label='Office'/>
                            </RadioGroup>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box borderTop='1px solid gray' pt={5}>
                <Button style={{alignSelf: 'center'}} variant='outlined' onClick={()=>{sendData()}}>Create Account</Button>
            </Box>
        </Box>
    )
}