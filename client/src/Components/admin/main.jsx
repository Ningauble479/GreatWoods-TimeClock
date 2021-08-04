import { Box } from "@material-ui/core";
import NavBar from "./navBar";
import {
    Route,
    Redirect
  } from "react-router-dom";
import CreateAccount from "./createAccounts";
import CreateFolderTemplates from "./createFolderTemplates";


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
        </Box>
    )
}