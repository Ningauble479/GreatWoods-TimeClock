import { AppBar, Box, Toolbar, Button } from "@material-ui/core";
import { Link } from 'react-router-dom'
import LogoImg from '../../images/LogoLight.png'

export default function NavBar() {
    
    let logOut = async () => {
        localStorage.setItem('passcode', '0')
        window.location.reload()
    }
    return (
        <AppBar position="static">
          <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link className='linkClean' to='/main'>
                <Box width='100px'><img src={LogoImg} style={{maxWidth: '150px'}} /></Box> 
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
                <Box>
                    <Link className='linkClean' to='/admin/jobManager'>Manage Jobs</Link>
                </Box>
                <Box>
                    <Link className='linkClean' to='/admin/addPunch'>Add/Edit Punch</Link>
                </Box>
            </Box>
            <Button color="inherit" onClick={()=>{logOut()}}>Logout</Button>
          </Toolbar>
        </AppBar>
    )
}