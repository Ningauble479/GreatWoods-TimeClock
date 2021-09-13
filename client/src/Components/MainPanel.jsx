import { useEffect, useState } from "react";
import Timer from "./Timer";
import { Box, Button, Collapse, Typography } from '@material-ui/core'
import FileView from './FileView'
import axiosScript from "../scripts/axiosScripts";
import { Link } from 'react-router-dom'
import { format, formatISO, parseISO } from 'date-fns'
import bigLogo from '../images/bigLogo.svg'
import HeaderIMG from '../images/04.jpg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AnalogueClock from 'react-analogue-clock';
import ScrollContainer from 'react-indiana-drag-scroll'
import JobsBG from '../images/JobsBG.jpg'
import FilesBG from '../images/FilesBG.jpg'


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
    let [timeShow, setTimeShow] = useState(null)
    let [clockInOpen, setClockInOpen] = useState(false)
    let [clockInTime, setClockInTime] = useState(null)
    let [lunchInTime, setLunchInTime] = useState(null)
    let [lunchOutTime, setLunchOutTime] = useState(null)
    let [clockOutTime, setClockOutTime] = useState(null)
    let [showJobs, setShowJobs] = useState(false)
    let [showTasks, setShowTasks] = useState(false)
    let [showFiles, setShowFiles] = useState(false)

    const clockOptions = {
        baseColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 5,
        centerColor: '#000000',
        handColors: {
            hour: '#000000',
            minute: '#000000',
            second: '#000000',
        },
        notchColor: '#000000',
        numbersColor: '#000000',
        showNumbers: true,
        size: 300
    }

    const timeClockHandler = async () => {
        let data = await axiosScript('post', '/api/timeClock/newClock', { id: id, job: job, task: task })
        console.log(data)
    }


    let startTimer = () => {
        if (timer) return
        let warningString = ''
        if (!job) warningString = warningString + 'Please Select a job'
        if (!name) warningString = warningString + ' Please Select a name'
        if (!task) warningString = warningString + ' Please Select a task'
        setWarning(warningString)
        if (job && name && task) {
            setWarning(null)
            setTimer(true)
            timeClockHandler()
        }
    }

    let getUsers = async () => {
        let { data } = await axiosScript('post', '/api/admin/getAccounts', { arg: { jobTitle: 'Floor' } })
        setNames(data.data)
        console.log(data)
    }

    const getJobs = async () => {
        let { data } = await axiosScript('post', '/api/admin/getJobs')
        setJobs(data.data)
    }

    const getTasks = async (job) => {
        let { data } = await axiosScript('post', '/api/files/getJobFolders', { job: job })
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
        let data = await axiosScript('post', '/api/timeClock/clockIn', { id: id, day: day, clockIn: clockIn })
        let newTime = format(new Date(), 'hh:mm b d LLL, yyyy')
        setClockInTime(newTime)
        setClocked(true)
    }

    let lunchStart = async () => {
        let lunchStart = new Date()
        let data = await axiosScript('post', '/api/timeClock/editClockDay', { id: id, update: { $set: { lunchIn: lunchStart } } })
        let newTime = format(new Date(), 'hh:mm b d LLL, yyyy')
        setLunch(true)
        setLunchInTime(newTime)
    }

    let lunchEnd = async () => {
        let lunchEnd = new Date()
        let data = await axiosScript('post', '/api/timeClock/editClockDay', { id: id, update: { $set: { lunchOut: lunchEnd } } })
        let newTime = format(new Date(), 'hh:mm b d LLL, yyyy')
        setLunch(false)
        setLunchOutTime(newTime)
    }

    let clockOut = async () => {
        let clockOut = new Date()
        let data = await axiosScript('post', '/api/timeClock/editClockDay', { id: id, update: { $set: { clockOut: clockOut } } })
        let newTime = format(new Date(), 'hh:mm b d LLL, yyyy')
        setClockOutTime(newTime)
    }

    let tick = async () => {
        let newTime = await format(new Date(), 'h:mm')
        setTimeShow(newTime)
    }

    let getClock = async (id) => {
        setClockInOpen(true)
        let today = format(new Date(), 'MM dd yyyy')
        let {data} = await axiosScript('post', '/api/timeClock/getClockIn', {search: {$and : [{user: id}, {day: today}]}})
        console.log(data.data)
        if(!data.success) {
            setClockInTime(null)
            setClockOutTime(null)
            setLunchInTime(null)
            setLunchOutTime(null)
            return
        }
        if(data.data.clockIn) {
        let parseTime = parseISO(data.data.clockIn)
        let newTime = format(parseTime, 'h:mm b d LLL, yyyy')
        console.log(newTime)
        setClockInTime(newTime)
        setClocked(true)}
        if(data.data.lunchIn){
            let parseTime = parseISO(data.data.lunchIn)
            let newTime = format(parseTime, 'h:mm b d LLL, yyyy')
            setLunchInTime(newTime)
        }
        if(data.data.lunchOut) {
            let parseTime = parseISO(data.data.lunchOut)
            let newTime = format(parseTime, 'h:mm b d LLL, yyyy')
            setLunchOutTime(newTime)
        }
        if(data.data.clockOut) {
            let parseTime = parseISO(data.data.clockOut)
            let newTime = format(parseTime, 'h:mm b d LLL, yyyy')
            setClockOutTime(newTime)
        }

    }

    useEffect(() => {
        getUsers()
        setInterval(() => { tick() }, 1000)
        getJobs()
    }, [])

    return (
        <Box style={{ overflowX: 'hidden' }} width='100vw' height='100vh'>
            {/* NavBar */}
            <Box mt={2} pl={2} maxHeight='228px' borderBottom='1px solid black' display='flex' justifyContent='space-around' pb={2}>
                {props.level === 'admin' ? <Link to='/admin' className='linkClean'><Typography>Admin Panel</Typography></Link> : null}
                <img src={bigLogo} style={{ maxWidth: '25vw' }} />
                <Typography className='linkClean' onClick={() => { logout() }}>Logout</Typography>
            </Box>



            {/* Name Picking Section */}
            <Box style={{ backgroundImage: `url(${HeaderIMG})`, backgroundSize: 'cover' }} height='473px' borderBottom='1px solid black' display='flex' flexDirection='row' flexWrap='nowrap' alignItems='center'>

                {!names ? <div>Loading...</div> : <Box display='flex' width='100vw'>
                    <ScrollContainer className="scroll-container">
                    <Box maxWidth='100%' display='flex'>
                    {names.map((row) => {
                        return (

                            <Box height='100%'>
                                <Button variant='contained' style={{ marginRight: '50px', marginLeft: '50px', minWidth: '400px', height: '300px', fontSize: '30px', backgroundColor:name === row.userName ? 'green' : '#A3BCB6' }} onClick={(e) => {
                                    if (timer) return alert('Please end your job timer')
                                    setName(row.userName)
                                    setID(row._id)
                                    getClock(row._id)
                                }}>
                                    {row.userName}
                                </Button>
                            </Box>
                        )
                    })}
                    </Box>
                    </ScrollContainer>
                    
                </Box>}
            </Box>

            {/* Clock In/Out Section */}
            <Collapse in={clockInOpen} collapsedSize='100px'>
            <Box>
                <Box width='100vw' color='white' style={{backgroundColor: '#555555', paddingTop: '20px', paddingBottom: '20px'}} onClick={()=>{clockInOpen ? setClockInOpen(false) : setClockInOpen(true)}}> <Typography variant='h3'>Employee Time Clock</Typography></Box>
                <Box p={5} borderBottom='1px solid black' display='flex' flexDirection='row' justifyContent='space-around' alignContent='space-between' flexWrap='nowrap'>
                    <Box width='35%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

                        <AnalogueClock {...clockOptions} />
                        <Box>
                            <Box textAlign='right'>AM</Box>
                            <Box>
                                <Typography variant='h1'>{timeShow}</Typography>
                            </Box>

                        </Box>
                    </Box>
                    <Box width='65%' display='flex'>
                        <Box width='100%' display='flex' justifyContent='space-around' flexDirection='column' minHeight='580px' height='100%'>
                            <Box display='flex' justifyContent='space-around' alignItems='center'>
                            <Button variant='contained' style={{width: '356px', height: '110px', backgroundColor: clockInTime ? 'green' : '#C4C4C4'}} onClick={(e)=>{
                    if(timer)return alert('Please end your job timer')
                    if(!id)return alert('please select a name')
                    if(clockInTime) return alert('You Are Already Clocked In For The Day!')
                    clockIn()}}><Typography variant='h4'>Clock In</Typography></Button>
                            <Box style={{backgroundColor: 'gray', height: '50px', width: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Typography variant='h4'>{clockInTime}</Typography></Box>
                            </Box>
                            <Box display='flex' justifyContent='space-around' alignItems='center'>
                            <Button variant='contained' style={{width: '356px', height: '110px', backgroundColor: lunchInTime ? 'green' : '#C4C4C4'}} onClick={(e)=>{
                if(timer)return alert('Please end your job timer')
                if(!id)return alert('please select a name')
                if(lunchInTime) return alert('You Already Clocked Your Lunch!')
                lunchStart()}}><Typography variant='h4'>Start Lunch</Typography></Button>
                            <Box style={{backgroundColor: 'gray', height: '50px', width: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Typography variant='h4'>{lunchInTime}</Typography></Box>
                            </Box>
                            <Box display='flex' justifyContent='space-around' alignItems='center'>
                            <Button variant='contained' style={{width: '356px', height: '110px', backgroundColor: lunchOutTime ? 'green' : '#C4C4C4'}} onClick={(e)=>{
                    if(timer)return alert('Please end your job timer')
                    if(!id)return alert('please select a name')
                    if(lunchOutTime) return alert('You Already Clocked Your Lunch')
                    lunchEnd()}}><Typography variant='h4'>End Lunch</Typography></Button>
                            <Box style={{backgroundColor: 'gray', height: '50px', width: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Typography variant='h4'>{lunchOutTime}</Typography></Box>
                            </Box>
                            <Box display='flex' justifyContent='space-around' alignItems='center'>
                            <Button variant='contained' style={{width: '356px', height: '110px', backgroundColor: clockOutTime ? 'green' : '#C4C4C4'}} onClick={(e)=>{
                    if(timer)return alert('Please end your job timer')
                    if(!id)return alert('please select a name')
                    if(clockOutTime) return alert('You Already Clocked Out!')
                    clockOut()}}><Typography variant='h4'>Clock Out</Typography></Button>
                            <Box style={{backgroundColor: 'gray', height: '50px', width: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Typography variant='h4'>{clockOutTime}</Typography></Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            </Collapse>

            {/* Jobs Section */}
            <Collapse in={showJobs} collapsedSize='100px'>
            <Box width='100vw' color='white' style={{backgroundColor: '#555555', paddingTop: '20px', paddingBottom: '20px'}} onClick={()=>{showJobs ? setShowJobs(false) : setShowJobs(true)}}> <Typography variant='h3'>Jobs</Typography></Box>
            
            <Box height='500px' width='100vw' display='flex' alignItems='center' style={{ backgroundImage: `url(${JobsBG})`, backgroundSize: 'cover' }}>
            <ScrollContainer className="scroll-container">
                <Box maxWidth='100%' height='100%' display='flex'>

                {!jobs ? <div>Loading...</div> : !clocked ? <div>Please Clock In To Select A Job</div> : jobs.map((row) => {
                    // if (!row.active) return null
                    return (
                        <Box m={5}>
                            <Button variant='contained' style={{ minWidth: '400px', height: '200px', fontSize: '50px', backgroundColor: job === row.jobName ? 'green' : '#A3BCB6' }} onClick={(e) => {
                                if (timer) return
                                getTasks(row.jobName)
                                setJob(row.jobName)
                            }}>
                                {row.jobName}
                            </Button>
                        </Box>
                        
                    )
                })}
                </Box>
                </ScrollContainer>
            </Box>
            </Collapse>

            {/* Tasks Section */}
            <Collapse in={showTasks} collapsedSize='100px'>
            <Box width='100vw' color='white' style={{backgroundColor: '#555555', paddingTop: '20px', paddingBottom: '20px'}} onClick={()=>{showTasks ? setShowTasks(false) : setShowTasks(true)}}> <Typography variant='h3'>Tasks</Typography></Box>
            <Box display='flex' flexDirection='row'>
                <Box maxHeight='700px' width='35%'>
                    <ScrollContainer>
                        <Box maxHeight='700px' display='flex' flexDirection='column' flexGrow='0' justifyContent='center' alignItems='center'>
                        {!job ? <div>Tasks Will Show Here</div> : !tasks ? <div>Loading...</div> : tasks.map((row) => {
                    return (
                            <Button variant='contained' style={{minHeight: '100px', minWidth:'350px', marginBottom: '40px', marginTop:'40px', backgroundColor: task===row ? 'green' : '#C4C4C4'}} onClick={(e) => {
                                if (timer) return
                                setTask(row)
                            }}>
                                {row}
                            </Button>
                    )
                })}
                        </Box>
                    </ScrollContainer>
                </Box>
                <Box width='65%' pt={3} display='flex' flexDirection='column' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h4'>{!name ? 'Unselected' : name} - Task: {!task ? 'Unselected' : task}</Typography>
                    <Timer width='100%' job={job} id={id} name={name} task={task} endTimer={endTimer} startTimer={startTimer} />
                </Box>
                {/* <Box width='100vw'><Typography variant='h2'>Tasks</Typography></Box>
                {!job ? <div>Tasks Will Show Here</div> : !tasks ? <div>Loading...</div> : tasks.map((row) => {
                    return (
                        <Box m={5}>
                            <Button color={task === row ? 'success' : 'primary'} variant='contained' style={{ minWwidth: '200px', height: '200px', fontSize: '50px' }} onClick={(e) => {
                                if (timer) return
                                setTask(row)
                            }}>
                                {row}
                            </Button>
                        </Box>
                    )
                })} */}
            </Box>
            </Collapse>
            <Collapse in={showFiles} collapsedSize='100px'>
            <Box width='100vw' color='white' style={{backgroundColor: '#555555', paddingTop: '20px', paddingBottom: '20px'}} onClick={()=>{showFiles ? setShowFiles(false) : setShowFiles(true)}}> <Typography variant='h3'>Files</Typography></Box>
            {!job ? null : <FileView job={job}/>}
            </Collapse>

            {/* Clock For Jobs */}
            {/* <Box width='100vw'><Typography variant='h2'>Clock</Typography></Box>
            {!job ? <Box>Clock Will Show Here</Box> : <Box mt={5}><Button variant='contained' style={{ minWidth: '200px', height: '200px' }} onClick={(e) => { startTimer() }}>Start Timer</Button></Box>}
            <Box color='red' mt={5}><Typography variant='h4'>{!warning ? null : warning}</Typography></Box>
            <Box display='flex' flexDirection='column' height='100%' justifyContent='space-between' borderTop='1px solid black'>
                {timer ? <Timer width='100%' job={job} id={id} name={name} task={task} endTimer={endTimer} /> : null}
                {timer ? <FileView job={job} /> : null}

            </Box> */}
        </Box>
    )
}