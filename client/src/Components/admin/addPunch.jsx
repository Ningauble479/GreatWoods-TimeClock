import { Box, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../../scripts/axiosScripts'
import { parseISO, startOfWeek, endOfWeek, format, setHours } from 'date-fns'

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
        console.log(id)
        console.log(job)
        console.log(task)
        console.log(week)
        console.log(date)
        if(!id || !job || !task || !week || !date)return alert('Please fill in all info')
        if(time.hours === 0 && time.minutes === 0 && time.seconds === 0) return alert('Please Input How Much Time To Add')
        let data = await axiosScript('post', '/api/timeClock/newClock', {id: id, job: job, task: task, week: week, day: date, time: time, dayName: dayName})
        
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
        <Box width='100vw'>
            <Box>
            <FormControl style={{minWidth: 120}}>
                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={name}
                  onChange={handleChange}
                >
                    {!users ? null : users.map((row)=>{
                return (
                    <MenuItem id={row._id} value={row.userName}>{row.userName}</MenuItem>
                )
            })}
            
                </Select>
            </FormControl>
            <FormControl style={{minWidth: 120}}>
                <InputLabel id="demo-simple-select-label">Job</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={job}
                  onChange={handleChange2}
                >
                    {!jobs ? null : jobs.map((row)=>{
                return (
                    <MenuItem value={row.jobName}>{row.jobName}</MenuItem>
                )
            })}
            
                </Select>
            </FormControl>
            <TextField label='Task' onChange={(e)=>setTask(e.target.value)}/>
            <form noValidate>
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2021-09-07"
                onChange={(e)=>setDateFunc(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <TextField label='Hours' onChange={(e)=>setTime({...time, hours: e.target.value})}/>
            <TextField label='Minutes' onChange={(e)=>setTime({...time, minutes: e.target.value})}/>
            <TextField label='Seconds' onChange={(e)=>setTime({...time, seconds: e.target.value})}/>
            <Box>{time.hours} : {time.minutes} : {time.seconds}</Box>
            </Box>
            <Button style={{width: '200px', height:'200px', marginTop:'50px'}} onClick={()=>addPunch()}>Add</Button>
        </Box>
    )
}


export default AddPunch