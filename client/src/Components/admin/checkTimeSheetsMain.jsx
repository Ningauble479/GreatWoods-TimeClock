import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import axiosScript from '../../scripts/axiosScripts'



let CheckTimeSheets = () => {

    let [users, setUsers] = useState(null)
    let [days, setDays] = useState(null)
    let [name, setName] = useState(null)
    let getUsers = async () => {
        let {data} = await axiosScript('post', '/api/admin/getAccounts')
        console.log(data)
        setUsers(data.data)
    }

    let getTimeSheets = async (e) => {
        let {data} = await axiosScript('post', '/api/admin/getTimeSheets', {id: e.currentTarget.id})
        console.log(data.data)
        setDays(data.data.days)
        setName(data.data.user?.userName)
    } 

    useEffect(()=>{
        getUsers()
    },[])

    return (
        <Box>
            {!users ? null : users.map((row)=>{
                return (
                <Box>
                    <Button id={row._id} onClick={(e)=>{getTimeSheets(e)}}>{row.userName}</Button>
                    </Box>
                )
            })}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Job</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!days ? <div>Loading...</div> : days.map((row)=>{
                        return row.blocks.map((row2)=>{
                            return (
                                <TableRow>
                                    <TableCell>{!name ? 'Error No name found' : name}</TableCell>
                                    <TableCell>{row2.job}</TableCell>
                                    <TableCell>{row2.task}</TableCell>
                                    <TableCell>{`${row2.time.hours} : ${row2.time.minutes} : ${row2.time.seconds}`}</TableCell>
                                </TableRow>
                            )
                        })
                    })}
                </TableBody>
            </Table>
        </Box>
    )
}


export default CheckTimeSheets