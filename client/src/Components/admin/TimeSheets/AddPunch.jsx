import { Box, Button, FormControl, Typography, Select, MenuItem, TextField, Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import axiosScript from '../../../scripts/axiosScripts'
import { parseISO, startOfWeek, endOfWeek, format, setHours } from 'date-fns'
import AccessTime from '@material-ui/icons/AccessTime'

let AddPunch = () => {

    let [ users, setUsers ] = useState(null)
    let [ jobs, setJobs ] = useState(null)
    let [ name, setName ] = useState(null)
    let [ id, setID ] = useState(null)
    let [ date, setDate ] = useState(null)
    let [ job, setJob ] = useState(null)
    let [ week, setWeek ] = useState(null)
    let [ task, setTask ] = useState(null)
    let [ time, setTime ] = useState({hours: 0, minutes: 0, seconds: 0})
    let [ dayName, setDayName ] = useState(null)
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)


    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},5000)
    }

    let getUsers = async () => {
        let {data} = await axiosScript('post', '/api/admin/getAccounts')
        setUsers(data.data)
    }

    let getJobs = async () => {
        let {data} = await axiosScript('post', '/api/admin/getJobs')
        setJobs(data.data)
    }

    const handleChange = async (event) => {
        setName(event.target.value);
        setID(event.currentTarget.id);
      };

    let handleChange2 = async (e) => {
        setJob(e.target.value)
    }

    let addPunch = async () => {
        if(!id || !name || name === '' || !job || job==='' || !task || task==='' || !week || week==='' || !date || date==='')return alertLogic('Please fill in all info', 'error')
        if(time.hours === 0 && time.minutes === 0 && time.seconds === 0) return alertLogic('Please Input How Much Time To Add', 'error')
        let data = await axiosScript('post', '/api/timeClock/newClock', {id: id, job: job, task: task, week: week, day: date, time: time, dayName: dayName})
        alertLogic(`Successfully added ${time.hours} Hour ${time.minutes} Minute ${time.seconds} Second punch for employee: ${name} job: ${job} task: ${task}`)
        setName('')
        setJob('')
        setTask('')
        setWeek('')
        setDate('')
        setTime({hours: 0, minutes: 0, seconds: 0})
        
    }

    let setDateFunc = (e) => {
        let dateArray = e.target.value.split("-")
        let newDate = `${dateArray[1]} ${dateArray[2]} ${dateArray[0]}`
        setDate(newDate)
        let parseDate = parseISO(e.target.value)
        let weekStart = format(startOfWeek(parseDate, {weekStartsOn: 1}), 'MM dd yyyy')
        let weekEnd = format(endOfWeek(parseDate, {weekStartsOn: 1}), 'MM dd yyyy')
        let week = `${weekStart} - ${weekEnd}`
        let dayName = format(parseDate, 'eeee')
        setWeek(week)
        setDayName(dayName)
    } 

    let setToday = () => {
        let today = format(new Date(), 'MM dd yyyy')
        console.log(today)
        setDate(today)
        let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let week = `${weekStart} - ${weekEnd}`
        let dayName = format(new Date(), 'eeee')
        setWeek(week)

        setWeek(week)
    }

    useEffect(()=>{
        getUsers()
        getJobs()
        if(!date) setToday()
    },[])


    return (
        <Box flex='1'>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AccessTime style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>Add a New Time Punch</Typography>
            </Box>
            <Box pl={5} pr={5} pt={5}>
            <FormControl style={{flex:'1', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingTop:'15px', marginBottom: '50px'}}>
            <Typography variant='h5'>Employee</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={name}
                  onChange={handleChange}
                  style={{width: '70%'}}
                >
                    {!users ? null : users.map((row)=>{
                return (
                    <MenuItem id={row._id} value={row.userName}>{row.userName}</MenuItem>
                )
            })}
            
                </Select>
            </FormControl>
            <FormControl style={{flex:'1', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingTop:'15px', marginBottom: '50px'}}>
            <Typography variant='h5'>Job</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={job}
                  onChange={handleChange2}
                  style={{width: '70%'}}
                >
                    {!jobs ? null : jobs.map((row)=>{
                return (
                    <MenuItem value={row.jobName}>{row.jobName}</MenuItem>
                )
            })}
            
                </Select>
            </FormControl>
            <Box width='100%' display='flex' justifyContent='space-between' alignItems='center' mb={5}>
                <Typography variant='h5'>Task</Typography>
                <TextField style={{width: '70%'}} value={task} label='Task' onChange={(e)=>setTask(e.target.value)}/>
            </Box>
            <Box width='100%' display='flex' justifyContent='space-between' mt={5} mb={5}>
            <Typography variant='h5'>Date</Typography>
                <form noValidate style={{width: '70%'}}>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue="2021-09-07"
                    onChange={(e)=>setDateFunc(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{width: '100%'}}
                    
                  />
                </form>
            </Box>
            <Box display='flex' justifyContent='space-between' width='100%'>
            <Typography variant='h5'>Time To Add</Typography>
            <Box style={{width: '70%'}} display='flex' flexDirection='column'>
                <Box width='100%' display='flex'>
            <TextField style={{flex: '1'}} value={time.hours} label='Hours' onChange={(e)=>setTime({...time, hours: e.target.value})}/>
            <TextField style={{flex: '1'}} value={time.minutes} label='Minutes' onChange={(e)=>setTime({...time, minutes: e.target.value})}/>
            <TextField style={{flex: '1'}} value={time.seconds} label='Seconds' onChange={(e)=>setTime({...time, seconds: e.target.value})}/>
            </Box>  
            <Box><Typography variant='h5'>{time.hours} : {time.minutes} : {time.seconds}</Typography></Box>
            </Box>
            </Box>
            </Box>
            <Box width='100%' borderTop='1px solid gray' mt={5} pt={5}><Button variant='outlined' onClick={()=>addPunch()}>Add</Button></Box>
        </Box>
    )
}


export default AddPunch