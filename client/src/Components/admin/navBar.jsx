import { AppBar, Box, Toolbar, Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'
import LogoImg from '../../images/LogoLight.png'
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import Work from "@material-ui/icons/Work";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PeopleIcon from '@material-ui/icons/People';
import FolderIcon from '@material-ui/icons/Folder';
import BusinessIcon from '@material-ui/icons/Business';
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
            <Box pt={3} display='flex' justifyContent='space-around' alignItems='center' width='75%' height='100%'>
                <Box height='100%'>
                    <Link className='linkClean' to='/admin/accounts/newEmployee'><Box><PersonIcon style={{fontSize: '45px'}}/> <Typography variant='h5'> Workers </Typography></Box></Link>
                </Box>
                <Box height='100%'>
                    <Link className='linkClean' to='/admin/jobs/newJob'><Box><WorkIcon style={{fontSize: '45px'}}/> <Typography variant='h5'> Jobs </Typography></Box></Link>
                </Box>
                <Box height='100%'>
                    <Link className='linkClean' to='/admin/times/checkTimeSheets'><Box><AccessTimeIcon style={{fontSize: '45px'}}/><Typography variant='h5'> Time Sheets </Typography></Box></Link>
                </Box>
                <Box height='100%'>
                    <Link className='linkClean' to='/admin/clients/addClients'><Box><PeopleIcon style={{fontSize: '45px'}}/><Typography variant='h5'> Clients </Typography></Box></Link>
                </Box>
                <Box height='100%'>
                    <Link className='linkClean' to='/admin/files/uploadFiles'><Box><FolderIcon style={{fontSize: '45px'}}/><Typography variant='h5'> Files </Typography></Box></Link>
                </Box>
                <Box height='100%'>
                    <Link className='linkClean' to='/admin/thirdParties/createThirdParty'><Box><BusinessIcon style={{fontSize: '45px'}}/><Typography variant='h5'> Third Parties </Typography></Box></Link>
                </Box>
                
                {/* <Box>
                    <Link className='linkClean' to='/admin/checkTimeSheet'>Check Time Sheets</Link>
                </Box>
                <Box>
                    <Link className='linkClean' to='/admin/addPunch'>Add/Edit Punch</Link>
                </Box> */}
            </Box>
            <Button color="inherit" onClick={()=>{logOut()}}>Logout</Button>
          </Toolbar>
        </AppBar>
    )
}