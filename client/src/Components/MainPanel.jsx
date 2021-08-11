import { useEffect, useState } from "react";
import Timer from "./Timer";
import { Box, Button, Typography } from '@material-ui/core'
import FileView from './FileView'
import axiosScript from "../scripts/axiosScripts";


export default function MainPanel() {

    let [job, setJob] = useState(null)
    let [task, setTask] = useState(null)
    let [tasks, setTasks] = useState(null)
    let [name, setName] = useState(null)
    let [timer, setTimer] = useState(false)
    let [warning, setWarning] = useState(null)
    let [names, setNames] = useState(null)
    let [jobs, setJobs] = useState(null)
    let [id, setID] = useState(null)


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
        if(job && name) {
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
        let {data} = await axiosScript('post', 'http://localhost:3001/api/files/getJobFolders', {job: job})
        setTasks(data.folders)
    }

    let endTimer = async () => {
        setTimer(false)
    }

    useEffect(()=>{
        getUsers()
        
        getJobs()
    },[])

    return (
    <Box style={{overflowX:'hidden'}} width='100vw' height='100vh'>
        <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between'>
        {!names ? <div>Loading...</div> : names.map((row)=>{return(
            <Box>
                <Button color={ name === row.userName ? 'success' : 'primary'} variant='contained' style={{width: '200px', height: '200px', fontSize: '30px'}} onClick={(e)=>{
                    setName(row.userName)
                    setID(row._id)}}>
                {row.userName}
                </Button>
            </Box>
        )})}
        </Box>
        <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between' flexWrap='wrap'>
        {!jobs ? <div>Loading...</div> : jobs.map((row)=>{return(
            <Box m={5}>
                <Button color={ job === row.jobName ? 'success' : 'primary'} variant='contained' style={{width: '200px', height: '200px', fontSize: '50px'}} onClick={(e)=>{
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
        {!tasks ? <div>Loading...</div> : tasks.map((row)=>{return(
            <Box m={5}>
                <Button color={ task === row ? 'success' : 'primary'} variant='contained' style={{width: '200px', height: '200px', fontSize: '50px'}} onClick={(e)=>{
                    if(timer) return
                    setTask(row)}}>
                {row}
                </Button>
            </Box>
        )})}
        </Box>

        <Box mt={5}><Button  variant='contained' style={{width: '200px', height: '200px'}} onClick={(e)=>{startTimer()}}>Start Timer</Button></Box>
        <Box color='red' mt={5}><Typography variant='h4'>{!warning ? null : warning}</Typography></Box>
        <Box display='flex' flexDirection='column' height='100%' justifyContent='space-between' borderTop='1px solid black'>
            {timer ? <Timer width='100%' job={job} id={id} name={name} task={task} endTimer={endTimer}/> : null}
            {timer ? <FileView job={job}/> : null}

        </Box>
    </Box>
    )
}