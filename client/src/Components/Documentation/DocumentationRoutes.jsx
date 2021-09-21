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
import TimeSheetChecker from './admin/TimeSheetChecker'
import AdminPDF from '../../images/Documentation/admin/AdminDocs.pdf'
// import MJPDF from '../../images/Documentation/admin/manageJobs'

export default function DocumentationRoutes (){
    return (
        <Box maxHeight='100vh' width='100vw' display='flex' flexDirection='column' style={{overflowX: 'hidden'}}>
            <Link className='linkClean' to='/main'><Box width='100vw' height='10vh' borderBottom='1px solid black' display='flex' justifyContent='flex-start' alignItems='center' pl={5}><Typography variant='h2'>Time Clock</Typography></Box></Link>
            <Box display='flex' flexDirection='row' flex='1' maxWidth='100vw' >
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

                <Route path='/documentation/admin/timeSheetChecker'>
                    <TimeSheetChecker pdf={AdminPDF} page={1}/>
                </Route>
                <Route path='/documentation/admin/manageJobs'>
                    <TimeSheetChecker pdf={AdminPDF} page={2}/>
                </Route>
                <Route path='/documentation/admin/addEmployee'>
                    <TimeSheetChecker pdf={AdminPDF} page={3}/>
                </Route>
                <Route path='/documentation/admin/addJob'>
                    <TimeSheetChecker pdf={AdminPDF} page={4}/>
                </Route>
                <Route path='/documentation/admin/timePunch'>
                    <TimeSheetChecker pdf={AdminPDF} page={5}/>
                </Route>
                <Route path='/documentation/admin/clockedHours'>
                    <TimeSheetChecker pdf={AdminPDF} page={6}/>
                </Route>
                <Route path='/documentation/admin/viewEmployees'>
                    <TimeSheetChecker pdf={AdminPDF} page={7}/>
                </Route>
                <Route path='/documentation/admin/templates'>
                    <TimeSheetChecker pdf={AdminPDF} page={8}/>
                </Route>
            </Box>
        </Box>
    )
}