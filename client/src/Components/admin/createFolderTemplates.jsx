import { Box, Button, setRef, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { useEffect, useState } from 'react'
import axiosScript from "../../scripts/axiosScripts";





export default function CreateFolderTemplates () {
    let [ folders, setFolders ] = useState(null)
    let [ newFolder, setNewFolder ] = useState(null)
    let [ nestedFolder, setNestedFolder ] = useState(null)
    let [ templateName, setTemplateName] = useState(null)

    let createNewFolder = () => {
        let createdFolder = {
            folderName: newFolder,
            index: !folders ? 0 : folders.length,
            nestedFolders: null
        }
        if(!folders) return setFolders([createdFolder])
        let array = folders
        array.push(createdFolder)
        setFolders([...array])
    }

    let createNestedFolder = (e) => {
        let i = e.currentTarget.value
        console.log(folders[i])
        let foldersArray = folders
        if (!foldersArray[i].nestedFolders) {
            foldersArray[i].nestedFolders = [nestedFolder]
            setFolders([...foldersArray])
        }
        else {
            foldersArray[i].nestedFolders.push(nestedFolder)
            setFolders([...foldersArray])
        }

    }

    let setTemplate = async () => {
        let data = await axiosScript('post', '/api/admin/setTemplate', {folders, templateName})
        console.log(data)
    }

    return (
        <Box>
            <Table>
                <TableHead>
                    <TableRow style={{background: '#777777'}}>
                        <TableCell>
                            Folder Name
                        </TableCell>
                        <TableCell>
                            NestedFolders
                        </TableCell>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!folders ? null : folders.map((row)=>{
                        return (
                        <>
                        <TableRow>
                            <TableCell>
                            {row.folderName}
                            </TableCell>
                            <TableCell>
                            {!row.nestedFolders ? 0 : row.nestedFolders.length}
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                        {!row.nestedFolders ? null : row.nestedFolders.map((row)=>{
                            return (
                                <TableRow>
                                <TableCell style={{paddingLeft: '50px'}}>
                                {row}
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
    
                                </TableCell>
                                </TableRow>
                            )
                        })}
                                            <TableRow>
                        <TableCell>
                        <TextField id="filled-basic" label="Nested Folder" variant="filled" onChange={(e)=>{setNestedFolder(e.target.value)}} />
                        </TableCell>
                        <TableCell>
                            <Button value={row.index} onClick={(e)=>{createNestedFolder(e)}}>
                                Create
                            </Button>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                        </>
                        )
                    })}
                    <TableRow>
                        <TableCell>
                        <TextField id="filled-basic" label="Folder Name" variant="filled" onChange={(e)=>{setNewFolder(e.target.value)}} />
                        </TableCell>
                        <TableCell>
                        </TableCell>
                        <TableCell>
                            <Button onClick={()=>{createNewFolder()}}>
                                Create
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow style={{background: '#777777', color: 'white'}}>
                        <TableCell><TextField color="secondary" InputProps={{color: 'white'}} id="filled-basic" label="Template Name" variant="filled" onChange={(e)=>{setTemplateName(e.target.value)}} /></TableCell>
                        <TableCell></TableCell>
                        <TableCell><Button onClick={()=>{setTemplate()}}>Finish</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    )
}