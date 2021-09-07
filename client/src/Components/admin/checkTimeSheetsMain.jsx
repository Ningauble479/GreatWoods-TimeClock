import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, Typography, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../../scripts/axiosScripts'
import {startOfWeek, endOfWeek, format} from 'date-fns'
import Calendar from 'react-calendar';
import AddPunch from './addPunch';

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
        setSearchType('Searching By Week')
    }

    let searchDay = async () => {
        let {data} = await axiosScript('post', '/api/admin/getTimeSheetDay', {query: {$and: [{user: id}, {date: dateFNS}]}})
        setBlocks(data.data)
        setSearchType('Searching By Day')
    }

    let searchJob = async () => {
        console.log(job)
        let {data} = await axiosScript('post', '/api/admin/getTimeSheetJob', {query: {job: job}})
        console.log(data.data)
        setBlocks(data.data)
        setSearchType('Searching By Job')

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
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Box display='flex' justifyContent='center' width='50%' flexDirection='column'>
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
            <Typography>Day Shown: {dateFNS}</Typography>
            <Typography>Week Shown: {weekFNS}</Typography>
            </Box>
                <Box width='50%'>
                    <Calendar
                      onChange={(e)=>handleCalendar(e)}
                      value={date}
                    />
                </Box>
            </Box>
            <Box>
            <Button onClick={()=>{searchDay(id)}}>Search By Date</Button>
            <Button onClick={()=>{searchWeek(id)}}>Search By Week</Button>
            <Button onClick={()=>{searchJob(id)}}>Search By Job</Button>
            </Box>
            <Box>{!searchType ? 'Not searching anything' : searchType}</Box>
            <Table>
                <TableHead>
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
                    }) : !sheets ? <div>Loading...</div> : sheets.map((sheet)=>{
                        let name = sheet.user.userName
                    return sheet.days.map((row)=>{
                        return row.blocks.map((row2)=>{
                            return (
                                <TableRow>
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
    )
}


export default CheckTimeSheets