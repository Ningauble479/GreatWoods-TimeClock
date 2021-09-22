import { useState } from 'react'
import { Button, TableCell, TableRow } from '@material-ui/core'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import { Link } from 'react-router-dom'
function JobRow (props) {
    let [active, setActive] = useState(props.row.active)

    let changeActive = async (change, e) => {
        setActive(change)
        console.log(e.currentTarget.value)
        if(!change) {props.finishJob(e)}
        else{ props.reactiveJob(e) }
    }
    return (
        <TableRow className='tableRow'>
            <TableCell>
                {props.row.jobName}
            </TableCell>
            <TableCell>
                {active ? 'Yes' : 'No'}
            </TableCell>
            <TableCell>
                {active ? <Button value={props.row._id} onClick={(e)=>{changeActive(false, e)}}>Finish</Button> : <Button value={props.row._id} onClick={(e)=>{changeActive(true, e)}}>Reactivate</Button>}
            </TableCell>
            <TableCell><Link className='linkClean' to={`/admin/jobs/jobProfile/${props.row._id}`}><RemoveRedEye/></Link></TableCell>
        </TableRow>
    )
}

export default JobRow