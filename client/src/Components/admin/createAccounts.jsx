import { Grid, Box, Typography, TextField, Button, Switch, FormControlLabel, Radio, RadioGroup, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from '../../scripts/axiosScripts'

export default function CreateAccount () {

    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)
    let [jobtitle, setJobTitle] = useState('Floor')
    let [admin, setAdmin] = useState(false)
    let [workers, setWorkers] = useState(null)


    
    let sendData = async () => {
        let data = await axios('post', '/api/admin/addUser', {username, password, jobtitle, admin})
        console.log(data)
    }

    const handleChange = (e) => {
        setAdmin(e.target.checked)
    }
    
    const setTitle = (e) => {
        setJobTitle(e.target.value)
    }

    const getWorkers = async () => {
        let {data} = await axios('post', '/api/admin/getAccounts')
        console.log(data)
        setWorkers(data.data)
    }

    useEffect(()=>{
        getWorkers()
    },[])


    return (
        <Grid style={{height: '90vh', overflowX: 'hidden'}} container direction="column">
            <Box bgcolor='gray' width='50vw' height='90vh' border='1px solid black'>
                <Box display='flex' container flexDirection="column" justifyContent="center" alignItems="center" nowrap style={{height: '100%'}}>
                    <Box height='10%' pt={3}><Typography>Add A Worker</Typography></Box>
                    <Box height='75%'>
                        <form style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                            <TextField id="filled-basic" label="Username" variant="filled" onChange={(e)=>{setUsername(e.target.value)}} />
                            <TextField id="filled-basic" label="Password" type='password' variant="filled" onChange={(e)=>{setPassword(e.target.value)}} />
                            <Typography>Job Title</Typography>
                            <RadioGroup style={{display: 'flex', flexDirection: 'row'}} name="jobtitle" value={jobtitle} onChange={setTitle}>
                                <FormControlLabel value="Floor" control={<Radio/>} label='Floor'/>
                                <FormControlLabel value="Office" control={<Radio/>} label='Office'/>
                                <FormControlLabel value="Other" control={<Radio/>} label='Other'/>
                            </RadioGroup>
                            <FormControlLabel 
                                control={<Switch checked={admin} onChange={handleChange} name="admin" color="primary" />}
                                label='Admin?'
                                />

                            <Button variant='outlined' onClick={()=>{sendData()}}>Create Account</Button>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box width='50vw'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                Title
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !workers ? null : workers.map((row)=>{return (
                                <TableRow>
                                    <TableCell>{row.userName}</TableCell>
                                    <TableCell>{row.jobTitle}</TableCell>
                                </TableRow>
                            )})}
                    </TableBody>
                </Table>
            </Box>
        </Grid>
    )
}