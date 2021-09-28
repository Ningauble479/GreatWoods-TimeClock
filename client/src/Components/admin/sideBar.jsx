import { Box } from "@material-ui/core";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

let workersList = [{
    name: 'Add New Employee',
    link: 'newEmployee'
    },
    {  
    name: 'View Employees',
    link: 'viewEmployees'
    }]

let jobsList = [
    {
        name: 'New Job',
        link: 'newJob'
    },
    {
        name: 'Manage Jobs',
        link: 'manageJobs'
    },
    {
        name: 'New Template',
        link: 'createTemplate'
    }
    // {
    //     name: 'Assign Jobs',
    //     link: 'assignJobs'
    // }
]

let timeSheets = [
    {
        name: 'Check Time Sheets',
        link: 'checkTimeSheets'
    },
    {
        name: 'Add Punch',
        link: 'addPunch'
    },
    {
        name: 'View Clocked Hours',
        link: 'clockedHours'
    }
]

let clients = [
    {
        name: 'Add Clients',
        link: 'addClients'
    },
    {
        name: 'View Clients',
        link: 'viewClients'
    }
]

let files = [
    {
        name: 'Upload Files',
        link: 'uploadFiles'
    },
    {
        name: 'View Files',
        link: 'viewFiles'
    }
]

let thirdParties = [
    {
        name: 'Add Third Party',
        link: 'createThirdParty'
    },
    {
        name: 'View Third Parties',
        link: 'viewThirdParties'
    }
]

export default function SideBar (){
    let [sideBarList, setSideBarList] = useState(null)
    let [mainLink, setMainLink] = useState(null)

    let CheckTimes = () => {
        let url = window.location.href
        console.log('hello')
        if(url.includes('accounts')){
        setMainLink('accounts')
        setSideBarList(workersList)}
        else if(url.includes('jobs')){
        setMainLink('jobs')
        setSideBarList(jobsList)
        }
        else if(url.includes('times')){
        setMainLink('times')
        setSideBarList(timeSheets)
        }
        else if(url.includes('clients')){
        setMainLink('clients')
        setSideBarList(clients)
        }
        else if(url.includes('files')){
            setMainLink('files')
            setSideBarList(files)
        }
        else if(url.includes('thirdParties')){
            setMainLink('thirdParties')
            setSideBarList(thirdParties)
        }
        else {
            setMainLink(null)
            setSideBarList(null)
        }
        
    }

    useEffect(()=>{
        setInterval( CheckTimes, 500 )
    },[])
    
    return (
        <Box display='flex' flexDirection='column' maxWidth='15vw' minWidth='15vw' pt={5} borderRight='1px solid black' style={{flex: '1'}}>
            {!sideBarList ? <div>loading...</div> : !mainLink ? <div>loading...</div> : sideBarList.map((row,i)=>{
                return (<Link to={`/admin/${mainLink}/${row.link}`} className='linkClean'><Box className='sideBarLink' width='100%' height='50px' display='flex' justifyContent='center' alignItems='center'>{row.name}</Box></Link>)
            })}
        </Box>
    )
}