import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const links = ['main/nameChooser', 'main/employeeTimeClock', 'main/Jobs', 'main/Tasks', 'main/Files', 'admin/']

function SideBarLink(props){
    return (
        <Link className='linkClean' to={`/documentation/${props.link}`}><Box width='100%' height='35px'>{props.link}</Box></Link>
    )
}

export default function SideBar() {
    return (
        <Box width='20%' borderRight='1px solid black' display='flex' flexDirection='column' pt={1}>
            <Box mb={5}><Typography variant='h2'>Topics</Typography></Box>
            {links.map((row)=>{return <SideBarLink link={row}/>})}
        </Box>
    )
} 