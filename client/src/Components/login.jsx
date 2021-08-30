import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import axiosScript from "../scripts/axiosScripts";



export default function Login () {
    let [passcode, setPass] = useState(null)

    let setPasscode = async (level) => {
        let {data} = await axiosScript('post', '/api/verify/verifyCode', {passcode: passcode, level: level})
        if(data.success){
            localStorage.setItem('passcode', passcode)
            localStorage.setItem('level', data.level)
            window.location.reload()
        }
    }
    return (
        <Box>
            <TextField id="filled-basic" label="Password" variant="filled" onChange={(e)=>{setPass(e.target.value)}} />
            <Button onClick={()=>{setPasscode('admin')}}>Admin</Button>
            <Button onClick={()=>{setPasscode('floor')}}>Floor</Button>
        </Box>
    )
} 