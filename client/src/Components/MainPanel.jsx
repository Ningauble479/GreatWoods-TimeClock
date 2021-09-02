import { useEffect, useState } from "react";
import Timer from "./Timer";
import { Box, Button, Typography } from '@material-ui/core'
import FileView from './FileView'
import axiosScript from "../scripts/axiosScripts";
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import bigLogo from '../images/bigLogo.svg'

export default function MainPanel(props) {

    let [job, setJob] = useState(null)
    let [task, setTask] = useState(null)
    let [tasks, setTasks] = useState(null)
    let [name, setName] = useState(null)
    let [timer, setTimer] = useState(false)
    let [warning, setWarning] = useState(null)
    let [names, setNames] = useState(null)
    let [jobs, setJobs] = useState(null)
    let [id, setID] = useState(null)
    let [clocked, setClocked] = useState(false)
    let [lunch, setLunch] = useState(false)

    const timeClockHandler = async () => {
        let data = await axiosScript('post', '/api/timeClock/newClock', {id: id, job: job, task: task})
        console.log(data)
    }


    let startTimer = () => {
        if(timer) return
        let warningString = ''
        if(!job) warningString = warningString + 'Please Select a job'
        if(!name) warningString = warningString + ' Please Select a name'
        if(!task) warningString = warningString + ' Please Select a task'
        setWarning(warningString)
        if(job && name && task) {
            setWarning(null)
            setTimer(true)
            timeClockHandler()
        }
    }

    let getUsers = async () => {
        let {data} = await axiosScript('post', '/api/admin/getAccounts', {arg: {jobTitle: 'Floor'}})
        setNames(data.data)
        console.log(data)
    }

    const getJobs = async () => {
        let {data} = await axiosScript('post', '/api/admin/getJobs')
        setJobs(data.data)
    }

    const getTasks = async (job) => {
        let {data} = await axiosScript('post', '/api/files/getJobFolders', {job: job})
        setTasks(data.folders)
    }

    let endTimer = async () => {
        setTimer(false)
    }

    let logout = async () => {
        localStorage.setItem('passcode', '0')
        localStorage.setItem('level', '0')
        window.location.reload()
    }

    let clockIn = async () => {
        let day = format(new Date(), 'MM dd yyyy')
        let clockIn = new Date()
        let data = await axiosScript('post', '/api/timeClock/clockIn', {id: id, day: day, clockIn: clockIn})
        setClocked(true)
    }

    let lunchStart = async () => {
        let lunchStart = new Date()
        let data = await axiosScript('post', '/api/timeClock/editClockDay', {id: id, update: {$set: {lunchIn: lunchStart}}})
        setLunch(true)
    }
    
    let lunchEnd = async () => {
        let lunchEnd = new Date()
        let data = await axiosScript('post', '/api/timeClock/editClockDay', {id: id, update: {$set: {lunchOut: lunchEnd}}})
        setLunch(false)
    }

    let clockOut = async () => {
        let clockOut = new Date()
        let data = await axiosScript('post', '/api/timeClock/editClockDay', {id: id, update: {$set: {clockOut: clockOut}}})
        setClocked(false)
    }

    useEffect(()=>{
        getUsers()
        
        getJobs()
    },[])

    return (
    <Box style={{overflowX:'hidden'}} width='100vw' height='100vh'>
        <Box mt={2} pl={2} borderBottom='1px solid black' display='flex' justifyContent='space-around' pb={2}>
            {props.level === 'admin' ? <Link to='/admin' className='linkClean'><Typography>Admin Panel</Typography></Link> : null} 
            <img src={bigLogo} style={{maxWidth: '25vw'}}/>
            <Typography className='linkClean' onClick={()=>{logout()}}>Logout</Typography>
        </Box>
            
        <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between' flexWrap='wrap'>
        {!names ? <div>Loading...</div> : names.map((row)=>{return(
            <Box>
                <Button color={ name === row.userName ? 'success' : 'primary'} variant='contained' style={{minWidth: '200px', height: '200px', fontSize: '30px'}} onClick={(e)=>{
                    if(timer)return alert('Please end your job timer')
                    if(clocked)return alert('please clock out before changing user')
                    setName(row.userName)
                    setID(row._id)}}>
                {row.userName}
                </Button>
            </Box>
        )})}
        </Box>
        <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between' flexWrap='wrap'>
        <Box width='100vw'><Typography variant='h2'>Clock In / Lunch</Typography></Box>
            { clocked ? null : <Box m={5}>
                <Button color='primary' variant='contained' style={{minWidth: '200px', height: '200px', fontSize: '30px'}} onClick={(e)=>{
                    if(timer)return alert('Please end your job timer')
                    if(!id)return alert('please select a name')
                    clockIn()}}>
                Clock In
                </Button>
            </Box>}
            {
            !clocked ? null : lunch ? null : <Box>
            <Button color='primary' variant='contained' style={{minWidth: '200px', height: '200px', fontSize: '30px'}} onClick={(e)=>{
                if(timer)return alert('Please end your job timer')
                if(!id)return alert('please select a name')
                lunchStart()}}>
            Lunch
            </Button>
            </Box>
            }
            {
                !clocked ? null : !lunch ? null : <Box>
                <Button color='primary' variant='contained' style={{minWidth: '200px', height: '200px', fontSize: '30px'}} onClick={(e)=>{
                    if(timer)return alert('Please end your job timer')
                    if(!id)return alert('please select a name')
                    lunchEnd()}}>
                End Lunch
                </Button>
                </Box>
            }
            { !clocked ? null : lunch ? null : <Box>
                <Button color='primary' variant='contained' style={{minWidth: '200px', height: '200px', fontSize: '30px'}} onClick={(e)=>{
                    if(timer)return alert('Please end your job timer')
                    if(!id)return alert('please select a name')
                    clockOut()}}>
                Clock Out
                </Button>
                </Box>}
        </Box>
        <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between' flexWrap='wrap'>
        <Box width='100vw'><Typography variant='h2'>Jobs</Typography></Box>
        {!jobs ? <div>Loading...</div> : !clocked ? <div>Please Clock In To Select A Job</div> : jobs.map((row)=>{
            if(!row.active) return null
            return(
            <Box m={5}>
                <Button color={ job === row.jobName ? 'success' : 'primary'} variant='contained' style={{minWidth: '200px', height: '200px', fontSize: '50px'}} onClick={(e)=>{
                    if(timer)return
                    getTasks(row.jobName)
                    setJob(row.jobName)
                    }}>
                {row.jobName}
                </Button>
            </Box>
        )})}
        </Box>
        <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between' flexWrap='wrap'>
        <Box width='100vw'><Typography variant='h2'>Tasks</Typography></Box>
        {!job ? <div>Tasks Will Show Here</div> : !tasks ? <div>Loading...</div> : tasks.map((row)=>{return(
            <Box m={5}>
                <Button color={ task === row ? 'success' : 'primary'} variant='contained' style={{minWwidth: '200px', height: '200px', fontSize: '50px'}} onClick={(e)=>{
                    if(timer) return
                    setTask(row)}}>
                {row}
                </Button>
            </Box>
        )})}
        </Box>
        <Box width='100vw'><Typography variant='h2'>Clock</Typography></Box>
        {!job ? <Box>Clock Will Show Here</Box> : <Box mt={5}><Button  variant='contained' style={{minWidth: '200px', height: '200px'}} onClick={(e)=>{startTimer()}}>Start Timer</Button></Box>}
        <Box color='red' mt={5}><Typography variant='h4'>{!warning ? null : warning}</Typography></Box>
        <Box display='flex' flexDirection='column' height='100%' justifyContent='space-between' borderTop='1px solid black'>
            {timer ? <Timer width='100%' job={job} id={id} name={name} task={task} endTimer={endTimer}/> : null}
            {timer ? <FileView job={job}/> : null}

        </Box>
    </Box>
    )
}