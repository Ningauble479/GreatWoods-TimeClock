import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../../scripts/axiosScripts'
import {startOfWeek, endOfWeek, format} from 'date-fns'
import Calendar from 'react-calendar';

let CheckTimeSheets = () => {
    let [date, setDate] = useState(new Date());
    let [users, setUsers] = useState(null)
    let [days, setDays] = useState(null)
    let [name, setName] = useState(null)
    let [id, setID] = useState(null)
    let [dateFNS, setDateFNS] = useState(null)
    let [weekFNS, setWeekFNS] = useState(null)
    let getUsers = async () => {
        let {data} = await axiosScript('post', '/api/admin/getAccounts')
        console.log(data)
        setUsers(data.data)
    }

    let searchWeek = async (id) => {
        let {data} = await axiosScript('post', '/api/admin/getTimeSheets', {query: {$and: [{user: id}, {week: weekFNS}]}})
        console.log(id)
        if(!data || !data.data || !data.data.days){return setDays(null)}
        setDays(data.data.days)
        setName(data.data.user?.userName)
    }

    let searchDay = async () => {
        console.log(dateFNS)
    }

    let searchJob = async () => {
        console.log('job')
    }

    let getTimeSheetsJob = async (e) => {
        let {data} = await axiosScript('post', '/api/admin/getTimeSheets', {})
    }

    const handleChange = async (event) => {
        setName(event.target.value);
        setID(event.currentTarget.id);
        searchWeek(event.currentTarget.id)
      };

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

    useEffect(()=>{
        let weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'MM dd yyyy')
        let week = `${weekStart} - ${weekEnd}`
        let day = format(new Date(), 'MM dd yyyy')
        setWeekFNS(week)
        setDateFNS(day)
        getUsers()
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Job</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!days ? <div>Loading...</div> : days.map((row)=>{
                        return row.blocks.map((row2)=>{
                            return (
                                <TableRow>
                                    <TableCell>{!name ? 'Error No name found' : name}</TableCell>
                                    <TableCell>{row2.job}</TableCell>
                                    <TableCell>{row2.task}</TableCell>
                                    <TableCell>{`${row2.time.hours} : ${row2.time.minutes} : ${row2.time.seconds}`}</TableCell>
                                    <TableCell>{row2.date}</TableCell>
                                </TableRow>
                            )
                        })
                    })}
                </TableBody>
            </Table>
        </Box>
    )
}


export default CheckTimeSheets