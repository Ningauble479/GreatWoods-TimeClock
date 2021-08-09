import { Box, Button, Typography } from '@material-ui/core'
import { useStopwatch } from 'react-timer-hook';

export default function Timer (props) {

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });


    return (
        <Box pt={5} width={props.width} textAlign='center'>
            <Typography variant='h3'>{props.name}/{props.job}</Typography>
            <Box>Days/Hours/Minutes/Seconds</Box>
            <Box fontSize='100px'>
              {days}:{hours}:{minutes}:{seconds}
            </Box>
            <Typography>{isRunning ? 'Running' : 'Not running'}</Typography>
            <Button onClick={start}>Start</Button>
            <Button onClick={pause}>Pause</Button>
            <Button onClick={reset}>Reset</Button>
        </Box>
    )
}