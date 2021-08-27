import { useState, react } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'


function JobRow (props) {
    let [active, setActive] = useState(props.row.active)

    let changeActive = async (change, e) => {
        setActive(change)
        console.log(e.currentTarget.value)
        if(!change) {props.finishJob(e)}
        else{ props.reactiveJob(e) }
    }
    return (
        <TableRow>
            <TableCell>
                {props.row.jobName}
            </TableCell>
            <TableCell>
                {active ? 'Yes' : 'No'}
            </TableCell>
            <TableCell>
                {active ? <Button value={props.row._id} onClick={(e)=>{changeActive(false, e)}}>Finish</Button> : <Button value={props.row._id} onClick={(e)=>{changeActive(true, e)}}>Reactivate</Button>}
            </TableCell>
        </TableRow>
    )
}

export default JobRow