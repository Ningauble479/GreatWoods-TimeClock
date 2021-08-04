import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { useEffect, useState } from 'react'


function NestedRow1 (props) {
    let [ openRow, setOpenRow ] = useState(props.openRow)
    let [ openNextRow, setOpenNextRow ] = useState(false)
    let [ indent, setIndent ] = useState(props.indent + 50)

    useEffect(()=>{
        setOpenRow(props.openRow)
    },[props])
    if(!openRow) return null
    return (
        <>
        <TableRow>
            <TableCell style={{paddingLeft: `${indent}px`}}>
                CutDimensions
            </TableCell>
            <TableCell>
                2
            </TableCell>
            <TableCell>
                <Button onClick={()=>{setOpenNextRow(true)}}>Open</Button>
            </TableCell>
        </TableRow>
        <NestedRow2 openRow={openNextRow} indent={indent}/>
        </>
    )
}

function NestedRow2 (props){
    let [ openRow, setOpenRow ] = useState(props.openRow)
    let [ openNextRow, setOpenNextRow ] = useState(false) 
    let [ indent, setIndent ] = useState(props.indent + 50)

    useEffect(()=>{
        setOpenRow(props.openRow)
    },[props])
    if(!openRow) return null
    return (
        <>
        <TableRow>
            <TableCell style={{paddingLeft: `${indent}px`}}>
                CutDimensions
            </TableCell>
            <TableCell>
                2
            </TableCell>
            <TableCell>
                <Button onClick={()=>{setOpenNextRow(true)}}>Open</Button>
            </TableCell>
        </TableRow>
        <NestedRow1 openRow={openNextRow} indent={indent}/>
        </>
    )
}


export default function CreateFolderTemplates () {
    return (
        <Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Folder Name
                        </TableCell>
                        <TableCell>
                            NestedFolders
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            WoodCutting
                        </TableCell>
                        <TableCell>
                            1
                        </TableCell>
                    </TableRow>
                    <NestedRow1 openRow={true} indent={0}/>
                </TableBody>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            WoodCutting
                        </TableCell>
                        <TableCell>
                            1
                        </TableCell>
                    </TableRow>
                    <NestedRow1 openRow={true} indent={0}/>
                </TableBody>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            WoodCutting
                        </TableCell>
                        <TableCell>
                            1
                        </TableCell>
                    </TableRow>
                    <NestedRow1 openRow={true} indent={0}/>
                </TableBody>
            </Table>
        </Box>
    )
}