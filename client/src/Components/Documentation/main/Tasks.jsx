import { Box, Typography } from "@material-ui/core";
import TasksIMG from '../../../images/Documentation/TasksDoc.png'

export default function Tasks (){
    return (
        <Box display='flex' flex='1' flexDirection='column'>
            <Typography variant='h1'>Tasks</Typography>
            <img style={{maxWidth: '100%'}} src={TasksIMG}/>
            <Box mt={3} mb={5} pr={3}>
                <Typography variant='h4'>The time clock section is for keeping track of how long specific jobs take. Please note these times are clocked seperately from your main clock in/clock out times.</Typography>
            </Box>
        </Box>
    )
}