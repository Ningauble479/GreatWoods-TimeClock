import { Box, Button, Typography, Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { differenceInMinutes, format, formatDistanceToNowStrict } from 'date-fns'
import axiosScript from '../scripts/axiosScripts';
import { differenceInSeconds } from 'date-fns/esm';

export default function Timer (props) {

    let [startTime, setStartTime] = useState(null)
    let [endTime, setEndTime] = useState(null)
    let [finished, setFinished] = useState(null)
    let [finishedTime, setFinishedTime] = useState(null)
    let [howLong, setHowLong] = useState(null)
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: false });

      let updateTimeClock = async (timeStart, timeEnd) => {
        let times = await `${format(startTime, "h ':' m ':' s bbb")} - ${timeEnd}`
        console.log(times)
        let time = {
          hours: hours,
          minutes: minutes,
          seconds: seconds
          
        }
        console.log(time)
        setHowLong(howLong)
        setFinishedTime(times)
        let data = await axiosScript('post', '/api/timeClock/updateBlock', {time: time, times: times, job: props.job, task: props.task, id: props.id})
        console.log(data)
    }

      let handleStart = () => {
        props.startTimer()
        
        let date = new Date()
        if(!props.task) return alert('Please Select A Task')
        console.log(date)
        setStartTime(date)
        start()
        reset()
      }

      

      let handleStop = () => {
        let date = format(new Date(),  "h ':' m ':' s bbb")
        setEndTime(date)
        
        reset()
        pause()
        setFinished(true)
        updateTimeClock(startTime, date)
        props.endTimer()
      }



    return (
        <>
          <Button style={{borderRadius: '1000px', height:'300px', width:'300px', border:'15px solid gray', backgroundColor: isRunning ? 'red' : 'green', color: 'white'}} onClick={()=>{isRunning ? handleStop() : handleStart()}}><Typography variant='h3'>{isRunning ? 'Stop' : 'Start'}</Typography></Button>
          <Table style={{maxWidth:'50%'}}>
              <TableHead>
                  <TableRow>
                      <TableCell align='center'><Typography variant='h4'>Hours</Typography></TableCell>
                      <TableCell align='center'><Typography variant='h4'>Mins</Typography></TableCell>
                      <TableCell align='center'><Typography variant='h4'>Secs</Typography></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              <TableRow>
                      <TableCell align='center'><Typography variant='h4'>{hours}</Typography></TableCell>
                      <TableCell align='center'><Typography variant='h4'>{minutes}</Typography></TableCell>
                      <TableCell align='center'><Typography variant='h4'>{seconds}</Typography></TableCell>
                  </TableRow>
              </TableBody>
          </Table>
        </>
    )
}

{/* <Typography variant='h3'>{props.name}/{props.job}</Typography>
            <Box>Days/Hours/Minutes/Seconds</Box>
            <Box fontSize='100px'>
              {days}:{hours}:{minutes}:{seconds}
            </Box>
            <Typography>{isRunning ? 'Running' : 'Not running'}</Typography>
            {isRunning ? null : finished ? null : <Button onClick={()=>{handleStart()}}>Start</Button>}
            {!isRunning ? null : <Button variant='contained' onClick={()=>{handleStop()}} style={{width:'300px', height:'300px'}}>Finish</Button>}
            <Box>{finishedTime ? finishedTime : null}</Box>
            <Box>{howLong ? howLong : null}</Box> */}