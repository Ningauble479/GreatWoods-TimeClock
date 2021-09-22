import { Box, Button, Collapse, setRef, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { useEffect, useState } from 'react'
import axiosScript from "../../../scripts/axiosScripts";
import WorkIcon from '@material-ui/icons/Work';
import { Alert } from '@material-ui/lab'



export default function CreateFolderTemplates () {
    let [ folders, setFolders ] = useState(null)
    let [ newFolder, setNewFolder ] = useState(null)
    let [ nestedFolder, setNestedFolder ] = useState(null)
    let [ templateName, setTemplateName] = useState(null)
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)


    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)}, type === 'error' ? 10000 : 3000)
    }

    let createNewFolder = () => {
        if(!newFolder || newFolder === '')return alertLogic('Please name the task', 'error')
        let createdFolder = {
            folderName: newFolder,
            index: !folders ? 0 : folders.length,
            nestedFolders: null
        }
        if(!folders) {
            setNewFolder('')
            alertLogic('New Task Added', 'success')
            return setFolders([createdFolder])}
        let array = folders
        array.push(createdFolder)
        setFolders([...array])
        setNewFolder('')
        alertLogic('New Task Added', 'success')
    }

    // let createNestedFolder = (e) => {
    //     let i = e.currentTarget.value
    //     console.log(folders[i])
    //     let foldersArray = folders
    //     if (!foldersArray[i].nestedFolders) {
    //         foldersArray[i].nestedFolders = [nestedFolder]
    //         setFolders([...foldersArray])
    //     }
    //     else {
    //         foldersArray[i].nestedFolders.push(nestedFolder)
    //         setFolders([...foldersArray])
    //     }

    // }

    let setTemplate = async () => {
        if(!folders) return alertLogic('Please add tasks to create template.', 'error')
        if(!templateName || templateName === '') return alertLogic('Please add a template name.', 'error')
        let data = await axiosScript('post', '/api/admin/setTemplate', {folders, templateName})
        alertLogic('Template created succesfully!', 'success')
        setFolders(null)
        setNewFolder('')
        setTemplateName('')
    }

    return (
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <WorkIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>Create a Job Template</Typography>
            </Box>
            <Box flex='1' display='flex' flexDirection='column' p={5}>
                <Box width='100%' mb={5} display='flex' justifyContent='space-between'><Typography variant='h5'>New Task</Typography><TextField style={{width: '70%'}} id="filled-basic" label="Task Name" onKeyPress={(e)=>{if(e.key === 'Enter') createNewFolder()}} value={newFolder} onChange={(e)=>{setNewFolder(e.target.value)}} /></Box>
                <Box width='100%' display='flex' justifyContent='center' borderBottom='1px solid gray' pb={2}><Button variant='outlined' onClick={()=>{createNewFolder()}}>Add Task</Button></Box>
            </Box>
            <Box flex='1' display='flex' justifyContent='center'>
            <Table style={{maxWidth:'70%', alignSelf: 'center'}}>
                <TableHead style={{backgroundColor: 'rgba(233, 234, 237, 1)'}}>
                    <TableRow>
                        <TableCell>
                            Task Name
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!folders ? null : folders.map((row)=>{
                        return (
                        <>
                        <TableRow className='tableRow'>
                            <TableCell>
                            {row.folderName}
                            </TableCell>
                        </TableRow>
                        </>
                        )
                    })}
                </TableBody>
            </Table>
            </Box>
            <Box flex='1' display='flex' flexDirection='column' p={5}>
                <Box width='100%' mb={5} display='flex' justifyContent='space-between'><Typography variant='h5'>Template Name</Typography><TextField style={{width: '70%'}} id="filled-basic" label="Task Name" onKeyDown={(e)=>{if(e.key === 'Enter') setTemplate()}} value={templateName} onChange={(e)=>{setTemplateName(e.target.value)}} /></Box>
                <Box width='100%' display='flex' justifyContent='center' borderBottom='1px solid gray' pb={2}><Button variant='outlined' onClick={()=>{setTemplate()}}>Create Template</Button></Box>
            </Box>
        </Box>
    )
}