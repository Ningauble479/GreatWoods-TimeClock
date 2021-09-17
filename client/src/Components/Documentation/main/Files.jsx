import { Box, Typography } from "@material-ui/core";
import FilesIMG from '../../../images/Documentation/FilesDoc.png'

export default function Files (){
    return (
        <Box display='flex' flex='1' flexDirection='column'>
            <Typography variant='h1'>Files</Typography>
            <img style={{maxWidth: '100%'}} src={FilesIMG}/>
            <Box mt={3}>
                <Typography variant='h4'>The files for the job your doing will appear here. Each folder corresponds to a certain task. Click into a folder to see the files inside. If theres an image for the task it will show there. Click that image to open it and display it on the screen.</Typography>
            </Box>
        </Box>
    )
}