import { Box } from "@material-ui/core";
import NavBar from "./navBar";
import {
    Route,
    Redirect
  } from "react-router-dom";
import CreateFolderTemplates from "./createFolderTemplates";
import CreateJob from "./createJob";
import CheckTimeSheets from "./checkTimeSheetsMain";
import JobManager from "./jobManager";
import AddPunch from "./addPunch";
import SideBar from "./sideBar";
import NewEmployee from "./Employees/newEmployee";
import ViewEmployees from "./Employees/viewEmployees";


export default function AdminMain () {

    return (
        <Box height='100vh' display='flex' flexDirection='column'>
            <NavBar/>
        <Box width='100vw' style={{flex: '1'}} display='flex' flexDirection='row'>
        <SideBar/>
        <Route path='/admin/accounts/newEmployee'>
            <NewEmployee/>
        </Route>
        <Route path='/admin/accounts/viewEmployees'>
            <ViewEmployees/>
        </Route>

        <Route path='/admin/folderTemplates'>
            <CreateFolderTemplates/>
        </Route>
        <Route path='/admin/createJobs'>
            <CreateJob/>
        </Route>
        <Route path='/admin/checkTimeSheet'>
            <CheckTimeSheets/>
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/admin/jobManager`}>
            <JobManager/>
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/admin/addPunch`}>
            <AddPunch/>
        </Route>
        </Box>
        </Box>
    )
}