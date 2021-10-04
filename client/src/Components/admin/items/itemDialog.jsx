import { Box, Typography, TextField, Button, Dialog } from "@material-ui/core";
import { useEffect, useState } from "react";



export default function ItemDialog(props) {
    let [item, setItem] = useState(props.item)
    let [tags, setTags] = useState(null)
    let [tagControl, setTagControl] = useState(null)
    let addTag = (e) => {
        if(!tagControl || tagControl === '') return alert('Please Type In A Tag')
        if(Array.isArray(tags)){
            if(tags.includes(tagControl)) return alert('This item already has that tag')
            console.log('huh')
            setTags([...tags, tagControl])
            setTagControl('')
            return
        }
        setTags([tagControl])
        setTagControl('')
    }

    useEffect(()=>{
        console.log('change')
        setItem(props.item)
    },[props.open])
    return (
        <Dialog open={props.open} onClose={(e)=>props.onClose(e)}>
            {!item ? <div>Error Item Did Not Load Try Again</div> : (
                <Box pt={5} display='flex' flexDirection='column' alignItems='center' minWidth='30vw' minHeight='70vh' bgcolor='white'>
            <Typography variant='h3'>{!item.name ? 'Loading...' : item.name}</Typography>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Details:</Typography></Box>
                <TextField label='description'/>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Tags:</Typography></Box>
                <Box width='35%' display='flex' justifyContent='center' alignItems='center'>
                    <TextField value={tagControl} onChange={(e)=>setTagControl(e.target.value)} label='Tag'/>
                    <Button variant='contained' onClick={()=>addTag()}>+</Button>
                </Box>
            </Box>
            <Box pt={3} pb={3} display='flex' justifyContent='space-around' width='75%' flexWrap='wrap'>
                {!tags ? 'Please add some tags' : tags.map((row)=>{
                    return (
                        <Box display='flex' justifyContent='space-around' alignItems='center' minWidth='100px' minHeight='25px' bgcolor='#5184d3' style={{borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px'}}>
                            <Box width='25%'><Box width='10px' height='10px' bgcolor='white' borderRadius='100%'></Box></Box>
                            #{row}
                        </Box>
                    )
                })}
            </Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Sold To:</Typography></Box>
                <TextField label='Customer'/>
            </Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Additional Info (Inhouse):</Typography></Box>
                <TextField label='Additional Info (Inhouse)'/>
            </Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>SKU:</Typography></Box>
                <TextField label='SKU'/>
            </Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Cost:</Typography></Box>
                <TextField label='cost'/>
            </Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Tax:</Typography></Box>
                <TextField label='tax'/>
            </Box>
            <Box pt={3} pb={3}  display='flex' justifyContent='space-around' width='100%'>
                <Button variant='contained'>Percent</Button>
                <Button variant='contained'>Exact</Button>
            </Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Total:</Typography></Box>
                $100.51
            </Box>
        </Box>
            )}
            
    </Dialog>
    )

}