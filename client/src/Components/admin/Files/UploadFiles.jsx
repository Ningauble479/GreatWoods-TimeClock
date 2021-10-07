import { Box, Collapse, Typography, MenuItem, Select, Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import FolderIcon from '@material-ui/icons/Folder';
import JobSearch from '../../reusables/JobSearch';
import { DropzoneArea } from 'material-ui-dropzone'

const useStyles = makeStyles(theme => createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210
    },
  }));

export default function UploadFiles () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [tasks, setTasks] = useState(null)
    let [task, setTask] = useState(null)
    let [openTasks, setOpenTasks] = useState(false)
    let [job, setJob] = useState(null)
    let [filesState, setFiles] = useState([])
    let [fileNames, setFileNames] = useState([])
    let [fileUploadOpen, setFileUploadOpen] = useState(false)

    const classes = useStyles();

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let searchJob = (job) => {
        setTasks(job.folderTemplate.folders)
        setJob(job.jobName)
        setOpenTasks(true)
    }

    let uploadFile = async (e) => {
        if(!job || !task || !e[0]) return alertLogic('Please select a job and a task', 'error')
        let oldFileNames = fileNames
        let newFileNames = oldFileNames.concat(e[0].name)
        setFileNames(newFileNames)
        console.log(newFileNames)
        let oldState = filesState
        let newState = oldState.concat(e[0])
        setFiles(newState)
    } 

    let removeFile = async (e) => {
        let filesArray = filesState
        let newArray = filesArray.filter((file)=>{
            console.log(e.name)
            return file.name !== e.name
        })
        let oldNames = fileNames
        let newNames = oldNames.filter((name)=>{
            return name !== e.name
        })
        setFileNames(newNames)
        setFiles(newArray)
        console.log(newArray)
    }

    let submitData = async (e) => {
        const files = new FormData()
        console.log(filesState)
        filesState.map((file)=>{
            files.append('file', file)
        })
        files.append('jobPath', job)
        files.append('task', task)
        fileNames.map((fileName)=>{
            files.append('fileName', fileName)
        })
        let data = await axiosScript('post', '/api/admin/uploadFile', files)
        alertLogic('Successfully uploaded a file', 'success')
        window.location.reload()

    }
    let handleChange = async (task) => {
        setFileUploadOpen(true)
        setTask(task)
        console.log(task)
    }


    useEffect(()=>{
        console.log('Get your data here')
    },[])

    return (
        <Box flex='1'>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <FolderIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>Upload Files</Typography>
            </Box>
            <Box flex='1' p={5} display='flex' flexDirection='column' alignItems='center'>
                <Box width='100%' mb={4} display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h5'>Job</Typography>
                    <Box width='50%'><JobSearch withBox CB={(job)=>searchJob(job)}/></Box>
                </Box>
                <Collapse style={{width: '100%'}} in={openTasks}>
                <Box width='100%' mb={4} display='flex' justifyContent='space-between'>
                            <Typography style={{ alignSelf: 'flex-end' }} variant='h5'>Task</Typography>
                            <Select
                                value={task}
                                onChange={(e)=>handleChange(e.target.value)}
                                style={{ width: '50%' }}
                            >
                                {!tasks ? <div>loading...</div> : tasks.map((row) => {
                                    return <MenuItem value={row.folderName}>{row.folderName}</MenuItem>
                                })}
                            </Select>
                        </Box>
                </Collapse>
                <Box width='100%' mb={4} display='flex' justifyContent='space-between' alignItems='center'>
                <Collapse style={{width: '100%'}} in={fileUploadOpen}>
                <DropzoneArea

                    acceptedFiles={['image/*', 'application/pdf']}
                    dropzoneText={"Drop Files for task or click here"}
                    onDelete={(e)=>removeFile(e)}
                    onAdd={(files) => uploadFile(files)}
                    onDrop={(files) => uploadFile(files)}
                    onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                    // fileObjects={(e)=>{uploadFile(e)}}
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                    useChipsForPreview
                    previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                    previewChipProps={{classes: { root: classes.previewChip } }}
                    previewText="Selected files"
                /> 
                <Button onClick={()=>submitData()}>Submit</Button></Collapse>
                </Box>
            </Box>
        </Box>
    )
}