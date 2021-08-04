import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'


export default function NavBar() {
    return (
        <AppBar position="static">
          <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link className='linkClean' to='/main'><Typography variant="h6" >
              GreatWoods Cabinetry
            </Typography> 
            </Link>
            <Box display='flex' justifyContent='space-around' width='75%' height='100%'>
                <Box border='1px solid black' height='100%'>
                    <Link className='linkClean' to='/admin/createAccount'>Add A Worker</Link>
                </Box>
                <Box>
                    <Link className='linkClean' to='/admin/folderTemplates'>Create Folder Templates</Link>
                </Box>
                <Box>
                    <Link className='linkClean' to='/admin/createJobs'>Create New Job</Link>
                </Box>
                <Box>
                    <Link className='linkClean' to='/admin/checkTimeSheet'>Check Time Sheets</Link>
                </Box>
            </Box>
            <Link to='login' className='linkClean' color="inherit">Logout</Link>
          </Toolbar>
        </AppBar>
    )
}