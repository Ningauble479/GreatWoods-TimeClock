import { Box, Typography } from '@material-ui/core'
import DocPic from '../../../images/Documentation/NameSelectionDoc.png'

export default function NameChooser() {
    return(
        <Box flex='1' display='flex' flexDirection='column'>
            <Typography variant='h1'>Name Chooser</Typography>
            <img style={{maxWidth: '100%'}} src={DocPic}/>
            <Box mt={3}>
                <Typography variant='h4'>This section is for selecting your name so the system knows who to track. You can swipe left and right to see more names. If your name doesnt appear here please contact your manager. Note accounts set as office or admin wont appear on this list.</Typography>
            </Box>
        </Box>
    )
}