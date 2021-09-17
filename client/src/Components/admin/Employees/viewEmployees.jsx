import { Box, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import axios from '../../../scripts/axiosScripts'
import { useEffect, useState } from "react";

export default function ViewEmployees() {
    let [workers, setWorkers] = useState(null)

    const getWorkers = async () => {
        let {data} = await axios('post', '/api/admin/getAccounts')
        console.log(data)
        setWorkers(data.data)
    }

    useEffect(()=>{
        getWorkers()
    },[])

    return (
        <Box style={{ flex: '1' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Title
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !workers ? null : workers.map((row) => {
                            return (
                                <TableRow>
                                    <TableCell>{row.userName}</TableCell>
                                    <TableCell>{row.jobTitle}</TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </Box>
    )
}