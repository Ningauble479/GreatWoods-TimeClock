import { Box, Typography, Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../scripts/axiosScripts'
import FolderIcon from '@material-ui/icons/Folder';
import ShowPDF from './showpdf';

export default function FileView () {

    let [ folders, setFolders ] = useState(null)
    let [ files, setFiles ] = useState(null)
    let [ currentFolder, setCurrentFolder ] = useState(null)
    let [ folderView, setFolderView ] = useState(false)
    let [ pdf, setpdf ] = useState(null)
    let getFolders = async () => {
        let {data} = await axiosScript('get', 'http://localhost:3001/api/files/getFilePaths')
        setFolders(data.folders)
        setFolderView(true)
    }

    let getFiles = async (folder) => {
        let {data} = await axiosScript('post', 'http://localhost:3001/api/files/getFiles', {folder})
        console.log(data.data)
        setCurrentFolder(folder)
        setFiles(data.data.filesNames)
        setFolderView(false)
    }

    let getSpecificFile = async (file) => {
        let {data} = await axiosScript('post', 'http://localhost:3001/api/files/getFile', {currentFolder, file})
        console.log(data.data.data)
        setpdf(data.data.data)
        setFiles(null)
    }  

    let backToTop = async () => {
        setFolderView(true)
        setFiles(null)
        setCurrentFolder(null)
        setpdf(null)
    }

    useEffect(()=>{
        getFolders()
    },[])

    return (
        <Box pt={5} width='50%' borderLeft='1px solid black'>
            <Button onClick={()=>{backToTop()}}>Back</Button>
            <Typography variant='h2'>
                Files
            </Typography>
            <Box width='100%' display='flex' justifyContent='space-around' flexWrap='wrap'>
                {!folderView ? null : folders.map((row)=>{
                    return (
                    <Box className='addHover' m={5} fontSize='150px' width='200px' height='200px' onClick={()=>{getFiles(row)}}><FolderIcon fontSize='inherit'/><Typography variant='h4'>{row}</Typography></Box>
                    )
                })}
                {!files ? null : files.map((row)=>{
                    return(
                        <Box className='addHover' m={5} fontSize='150px' width='200px' height='200px' onClick={()=>{getSpecificFile(row)}}><FolderIcon fontSize='inherit'/><Typography variant='h4'>{row}</Typography></Box>
                    )
                })}
                {!pdf ? null : <ShowPDF pdf={pdf}/>}
            </Box>
        </Box>
    )
}