import { Box, Collapse, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import FolderIcon from '@material-ui/icons/Folder';
import JobSearch from '../../reusables/JobSearch';
import FileView from '../../FileView';

export default function ViewFiles () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [job, setJob] = useState(null)

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let searchJob = async (e) => {
        console.log(e)
        setJob(e)
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
                <FolderIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>View Files</Typography>
            </Box>
            <Box p={5} flex='1' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Box width='100%' display='flex' justifyContent='space-between'><Typography variant='h5'>Job</Typography><Box width='50%'><JobSearch withBox CB={(e)=>{searchJob(e)}}/></Box></Box>
                {!job ? <div>Choose A Job</div> : <FileView job={job.jobName}/>}
            </Box>

        </Box>
    )
}