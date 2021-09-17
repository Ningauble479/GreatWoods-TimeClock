import { Box, Typography } from '@material-ui/core'
import NameChooser from './main/nameChooser'
import EmployeeTimeClock from './main/EmployeeTimeClock'
import SideBar from './SideBar'
import {
    Route,
    Redirect,
    Link
  } from "react-router-dom";
import Jobs from './main/Jobs';
import Tasks from './main/Tasks';
import Files from './main/Files';

export default function DocumentationRoutes (){
    return (
        <Box minHeight='100vh' width='100vw' display='flex' flexDirection='column' style={{overflowX: 'hidden'}}>
            <Link className='linkClean' to='/main'><Box width='100vw' height='10vh' borderBottom='1px solid black' display='flex' justifyContent='flex-start' alignItems='center' pl={5}><Typography variant='h2'>Time Clock</Typography></Box></Link>
            <Box display='flex' flexDirection='row' flex='1'>
                <SideBar/>
                <Route path='/documentation/main/nameChooser'>
                    <NameChooser/>
                </Route>
                <Route path='/documentation/main/employeeTimeClock'>
                    <EmployeeTimeClock/>
                </Route>
                <Route path='/documentation/main/Jobs'>
                    <Jobs/>
                </Route>
                <Route path='/documentation/main/Tasks'>
                    <Tasks/>
                </Route>
                <Route path='/documentation/main/Files'>
                    <Files/>
                </Route>
            </Box>
        </Box>
    )
}