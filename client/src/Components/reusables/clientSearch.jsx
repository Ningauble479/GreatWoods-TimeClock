
import { useState, useRef, useEffect } from 'react'
import axiosScript from '../../scripts/axiosScripts'
import { Box, TextField } from '@material-ui/core'


export default function ClientSearch(props) {

    const ref = useRef(null)
    const wrapperRef = useRef(null)

    let [ clientSearch, setClientSearch ] = useState(null)
    let [ clients, setClients ] = useState([])
    let [ isMenuOpen, setIsMenuOpen ] = useState(false)
    let [ timer, setTimer ] = useState(false)
    let [ maxHeight, setMaxHeight] = useState(100)

    let searchClients = async (searchname) => {
        
        setClientSearch(searchname)
        clearTimeout(timer)
        if(!searchname || searchname === '') return setIsMenuOpen(false)
        let timeout = setTimeout(async ()=>{
            
            let searchArray = searchname.split(" ")
            console.log(searchArray)
            let search = null
            if(searchArray.length===1){search = {$or: [{firstname: {"$regex": searchArray[0], "$options": "i" }}, {lastname: {"$regex": searchArray[0], "$options": "i"}}]}}
            if(searchArray.length===2){search = {$or: [{firstname: {"$regex": searchArray[0], "$options": "i" }}, {lastname: {"$regex": searchArray[0], "$options": "i"}}, {firstname: {"$regex": searchArray[1], "$options": "i"}}, {lastname: {"$regex": searchArray[1], "$options": "i"}}]}}
            let { data } = await axiosScript('post', '/api/admin/getClients', { search: search})
            
            setIsMenuOpen(true)
            setClients(data.data)
            if("callBack" in props){
                props.callBack(data.data)
            }
        },500)
        setTimer(timeout)


    }

    useEffect(()=>{
        if(ref.current){
            setMaxHeight(ref.current.clientHeight)
            }
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isMenuOpen && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setTimeout(()=>{setIsMenuOpen(false)},100)
            }
          }
      
          document.addEventListener("mousedown", checkIfClickedOutside)
      
          return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
          }

    },[])

    return (
        <Box width='100%' display='flex' flexDirection='column' alignItems='flex-end' maxHeight={maxHeight}>
            <div className="wrapper" ref={ref} style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}><TextField value={clientSearch} style={{ width: '100%' }} id="filled-basic" label="Client" onClick={() => { setIsMenuOpen(oldState => !oldState) }} onChange={(e) => { searchClients(e.target.value) }} /></div>
            <Box display={!("withBox" in props) ? 'none' : isMenuOpen ? 'flex' : 'none'} flexDirection='column' width='100%' top='366px' zIndex='9999' bgcolor='white' border='1px solid black'>
                {!clients ? null : !clients[0] ? null : clients.map((row, i) => {
                    if (i > 4) return null
                    return <Box width='100%' className='dropdownRow' onClick={() => {
                        props.selectClient(row)
                        setIsMenuOpen(false)
                        setClientSearch(`${row.firstname} ${row.lastname}`)
                    }}>{row.firstname} {row.lastname}</Box>
                })}</Box>
        </Box>)

}