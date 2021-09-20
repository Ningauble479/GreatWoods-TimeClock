import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { useState, useEffect } from 'react'
import axiosScript from '../../../scripts/axiosScripts'
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
        <Box flex='1' display='flex' justifyContent='center' pt={5} pb={5}>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <WorkIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>Manage Jobs</Typography>
            </Box>
            
            <Box width='90%' borderBottom='1px solid rgba(215, 215, 215, 1)' borderTop='1px solid rgba(215, 215, 215, 1)'>
            <Table>
                <TableHead>
                    <TableRow style={{backgroundColor: 'rgba(233, 234, 237, 1)'}}>
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
        </Box>
    )

}

export default JobManager