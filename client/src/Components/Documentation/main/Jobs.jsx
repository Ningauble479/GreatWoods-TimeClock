import { Box, Typography } from "@material-ui/core";
import JobsIMG from '../../../images/Documentation/Jobs.png'

export default function Jobs (){
    return (
        <Box display='flex' flex='1' flexDirection='column'>
            <Typography variant='h1'>Jobs</Typography>
            <img style={{maxWidth: '100%'}} src={JobsIMG}/>
            <Box mt={3}>
                <Typography variant='h4'>This section is for selecting the Job your currently on. To switch jobs please finish your current task timer.</Typography>
            </Box>
        </Box>
    )
}