import { Box, TextField, Button, Typography, Select, MenuItem, Collapse } from '@material-ui/core'
import { useEffect, useState} from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import ClientSearch from '../../reusables/clientSearch';


export default function CreateJob() {

    let [template, setTemplate] = useState('')
    let [selectedTemplate, setSelectedTemplate] = useState(null)
    let [jobName, setJobName] = useState(null)
    let [address, setAddress] = useState(null)
    let [lockBox, setLockBox] = useState(null)
    let [contractor, setContractor] = useState(null)
    let [billing, setBilling] = useState(null)
    let [supervisor, setSupervisor] = useState(null)
    let [superPhone, setSuperPhone] = useState(null)
    let [designer, setDesigner] = useState(null)
    let [templates, setTemplates] = useState(null)
    let [shownTemplate, setShownTemplate] = useState(null)
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    const [ selectedClient, setSelectedClient ] = useState(null)


    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(() => { setOpen(false) }, 3000)
    }

    let sendData = async () => {
        if (!selectedTemplate) {
            return alertLogic('Please Select A Template!', 'error')
        }
        if (!jobName || jobName === '') {
            return alertLogic('Please Add A Job Name!', 'error')
        }
        let { data } = await axiosScript('post', '/api/admin/createJob', { selectedTemplate, jobName, client: selectedClient._id, lockBox, contractor, billing, supervisor, superPhone, designer })
        console.log(data.data)
        alertLogic(`Successfully Added Job ${jobName}`, 'success')
        setTemplate('')
        setSelectedTemplate(null)
        setJobName('')
        setLockBox('')
        setContractor('')
        setBilling('')
        setSupervisor('')
        setSuperPhone('')
        setDesigner('')
        setShownTemplate(null)

    }

    let handleChange = async (e) => {
        setTemplate(e.currentTarget.dataset.value)
        console.log(e.target.value)
        console.log(e.currentTarget.dataset.name)
        let id = e.currentTarget.dataset.name
        setSelectedTemplate(id)
        let chosenTemplate = templates.find((i) => { return i._id == id })
        setShownTemplate(chosenTemplate)
        console.log(shownTemplate)
    }

    let getTemplates = async () => {
        let { data } = await axiosScript('get', '/api/admin/getTemplates')
        setTemplates(data.data)
    }

    let selectClient = (client) => {
            console.log(client)
            setSelectedClient(client)
    }

    useEffect(() => {
        getTemplates()
    }, [])


    return (
        
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box flex='1'>
                <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                    <WorkIcon style={{ fontSize: '52px', marginRight: '15px' }} /><Typography variant='h5'>Add a New Job</Typography>
                </Box>
                <Box pt={5}>
                    <form style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap', paddingLeft: '25px', paddingRight: '25px' }}>
                        <Box width='100%' mb={2} display='flex' justifyContent='space-between'> 
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Job Name</Typography>
                            <TextField value={jobName} style={{ width: '50%' }} id="filled-basic" label="Job Name" onChange={(e) => { setJobName(e.target.value) }} />
                        </Box>
                        <Box width='100%' mb={2} display='flex' justifyContent='space-between'>
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Client Name</Typography>
                            <Box width='50%'><ClientSearch withBox selectClient={(client)=>{selectClient(client)}}/></Box>
                        </Box>
                        <Box width='100%' mb={2} display='flex' justifyContent='space-between'> 
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Job Address</Typography>
                            <TextField value={address} style={{ width: '50%' }} id="filled-basic" label="Address" onChange={(e) => { setAddress(e.target.value) }} />
                        </Box>
                        <Box width='100%' mb={2} display='flex' justifyContent='space-between'> 
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Lock Box</Typography>
                            <TextField value={lockBox} style={{ width: '50%' }} id="filled-basic" label="Lock Box" onChange={(e) => { setLockBox(e.target.value) }} />
                        </Box>
                        <Box width='100%' mb={2} display='flex' justifyContent='space-between'> 
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Contractor Assigned</Typography>
                            <TextField value={contractor} style={{ width: '50%' }} id="filled-basic" label="Contractor" onChange={(e) => { setContractor(e.target.value) }} />
                        </Box>
                        <Box width='100%' mb={2} display='flex' justifyContent='space-between'> 
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Supervisor Assigned</Typography>
                            <TextField value={supervisor} style={{ width: '50%' }} id="filled-basic" label="Supervisor" onChange={(e) => { setSupervisor(e.target.value) }} />
                        </Box>
                        <Box width='100%' mb={2} display='flex' justifyContent='space-between'> 
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Supervisor Phone Number</Typography>
                            <TextField value={superPhone} style={{ width: '50%' }} id="filled-basic" label="Supervisor Phone" onChange={(e) => { setSuperPhone(e.target.value) }} />
                        </Box>
                        <Box width='100%' mb={2} display='flex' justifyContent='space-between'> 
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Designer Assigned</Typography>
                            <TextField value={designer} style={{ width: '50%' }} id="filled-basic" label="Designer" onChange={(e) => { setDesigner(e.target.value) }} />
                        </Box>
                        <Box width='100%' mb={2} mt={2} display='flex' justifyContent='space-between'> 
                            <Typography style={{alignSelf: 'flex-end'}} variant='h5'>Folder Template</Typography>
                            <Select
                                value={template}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            >
                                {!templates ? <div>loading...</div> : templates.map((row) => {
                                    return <MenuItem value={row.name} data-name={row._id}>{row.name}</MenuItem>
                                })}
                            </Select>
                        </Box>
                    </form>
                </Box>
                <Box>

                    {!shownTemplate ? null : (<Box mb={5} display='flex' justifyContent='space-around'>
                        <Typography variant='h5'>Tasks for This Template</Typography>
                        {shownTemplate.folders.map((row) => {
                            return (<>
                                <Typography variant='h5'>
                                    {row.folderName}
                                </Typography>
                                {!row.nestedFolders ? null : row.nestedFolders.map((row) => {
                                    return (
                                        <Typography variant='h5'>
                                            {row}
                                        </Typography>
                                    )
                                })}</>)
                        })}
                    </Box>)}
                </Box>
                <Box m={5} borderTop='1px solid gray' pt={5}>
                    <Button variant='outlined' onClick={sendData}>Create Job</Button>
                </Box>
            </Box>

        </Box>
    )
}