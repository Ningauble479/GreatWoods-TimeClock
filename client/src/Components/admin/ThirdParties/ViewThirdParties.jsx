import { Box, Table, TableHead, TableRow, TableCell, TableBody, Typography, Collapse } from "@material-ui/core";
import { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import axiosScript from '../../../scripts/axiosScripts'
import BusinessIcon from '@material-ui/icons/Business';
import { Link } from 'react-router-dom'
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

export default function ViewThirdParties () {
    let [open, setOpen] = useState(false)
    let [alert, setAlert] = useState(null)
    let [aType, setAType] = useState(null)
    let [thirdParties, setThirdParties] = useState(null)

    let alertLogic = (message, type) => {
        setAlert(message)
        setAType(type)
        setOpen(true)
        setTimeout(()=>{setOpen(false)},3000)
    }

    let getThirdParties = async () => {
        let {data} = await axiosScript('post', '/api/admin/getThirdParty')
        console.log(data)
        setThirdParties(data.data)
    }

    useEffect(()=>{
        console.log('Get your data here')
        getThirdParties()
    },[])

    return (
        <Box flex='1'>
            <Collapse in={open} style={{position: 'fixed', top:'0', left: '0', width: '100%', zIndex: '1100'}}>
                <Alert severity={!aType ? 'success' : aType}>{alert}</Alert>
            </Collapse>
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' pl={5} pt={3} pb={3} borderBottom='1px solid gray'>
                <BusinessIcon style={{fontSize: '52px', marginRight: '15px'}}/><Typography variant='h5'>View Third Parties</Typography>
            </Box>
            <Box display='flex' justifyContent='center' width='100%' mt={5}>
            <Table style={{width: '90%', borderBottom:'1px solid rgba(215, 215, 215, 1)', borderTop:'1px solid rgba(215, 215, 215, 1)'}}>
                <TableHead style={{backgroundColor: 'rgba(233, 234, 237, 1)'}}>
                    <TableRow>
                        <TableCell>
                            Company
                        </TableCell>
                        <TableCell>
                            Address
                        </TableCell>
                        <TableCell>
                            Email
                        </TableCell>
                        <TableCell>
                            Phone
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !thirdParties ? null : thirdParties.map((row) => {
                            return (
                                <TableRow className='tableRow'>
                                    <TableCell>{row.company}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell><Link className='linkClean' to={`/admin/thirdParties/thirdPartyProfile/${row._id}`}><RemoveRedEye/></Link></TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
            </Box>
        </Box>
    )
}