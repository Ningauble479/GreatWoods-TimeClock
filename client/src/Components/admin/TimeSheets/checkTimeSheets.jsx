import { Collapse, Box, Table, TableBody, TableCell, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, Typography, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../../../scripts/axiosScripts'
import {startOfWeek, endOfWeek, format} from 'date-fns'
import Calendar from 'react-calendar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Alert } from '@material-ui/lab'
import 'react-calendar/dist/Calendar.css';
let CheckTimeSheets = () => {

    let [date, setDate] = useState(new Date());
    let [users, setUsers] = useState([{userName: 'All'}])
    let [name, setName] = useState(null)
    let [id, setID] = useState(null)
    let [dateFNS, setDateFNS] = useState(null)
    let [weekFNS, setWeekFNS] = useState(null)
    let [job, setJob] = useState(null)
    let [jobs, setJobs] = useState(null)
    let [blocks, setBlocks] = useState(null)
    let [sheets, setSheets] = useState(null)
    let [searchType, setSearchType] = useState(null)
    let [updateTime, setUpdateTime] = useState({
        hours: 0,
        seconds: 0,
        minutes: 0
    })
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
        console.log(data.data)
        let array = users
        let newArray = array.concat(data.data)
        console.log(array)
        setUsers([...newArray])
    }

    let searchWeek = async (id) => {
        let search = {$and: [{user: id}, {week: weekFNS}]}
        if(!id) search = {week: weekFNS}
        let {data} = await axiosScript('post', '/api/admin/getTimeSheets', {query: search})
        console.log(data.data)
        setBlocks(null)
        setSheets(data.data)
        setSearchType('Week')
    }

    let searchDay = async () => {
        let {data} = await axiosScript('post', '/api/admin/getTimeSheetDay', {query: {$and: [{user: id}, {date: dateFNS}]}})
        setBlocks(data.data)
        setSearchType('Day')
    }

    let searchJob = async () => {
        console.log(job)
        if(!job) return alertLogic('Please Select a Job to Search By Job', 'error')
        let {data} = await axiosScript('post', '/api/admin/getTimeSheetJob', {query: {job: job}})
        console.log(data.data)
        setBlocks(data.data)
        setSearchType('Job')

    }

    const handleChange = async (event) => {
        setName(event.target.value);
        setID(event.currentTarget.id);
        searchWeek(event.currentTarget.id)
      };

    let handleChange2 = async (e) => {
        setJob(e.target.value)
    }

    let handleCalendar = async (e) => {
        console.log(e)
        setDate(e)
        let day = format(e, 'MM dd yyyy')
        setDateFNS(day)
        let weekStart = format(startOfWeek(e, {weekStartsOn: 1}), 'MM dd yyyy')
        let weekEnd = format(endOfWeek(e, {weekStartsOn: 1}), 'MM dd yyyy')
        let week = `${weekStart} - ${weekEnd}`
        setWeekFNS(week)
    }

    let getJobs = async () => {
        let {data} = await axiosScript('post', '/api/admin/getJobs')
        console.log(data)
        setJobs(data.data)
    }

    let editPunch = (block) => {
        axiosScript('post', '/api/timeClock/updateBlock', {blockID: block._id, time: updateTime})
        window.location.reload()
    }

    useEffect(()=>{
        let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let week = `${weekStart} - ${weekEnd}`
        let day = format(new Date(), 'MM dd yyyy')
        setWeekFNS(week)
        setDateFNS(day)
        getUsers()
        getJobs()
    },[])

    return (
        <Box flex='1' pb={5}>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AccessTimeIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>Check Time Sheets</Typography>
            </Box>
            <Box display='flex' flexDirection='column' justifyContent='space-between'>
            <Box display='flex' justifyContent='center' flexDirection='column' pl={5} pt={5} pr={5}>
            <FormControl style={{flex:'1', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingTop:'15px', marginBottom: '25px'}}>
                <Typography variant='h5'>Employee</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{width: '70%'}}
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
            <FormControl style={{flex:'1', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingTop:'15px', marginBottom: '50px'}}>
            <Typography variant='h5'>Job Name</Typography>
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
            <Typography>Day Picked: {dateFNS}</Typography>
            <Typography>Week Picked: {weekFNS}</Typography>
            </Box>
                <Box width='100%' display='flex' justifyContent='center' mt={2}>
                    <Calendar
                      onChange={(e)=>handleCalendar(e)}
                      value={date}
                      style={{width: '100%'}}
                    />
                </Box>
            </Box>

            <Box m={2}>
                <Button variant='outlined' style={{margin: '15px'}} onClick={()=>{searchDay(id)}}>Search By Date</Button>
                <Button variant='outlined' style={{margin: '15px'}} onClick={()=>{searchWeek(id)}}>Search By Week</Button>
                <Button variant='outlined' style={{margin: '15px'}} onClick={()=>{searchJob(id)}}>Search By Job</Button>
            </Box>

            <Box>{!searchType ? 'Not searching anything' : searchType === 'Week' ? `Searching dates: ${!weekFNS ? 'error' : weekFNS} for ${!name ? 'everyone' : name}` : searchType === 'Day' ? `Searching date: ${dateFNS} for ${!name ? 'everyone' : name}` : searchType === 'Job' ? `Searching Job ${job} for ${!name ? 'everyone' : name}` : 'error'}</Box>
            <Box width='100%' display='flex' justifyContent='center' mt={2}>
            <Table style={{width: '90%', borderBottom: '1px solid rgba(215, 215, 215, 1)', borderTop:'1px solid rgba(215, 215, 215, 1)'}}>
                <TableHead style={{backgroundColor: 'rgba(233, 234, 237, 1)'}}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Job</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Time H/M/S</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {
                    blocks ? blocks.map((row)=>{
                        return (
                        <TableRow>
                            <TableCell>{row.user.userName ? row.user.userName : !name ? 'Error No name found' : name}</TableCell>
                            <TableCell>{row.job}</TableCell>
                            <TableCell>{row.task}</TableCell>
                            <TableCell><TextField label='Hours' defaultValue={row.time.hours} onChange={(e)=>setUpdateTime({...updateTime, hours: e.target.value})}/> <TextField label='Minutes' defaultValue={row.time.minutes} onChange={(e)=>setUpdateTime({...updateTime, minutes: e.target.value})}/> <TextField label='Seconds' defaultValue={row.time.seconds} onChange={(e)=>setUpdateTime({...updateTime, seconds: e.target.value})}/></TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell><Button onClick={()=>editPunch(row)}>Save</Button></TableCell>
                        </TableRow>
                        )
                    }) : !sheets ? <TableRow><TableCell>No Data To Show...</TableCell></TableRow> : sheets.map((sheet)=>{
                        let name = sheet.user.userName
                    return sheet.days.map((row)=>{
                        return row.blocks.map((row2)=>{
                            return (
                                <TableRow className='tableRow'>
                                    <TableCell>{row.user.userName ? row.user.userName : !name ? 'Error No name found' : name}</TableCell>
                                    <TableCell>{row2.job}</TableCell>
                                    <TableCell>{row2.task}</TableCell>
                                    <TableCell><TextField label='Hours' defaultValue={row2.time.hours} onChange={(e)=>setUpdateTime({...updateTime, hours: e.target.value})}/> <TextField label='Minutes' defaultValue={row2.time.minutes} onChange={(e)=>setUpdateTime({...updateTime, minutes: e.target.value})}/> <TextField label='Seconds' defaultValue={row2.time.seconds} onChange={(e)=>setUpdateTime({...updateTime, seconds: e.target.value})}/></TableCell>
                                    <TableCell>{row2.date}</TableCell>
                                    <TableCell><Button onClick={(e)=>editPunch(row2)}>Save</Button></TableCell>
                                </TableRow>
                            )
                        })
                    })})}
                </TableBody>
            </Table>
            </Box>
        </Box>
    )
}


export default CheckTimeSheets