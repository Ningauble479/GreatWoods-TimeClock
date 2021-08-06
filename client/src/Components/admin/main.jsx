import { Box } from "@material-ui/core";
import NavBar from "./navBar";
import {
    Route,
    Redirect
  } from "react-router-dom";
import CreateAccount from "./createAccounts";
import CreateFolderTemplates from "./createFolderTemplates";
import CreateJob from "./createJob";


export default function AdminMain () {
    return (
        <Box>
            <NavBar/>
        <Route path='/admin/createAccount'>
            <CreateAccount/>
        </Route>
        <Route path='/admin/folderTemplates'>
            <CreateFolderTemplates/>
        </Route>
        <Route path='/admin/createJobs'>
            <CreateJob/>
        </Route>
        </Box>
    )
}