import { Box } from "@material-ui/core";
import NavBar from "./navBar";
import {
    Route,
    Redirect
  } from "react-router-dom";
import CreateFolderTemplates from "./createFolderTemplates";
import CreateJob from "./Jobs/createJob";
import ManageJobs from "./Jobs/manageJobs";
import CheckTimeSheets from "./TimeSheets/checkTimeSheets";
import AddPunch from "./TimeSheets/AddPunch";
import SideBar from "./sideBar";
import NewEmployee from "./Employees/newEmployee";
import ViewEmployees from "./Employees/viewEmployees";
import ClockedHours from "./TimeSheets/ClockedHours";
import CreateTemplate from './Jobs/createTemplate'
import AddClient from "./Clients/AddClient";
import ViewClient from "./Clients/viewClients";
import ClientProfile from './Clients/clientProfile'
import JobProfile from "./Jobs/jobProfile";
import EmployeeProfile from "./Employees/EmployeeProfile";
import UploadFiles from "./Files/UploadFiles";
import ViewFiles from "./Files/ViewFiles";
export default function AdminMain () {

    return (
        <Box height='100vh' display='flex' flexDirection='column'>
            <NavBar/>
        <Box style={{flex: '1'}} display='flex' flexDirection='row'>
        <SideBar/>
        <Route exact path='/admin'>
            <Redirect to='/admin/accounts/newEmployee'/>
        </Route>

        {/* Admin Panel Account Routes */}
        <Route exact path='/admin/accounts'>
            <Redirect to='/admin/accounts/newEmployee'/>
        </Route>
        <Route path='/admin/accounts/newEmployee'>
            <NewEmployee/>
        </Route>
        <Route path='/admin/accounts/viewEmployees'>
            <ViewEmployees/>
        </Route>
        <Route path='/admin/accounts/employeeProfile/:id'>
            <EmployeeProfile/>
        </Route>

        {/* Admin Panel Job Routes */}
        <Route exact path='/admin/jobs'>
            <Redirect to='/admin/jobs/newJob'/>
        </Route>
        <Route path='/admin/jobs/newJob'>
            <CreateJob/>
        </Route>
        <Route path='/admin/jobs/manageJobs'>
            <ManageJobs test2={'test2'} test={()=>console.log('tessst')}/>
        </Route>
        <Route path='/admin/jobs/createTemplate'>
            <CreateTemplate/>
        </Route>
        <Route path='/admin/jobs/jobProfile/:id'>
            <JobProfile/>    
        </Route>

        {/* Admin Panel Time Management Routes */}
        <Route exact path='/admin/times'>
            <Redirect to='/admin/times/checkTimeSheets'/>
        </Route>
        <Route path='/admin/times/checkTimeSheets'>
            <CheckTimeSheets/>
        </Route>
        <Route path='/admin/times/addPunch'>
            <AddPunch/>
        </Route>
        <Route path='/admin/times/clockedHours'>
            <ClockedHours/>
        </Route>

        {/* Admin Panel Client Routes */}
        <Route exact path='/admin/clients'>
            <Redirect to='/admin/clients/addClients'/>
        </Route>
        <Route path='/admin/clients/addClients'>
            <AddClient/>
        </Route>
        <Route path='/admin/clients/viewClients'>
            <ViewClient/>
        </Route>
        <Route path='/admin/clients/clientProfile/:id'>
            <ClientProfile/>    
        </Route>

        {/* Admin Panel Files Routes */}
        <Route exact path='/admin/files'>
            <Redirect to='/admin/files/uploadFiles'/>
        </Route>
        <Route path='/admin/files/uploadFiles'>
            <UploadFiles/>
        </Route>
        <Route path='/admin/files/viewFiles'>
            <ViewFiles/>
        </Route>

        
        <Route path={`${process.env.PUBLIC_URL}/admin/addPunch`}>
            <AddPunch/>
        </Route>
        </Box>
        </Box>
    )
}