import { Box, TextField, Button, Typography, InputLabel, Select, MenuItem, TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../../scripts/axiosScripts'



export default function CreateJob () {
    let [template, setTemplate] = useState('')
    let [selectedTemplate, setSelectedTemplate] = useState(null)
    let [jobName, setJobName] = useState(null)
    let [client, setClient] = useState(null)
    let [address, setAddress] = useState(null)
    let [phone, setPhone] = useState(null)
    let [email, setEmail] = useState(null)
    let [lockBox, setLockBox] = useState(null)
    let [contractor, setContractor] = useState(null)
    let [billing, setBilling] = useState(null)
    let [supervisor, setSupervisor] = useState(null)
    let [superPhone, setSuperPhone] = useState(null)
    let [designer, setDesigner] = useState(null)
    let [templates, setTemplates] = useState(null)
    let [shownTemplate, setShownTemplate] = useState(null)

    let sendData = async () => {
        let {data} = await axiosScript('post', '/api/admin/createJob', {selectedTemplate, jobName, client, address, phone, email, lockBox, contractor, billing, supervisor, superPhone, designer})
        console.log(data.data)
    }

    let handleChange = async (e) => {
        setTemplate(e.currentTarget.dataset.value)
        console.log(e.target.value)
        console.log(e.currentTarget.dataset.name)
        let id = e.currentTarget.dataset.name
        setSelectedTemplate(id)
        let chosenTemplate = templates.find((i)=>{return i._id == id})
        setShownTemplate(chosenTemplate)
        console.log(shownTemplate)
    }

    let getTemplates = async () => {
        let {data} = await axiosScript('get', '/api/admin/getTemplates')
        setTemplates(data.data)
    }

    useEffect(()=>{
        getTemplates()
    },[])

    return (
        <Box display='flex'>
            <Box width='50vw' height='95vh' border='1px solid black'>
                <Box display='flex' container flexDirection="column" justifyContent="center" alignItems="center" nowrap style={{height: '100%'}}>
                    <Box height='10%'><Typography>New Job</Typography></Box>
                    <Box height='75%'>
                        <form style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                            <TextField id="filled-basic" label="Job Name" variant="filled" onChange={(e)=>{setJobName(e.target.value)}} />
                            <TextField id="filled-basic" label="Client" variant="filled" onChange={(e)=>{setClient(e.target.value)}} />
                            <TextField id="filled-basic" label="Address" variant="filled" onChange={(e)=>{setAddress(e.target.value)}} />
                            <TextField id="filled-basic" label="Phone" variant="filled" onChange={(e)=>{setPhone(e.target.value)}} />
                            <TextField id="filled-basic" label="Email" variant="filled" onChange={(e)=>{setEmail(e.target.value)}} />
                            <TextField id="filled-basic" label="Lock Box" variant="filled" onChange={(e)=>{setLockBox(e.target.value)}} />
                            <TextField id="filled-basic" label="Contractor" variant="filled" onChange={(e)=>{setContractor(e.target.value)}} />
                            <TextField id="filled-basic" label="Billing" variant="filled" onChange={(e)=>{setBilling(e.target.value)}} />
                            <TextField id="filled-basic" label="Supervisor" variant="filled" onChange={(e)=>{setSupervisor(e.target.value)}} />
                            <TextField id="filled-basic" label="Supervisor Phone" variant="filled" onChange={(e)=>{setSuperPhone(e.target.value)}} />
                            <TextField id="filled-basic" label="Designer" variant="filled" onChange={(e)=>{setDesigner(e.target.value)}} />
                            <Box display='flex' justifyContent='center' flexDirection='column'>
                            <InputLabel id="demo-simple-select-label">Folder Template</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={template}
                              onChange={handleChange}
                            >
                                {!templates ? <div>loading...</div> : templates.map((row)=>{
                                    return <MenuItem value={row.name} data-name={row._id}>{row.name}</MenuItem>
                                })}
                            </Select>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box width='50vw'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Selected: {!shownTemplate ? 'none' : shownTemplate.name}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {!shownTemplate ? null : (<TableBody>
                        {shownTemplate.folders.map((row)=>{
                            return (<><TableRow>
                                        <TableCell>
                                            {row.folderName}
                                        </TableCell>    
                                    </TableRow>
                                    {!row.nestedFolders ? null : row.nestedFolders.map((row)=>{
                                        return (
                                            <TableRow>
                                                <TableCell style={{paddingLeft: '50px'}}>   
                                                    {row}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}</>)
                        })}
                    </TableBody>)}
                </Table>
            </Box>
        </Box>
    )
}