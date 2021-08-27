import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { useState, useEffect } from 'react'
import axiosScript from '../../scripts/axiosScripts'
import JobRow from './jobRow'


function JobManager ()  {

    let [jobs, setJobs] = useState(null)

    const getJobs = async (e) => {
        let search = null
        if(e){search = {active: e.target.value}}
        let {data} = await axiosScript('post', '/api/admin/getJobs', {query: search})
        console.log(data)
        setJobs(data.data)
    }

    let finishJob = async (e) => {
        console.log(e.currentTarget.value)
        let data = await axiosScript('post', '/api/admin/updateJobs', {id: e.currentTarget.value, update: {$set: {active: false}}})
        console.log(data)
    }

    let reactiveJob = async (e) => {
        console.log(e.currentTarget.value)
        let data = await axiosScript('post', '/api/admin/updateJobs', {id: e.currentTarget.value ,update: {$set: {active: true}}})
        console.log(data)
    }

    useEffect(()=>{
        getJobs()
    },[])


    return (
        <Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Job Name</TableCell>
                        <TableCell>Active?</TableCell>
                        <TableCell>Finish Job</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!jobs ? 'Loading...' : jobs.map((row)=>{
                        console.log(row)
                        return(
                        <JobRow row={row} finishJob={(e)=>finishJob(e)} reactiveJob={(e)=>reactiveJob(e)} />
                        )
                        })}
                </TableBody>
            </Table>
        </Box>
    )

}

export default JobManager