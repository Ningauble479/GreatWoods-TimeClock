import { Box, Collapse, Button, Table, Typography, TableBody, TableRow, TableCell, TableHead, Tooltip, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import { Link, useParams } from 'react-router-dom'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import WorkIcon from '@material-ui/icons/Work';
import { parseISO, format } from 'date-fns/esm'
import EditIcon from '@material-ui/icons/Edit';
import ClientSearch from '../../reusables/clientSearch'
import WorkerSearch from '../../reusables/workerSearch'
import ThirdPartySearch from '../../reusables/ThirdPartySearch'

export default function JobProfile() {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [job, setJob] = useState(null)
    let [client, setClient] = useState(null)
    let [lockBox, setLockBox] = useState(null)
    let [editing, setEditing] = useState(false)
    let [contractor, setContractor] = useState(null)
    let [supervisor, setSupervisor] = useState(null)
    let [designer, setDesigner] = useState(null)
    let [superPhone, setSuperPhone] = useState(null)
    let [finishers, setFinishers] = useState(null)
    let [installers, setInstallers] = useState(null)
    let [installDate, setInstallDate] = useState(null)
    let [alertTimer, setAlertTimer] = useState(null)

    let { id } = useParams()

    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let GetJob = async () => {
        let { data } = await axiosScript('post', '/api/admin/getJobs', { args: { _id: id } })
        console.log(data.data)
        setJob(data.data[0])
    }

    let fixDate = (date) => {
        let parsed = parseISO(date)
        let fixed = format(parsed, 'EEEE MMMM do yyyy')
        console.log(fixed)
        return fixed
    }

    let setTheDate = async (e) => {
        let unformated = e.target.value
        let splitSTR = unformated.split('-')
        let fixedDate = new Date(splitSTR)
        console.log(fixedDate)
        setInstallDate(fixedDate)
    }

    let saveData = async () => {
        if(!client && !lockBox && !contractor && !supervisor && !superPhone && !designer && !finishers && !installers && !installDate) return alertLogic('Please enter information to update', 'warning', 5000)
        console.log({client, lockBox, contractor, supervisor, superPhone, designer, finishers, installers, installDate})
        let {data} = await axiosScript('post', '/api/admin/updateJobs', {id: id, update: {client: client?._id, lockBox, contractor: contractor?._id, supervisor: supervisor?._id, superPhone, designer: designer?._id, finishers: finishers?._id, installers: installers?._id, installDate}})
        if(data.success){
        alertLogic('Data successfully saved', 'success', 3000)
        return setEditing(false)
        } 
        alertLogic('Something went wrong', 'error', 5000)
    }

    let finishJob = async (change) => {
        let {data} = await axiosScript('post', '/api/admin/updateJobs', {id: id, update: {active: change}})
        console.log(data)
        if(data.success) {
            alertLogic('Job Updated Successfully', 'success', 3000)
            GetJob()}
    }

    useEffect(() => {
        GetJob()
        console.log('Get your data here')

    }, [editing])
    if (!job) return <div>Loading...</div>
    return (
        <Box flex='1'>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box flex='1' display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <WorkIcon style={{ fontSize: '52px', marginRight: '15px' }} />
                <Typography variant='h5'>
                    {!job ? 'Loading...' : job.jobName}
                </Typography>
                <Box justifySelf='flex-end' pl={3} >
                    {!editing ? <Tooltip className='linkClean' title='Edit Job'><EditIcon onClick={() => {
                        alertLogic('You are now editing', 'warning', 10000)
                        setEditing(true)}} style={{ justifySelf: 'flex-end' }} /></Tooltip> : <Button onClick={() => {saveData()}}>Save</Button>}
                </Box>
                <Box>
                    {!editing ? null : <Button onClick={()=>setEditing(false)}>Cancel</Button>}
                </Box>
                <Box>{!job ? <div>loading...</div> : !job.active ? <Button onClick={()=>finishJob(true)}>Reactivate</Button> : <Button onClick={()=>finishJob(false)}>Finish Job</Button>}</Box>
            </Box>
            {!editing ? <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5} m={5}>
                <Table style={{ width: '90%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Client:
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant='h5'>{!job.client ? 'None' : `${job.client.firstname} ${job.client.lastname}`}
                                        </Typography>{!job.client ? null : <Link to={`/admin/clients/clientProfile/${job.client._id}`} className='linkClean'>
                                            <RemoveRedEyeIcon style={{ marginLeft: '15px' }} />
                                        </Link>}
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Lock Box:
                                    </Typography>
                                    <Typography variant='h5'>{!job.lockBox ? 'None' : job.lockBox}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Contractor:
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant='h5'>{!job.contractor ? 'None' : job.contractor.userName}</Typography>
                                        {!job.contractor ? null : <Link to={`/admin/accounts/employeeProfile/${job.contractor._id}`} className='linkClean'>
                                            <RemoveRedEyeIcon style={{ marginLeft: '15px' }} />
                                        </Link>}
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow><TableCell>
                            <Box width='100%' display='flex' justifyContent='space-between'>
                                <Typography variant='h5'>Supervisor:
                                </Typography>
                                <Box display='flex' justifyContent='center' alignItems='center'>
                                    <Typography variant='h5'>{!job.supervisor ? 'None' : job.supervisor.userName}
                                    </Typography>{!job.supervisor ? null : <Link to={`/admin/accounts/employeeProfile/${job.supervisor._id}`} className='linkClean'>
                                        <RemoveRedEyeIcon style={{ marginLeft: '15px' }} />
                                    </Link>}
                                </Box>
                            </Box>
                        </TableCell></TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Supervisor Phone:
                                    </Typography>
                                    <Typography variant='h5'>{!job.superPhone ? 'None' : job.superPhone}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Designer:
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant='h5'>{!job.designer ? 'None' : job.designer.userName}
                                        </Typography>{!job.designer ? null : <Link to={`/admin/accounts/employeeProfile/${job.designer._id}`} className='linkClean'>
                                            <RemoveRedEyeIcon style={{ marginLeft: '15px' }} />
                                        </Link>}
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Finishers:
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant='h5'>{!job.finishers ? 'None' : job.finishers.company}
                                        </Typography>{!job.finishers ? null : <Link to={`/admin/thirdParties/thirdPartyProfile/${job.finishers._id}`} className='linkClean'>
                                            <RemoveRedEyeIcon style={{ marginLeft: '15px' }} />
                                        </Link>}
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Installers:
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant='h5'>{!job.installers ? 'None' : job.installers.company}
                                        </Typography>{!job.installers ? null : <Link to={`/admin/thirdParties/thirdPartyProfile/${job.installers._id}`} className='linkClean'>
                                            <RemoveRedEyeIcon style={{ marginLeft: '15px' }} />
                                        </Link>}
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Install Date:
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant='h5'>{!job.installDate ? 'None' : fixDate(job.installDate)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {/* editing section */}
            </Box> : <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5} m={5}>
                <Table style={{ width: '90%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Client:
                                    </Typography>
                                    <Box display='flex' width='50%' justifyContent='center' alignItems='center'><ClientSearch withBox selectClient={(client) => { setClient(client) }} />
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Lock Box:
                                    </Typography><TextField value={lockBox} style={{ width: '50%' }} id="filled-basic" label="Lock Box" onChange={(e) => { setLockBox(e.target.value) }} />
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Contractor:
                                    </Typography>
                                    <Box display='flex' width='50%' justifyContent='center' alignItems='center'>
                                        <WorkerSearch
                                            withBox
                                            CB={(worker) => {
                                                console.log(worker)
                                                setContractor(worker)
                                            }}
                                            placeHolder={'Contractor'}
                                        />
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow><TableCell>
                            <Box width='100%' display='flex' justifyContent='space-between'>
                                <Typography variant='h5'>Supervisor:
                                </Typography>
                                <Box display='flex' width='50%' justifyContent='center' alignItems='center'>
                                    <WorkerSearch
                                        withBox
                                        CB={(worker) => {
                                            console.log(worker)
                                            setSupervisor(worker)
                                        }}
                                        placeHolder={'Supervisor'}
                                    />
                                </Box>
                            </Box>
                        </TableCell></TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Supervisor Phone:
                                    </Typography>
                                    <TextField value={superPhone} style={{ width: '50%' }} id="filled-basic" label="Supervisor Phone" onChange={(e) => { setSuperPhone(e.target.value) }} />
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Designer:
                                    </Typography>
                                    <Box display='flex' width='50%' justifyContent='center' alignItems='center'>
                                        <WorkerSearch
                                            withBox
                                            CB={(worker) => {
                                                console.log(worker)
                                                setDesigner(worker)
                                            }}
                                            placeHolder={'Designer'}
                                        />
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Finishers:
                                    </Typography>
                                    <Box width='50%'><ThirdPartySearch
                                        withBox
                                        CB={(thirdParty) => {
                                            console.log(thirdParty)
                                            setFinishers(thirdParty)
                                        }}
                                        placeHolder={'Finisher'}
                                    /></Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Installers:
                                    </Typography>
                                    <Box width='50%'><ThirdPartySearch
                                        withBox
                                        CB={(thirdParty) => {
                                            console.log(thirdParty)
                                            setInstallers(thirdParty)
                                        }}
                                        placeHolder={'Installer'}
                                    /></Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box width='100%' display='flex' justifyContent='space-between'>
                                    <Typography variant='h5'>Install Date:
                                    </Typography>
                                    <TextField type='date' style={{ width: '50%' }} id="filled-basic" label=' ' onChange={(e) => { setTheDate(e) }} />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </Box>}
        </Box>
    )
}