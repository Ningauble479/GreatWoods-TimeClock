import { Box, Typography, Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../scripts/axiosScripts'
import FolderIcon from '@material-ui/icons/Folder';
import ShowPDF from './showpdf';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import FilesBG from '../images/FilesBG.jpg'
export default function FileView (props) {

    let [ folders, setFolders ] = useState(null)
    let [ files, setFiles ] = useState(null)
    let [ currentFolder, setCurrentFolder ] = useState(null)
    let [ folderView, setFolderView ] = useState(false)
    let [ pdf, setpdf ] = useState(null)
    let [ path, setPath ] = useState(`jobs/${props.job}`)

    let getFolders = async () => {
        let {data, config} = await axiosScript('post', '/api/files/getJobFolders', {job: props.job})
        console.log(data)
        setFolders(data.folders)
        setFolderView(true)
    }

    let getFiles = async (folder) => {
        let newPath = path+`/${folder}`
        setPath(newPath)
        let {data} = await axiosScript('post', '/api/files/getFile', {path: newPath})
        console.log(data)
        if(data.type === 'dir'){
            setFolders(data.folders)
        }
        else {
            setpdf(data.data.data)
            setFiles(null)
            setFolderView(false)
        }
    }

    let getSpecificFile = async (file) => {
        let {data} = await axiosScript('post', '/api/files/getFiles', {currentFolder, file})
        console.log(data.data.data)
        setpdf(data.data.data)
        setFiles(null)
    }  

    let backToTop = async () => {
        setFolderView(true)
        setFiles(null)
        setCurrentFolder(null)
        setpdf(null)
        setPath(`jobs/${props.job}`)
        getFolders()
    }

    useEffect(()=>{
        getFolders()
    },[])

    return (
        <Box pt={5} width='100%' paddingBottom='100px' style={{ backgroundImage: `url(${FilesBG})`, backgroundSize: 'cover' }} color='white'>
            <Button variant='contained' color='#555555' onClick={()=>{backToTop()}}>Back</Button>
            <Typography>
                {path}
            </Typography>
            <Box color='white' width='100%' display='flex' justifyContent='space-around' flexWrap='wrap'>
                {!folderView ? null : folders.map((row)=>{
                    return (
                    <Box className='addHover' m={5} fontSize='150px' width='200px' height='200px' onClick={()=>{getFiles(row)}}>
                        {row.includes('pdf') ? <PictureAsPdfIcon fontSize='inherit'/> : <FolderIcon fontSize='inherit' style={{color: 'lightgoldenrodyellow'}}/>}
                        <Typography variant='h4'>{row}</Typography>
                    </Box>
                    )
                })}
                {!files ? null : files.map((row)=>{
                    return(
                        <Box className='addHover' color='yellow' m={5} fontSize='150px' width='200px' height='200px' onClick={()=>{getSpecificFile(row)}}><FolderIcon fontSize='inherit' color='inherit' style={{color:'yellow'}}/><Typography variant='h4'>{row}</Typography></Box>
                    )
                })}
                {!pdf ? null : <ShowPDF pdf={pdf}/>}
            </Box>
        </Box>
    )
}