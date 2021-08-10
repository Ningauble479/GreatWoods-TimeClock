import { Box, Button, Typography } from '@material-ui/core'
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { format, formatDistanceToNowStrict } from 'date-fns'
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
        let times = `${format(startTime, "h ':' m ':' s bbb")} - ${timeEnd}`
        let howLong = formatDistanceToNowStrict(startTime)
        setHowLong(howLong)
        setFinishedTime(times)
        // let data = await axiosScript('post', '/api/timeClock/updateBlock', {time: time, times: times, job: job})
        console.log('test')
    }

      let handleStart = () => {
        let date = new Date()
        console.log(date)
        setStartTime(date)
        start()
      }

      

      let handleStop = () => {
        let date = format(new Date(),  "h ':' m ':' s bbb")
        setEndTime(date)
        pause()
        setFinished(true)
        updateTimeClock(startTime, date)
      }



    return (
        <Box pt={5} width={props.width} textAlign='center'>
            <Typography variant='h3'>{props.name}/{props.job}</Typography>
            <Box>Days/Hours/Minutes/Seconds</Box>
            <Box fontSize='100px'>
              {days}:{hours}:{minutes}:{seconds}
            </Box>
            <Typography>{isRunning ? 'Running' : 'Not running'}</Typography>
            {isRunning ? null : finished ? null : <Button onClick={()=>{handleStart()}}>Start</Button>}
            {!isRunning ? null : <Button variant='contained' onClick={()=>{handleStop()}} style={{width:'300px', height:'300px'}}>Finish</Button>}
            <Box>{finishedTime ? finishedTime : null}</Box>
            <Box>{howLong ? howLong : null}</Box>
        </Box>
    )
}