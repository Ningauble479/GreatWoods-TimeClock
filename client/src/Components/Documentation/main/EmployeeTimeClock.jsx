import { Box, Typography } from "@material-ui/core";
import TimeClockDoc from '../../../images/Documentation/TimeClockDoc.png'

export default function TimeClock (){
    return (
        <Box display='flex' flex='1' flexDirection='column'>
            <Typography variant='h1'>Time Clock</Typography>
            <img style={{maxWidth: '100%'}} src={TimeClockDoc}/>
            <Box mt={3} mb={5}>
                <Typography variant='h4'>This is the clock in/clock out section. To clock in for the day press CLOCK IN. It will turn green and record your time letting you know that you are clocked in and showing when you did. A clock has also been added for convenience.</Typography>
            </Box>
        </Box>
    )
}