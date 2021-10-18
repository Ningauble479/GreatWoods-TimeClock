import { Box, Collapse, Typography, TableCell, Table, TableHead, TableBody, TableRow } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import WorkIcon from '@material-ui/icons/Work';
import AllInbox from '@material-ui/icons/AllInbox';
import { Link, useLocation } from 'react-router-dom'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import { format, parseISO } from 'date-fns';

export default function ViewItems () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [alertTimer, setAlertTimer] = useState(null)
    let [items, setItems] = useState(null)

    let location = useLocation()

    let alertLogic = (message, type, time) => {
        clearTimeout(alertTimer)
        setAlert(message)
        setAType(type)
        setOpen(true)
        setAlertTimer(setTimeout(() => { setOpen(false) }, time))
    }

    let getItems = async () => {
        let { data } = await axiosScript('post', '/api/admin/getItem')
        setItems(data.data)
    }

    let cleanDate = (date) => {
        let parsed = parseISO(date)
        return format(parsed, 'EEEE MMMM do yyyy')
    }

    let checkLocation = async () => {
        console.log(location)
    }

    useEffect(()=>{
        console.log('Get your data here')
        getItems()
        checkLocation()
    },[])

    return (
        <Box flex='1'>
            <Collapse in={open}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <AllInbox style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>View Items</Typography>
            </Box>
            <Box flex='1' pl={5} pr={5} display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                {/* <ClientSearch callBack={(client)=>searchClients(client)}/> */}
                <Table style={{width:'70%'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Recieved</TableCell>
                            <TableCell>inStock</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !items ? <TableRow style={{width: '100%'}}><TableCell>Loading...</TableCell></TableRow> : items.map((row)=>{
                            return (<TableRow>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{!row.tags ? 'No Tags Added' : row.tags.length<1 ? 'No Tags Added' : row.tags.map((tag, i)=>{
                                if(i>2)return null
                                return <Box>{tag}</Box>
                            })}</TableCell>
                            <TableCell>{row.dateRecieved ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{row.inStock ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{`$${row.cost}`}</TableCell>
                            <TableCell>{row.sku} </TableCell>
                            <TableCell><Link to={`/admin/inventory/itemProfile/${row._id}`}><RemoveRedEyeIcon/></Link></TableCell>
                        </TableRow>)})}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}