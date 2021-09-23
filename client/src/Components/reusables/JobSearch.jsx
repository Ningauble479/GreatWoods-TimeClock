
import { useState, useRef, useEffect } from 'react'
import axiosScript from '../../scripts/axiosScripts'
import { Box, TextField } from '@material-ui/core'


export default function JobSearch(props) {

    const ref = useRef(null)
    const wrapperRef = useRef(null)

    let [ jobSearch, setJobSearch ] = useState(null)
    let [ jobs, setJobs ] = useState([])
    let [ isMenuOpen, setIsMenuOpen ] = useState(false)
    let [ timer, setTimer ] = useState(false)
    let [ maxHeight, setMaxHeight] = useState(100)

    let searchJobs = async (searchname) => {
        
        setJobSearch(searchname)
        clearTimeout(timer)
        if(!searchname || searchname === '') return setIsMenuOpen(false)
        let timeout = setTimeout(async ()=>{
            let searchArray = searchname.split(" ")
            let regex = searchArray.join("|")
            
            let search = {jobName: {'$regex' : regex, '$options' : 'i'}}
            let { data } = await axiosScript('post', '/api/admin/getJobs', { args: search})
            
            setIsMenuOpen(true)
            setJobs(data.data)
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
            <div className="wrapper" ref={ref} style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}><TextField value={jobSearch} style={{ width: '100%' }} id="filled-basic" label={props.placeHolder} onClick={() => { setIsMenuOpen(oldState => !oldState) }} onChange={(e) => { searchJobs(e.target.value) }} /></div>
            <Box display={!("withBox" in props) ? 'none' : isMenuOpen ? 'flex' : 'none'} flexDirection='column' width='100%' top='366px' zIndex='9999' bgcolor='white' border='1px solid black'>
                {!jobs ? null : !jobs[0] ? null : jobs.map((row, i) => {
                    if (i > 4) return null
                    return <Box width='100%' className='dropdownRow' onClick={() => {
                        let propsNames = Object.values(props)
                        propsNames[1](row)
                        setIsMenuOpen(false)
                        setJobSearch(row.jobName)
                    }}>{row.jobName}</Box>
                })}</Box>
        </Box>)

}