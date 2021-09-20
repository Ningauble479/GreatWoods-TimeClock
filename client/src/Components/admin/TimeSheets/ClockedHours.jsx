import { Collapse, Box, Table, TableBody, TableCell, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, Typography, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../../../scripts/axiosScripts'
import {startOfWeek, endOfWeek, format, parseISO, eachDayOfInterval} from 'date-fns'
import Calendar from 'react-calendar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import 'react-calendar/dist/Calendar.css';
import { Alert } from '@material-ui/lab'


export default function ClockedHours () {
    let [date, setDate] = useState(new Date());
    let [users, setUsers] = useState([{userName: 'All'}])
    let [name, setName] = useState(null)
    let [id, setID] = useState(null)
    let [dateFNS, setDateFNS] = useState(null)
    let [weekFNS, setWeekFNS] = useState(null)
    let [times, setTimes] = useState(null)
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
        let search = {$and: [{user: id}, {day: {$in: weekFNS}}]}
        console.log(id)
        if(!id) alertLogic('Please Select A Name.', 'error')
        let {data} = await axiosScript('post', '/api/timeClock/getClockIn', {search: search})
        setTimes(data.data)
    }

    // let searchDay = async () => {
    //     let {data} = await axiosScript('post', '/api/admin/getTimeSheetDay', {query: {$and: [{user: id}, {date: dateFNS}]}})
    // }

    const handleChange = async (event) => {
        setName(event.target.value);
        setID(event.currentTarget.id);
        searchWeek(event.currentTarget.id)
      };

      let handleCalendar = async (e) => {
        setDate(e)
        let day = format(e, 'MM dd yyyy')
        setDateFNS(day)
        let weekStart = await startOfWeek(e, {weekStartsOn: 1})
        let weekEnd =  await endOfWeek(e, {weekStartsOn: 1})

        let week = `${weekStart} - ${weekEnd}`
        console.log(weekStart)
        let days = eachDayOfInterval({start: weekStart,  end: weekEnd})
        let formatedDays = days.map((row)=>format(row, 'MM dd yyyy'))
        console.log(formatedDays)
        setWeekFNS(formatedDays)
    }

    let searchDay = async (id) => {
        if(!id) return alertLogic('Please Select A Name', 'error')
        let {data} = await axiosScript('post', '/api/timeClock/getClockIn', {search: {$and: [{user: id},{day: dateFNS}]}})
        console.log(data)
        setTimes(data.data)
    }

    let formatTime = (date) => {
        let parseTime = parseISO(date)
        let newTime = format(parseTime, 'h:mm a')
        return newTime
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
        <Box flex='1' pb={5}>
            <Collapse in={open}>
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
        </Box>

        <Box width='100%' display='flex' justifyContent='center' mt={2}>
        <Table style={{width: '90%', borderBottom: '1px solid rgba(215, 215, 215, 1)', borderTop:'1px solid rgba(215, 215, 215, 1)'}}>
            <TableHead style={{backgroundColor: 'rgba(233, 234, 237, 1)'}}>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Clock In Time</TableCell>
                    <TableCell>Lunch In Time</TableCell>
                    <TableCell>Lunch Out Time</TableCell>
                    <TableCell>Clock Out Time</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                
                {
                times ? times.map((row)=>{
                    return (
                    <TableRow className='tableRow'>
                        <TableCell>{row.user.userName ? row.user.userName : !name ? 'Error No name found' : name}</TableCell>
                        <TableCell>{!row.clockIn ? 'No Time Recorded' : formatTime(row.clockIn)}</TableCell>
                        <TableCell>{!row.lunchIn ? 'No Time Recorded' : formatTime(row.lunchIn)}</TableCell>
                        <TableCell>{!row.lunchOut ? 'No Time Recorded' : formatTime(row.lunchOut)}</TableCell>
                        <TableCell>{!row.clockOut ? 'No Time Recorded' : formatTime(row.clockOut)}</TableCell>
                        <TableCell>{row.day}</TableCell>
                    </TableRow>)}) : <TableRow><TableCell>No Data To Show...</TableCell><TableCell/></TableRow>
                    }
            </TableBody>
        </Table>
        </Box>
    </Box>
    )
}