import { useState } from "react";
import Timer from "./Timer";
import { Box, Button, Typography } from '@material-ui/core'
import FileView from './FileView'


export default function MainPanel() {

    let [job, setJob] = useState(null)
    let [name, setName] = useState(null)
    let [timer, setTimer] = useState(false)
    let [warning, setWarning] = useState(null)
    let names = [ 'Timmy', 'Rob', 'Jason']
    let jobs = ['Door', 'Frame', 'Box']

    let startTimer = () => {
        let warningString = ''
        if(!job) warningString = warningString + 'Please Select a job'
        if(!name) warningString = warningString + ' Please Select a name'
        setWarning(warningString)
        if(job && name) {
            setWarning(null)
            setTimer(true)}
    }

    return (
    <Box style={{overflowX:'hidden'}} width='100vw' height='100vh'>
        <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between'>
        {names.map((row)=>{return(
            <Box>
                <Button color={ name === row ? 'success' : 'primary'} variant='contained' onClick={(e)=>{setName(row)}}>
                {row}
                </Button>
            </Box>
        )})}
        </Box>
        <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between'>
        {jobs.map((row)=>{return(
            <Box>
                <Button color={ job === row ? 'success' : 'primary'} variant='contained' onClick={(e)=>{setJob(row)}}>
                {row}
                </Button>
            </Box>
        )})}
        </Box>
        <Box mt={5}><Button  variant='contained' onClick={(e)=>{startTimer()}}>Start Timer</Button></Box>
        <Box color='red' mt={5}><Typography variant='h4'>{!warning ? null : warning}</Typography></Box>
        <Box display='flex' height='100%' justifyContent='space-between' borderTop='1px solid black'>
            {timer ? <Timer width='50%' job={job} name={name}/> : null}
            {timer ? <FileView/> : null}

        </Box>
    </Box>
    )
}