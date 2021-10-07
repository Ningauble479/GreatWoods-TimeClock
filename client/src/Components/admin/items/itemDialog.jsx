import { Box, Typography, TextField, Button, Dialog } from "@material-ui/core";
import { useEffect, useState } from "react";
import axiosScript from "../../../scripts/axiosScripts";



export default function ItemDialog(props) {
    let [item, setItem] = useState(props.item)
    let [tagControl, setTagControl] = useState(null)
    let [edited, setEdited] = useState(null)
    let [skuErr, setSkuErr] = useState(false)
    let addTag = (e) => {
        if(!tagControl || tagControl === '') return alert('Please Type In A Tag')
        if(Array.isArray(item.tags)){
            if(item.tags.includes(tagControl)) return alert('This item already has that tag')
            console.log('huh')
            setItem({...item, tags: [...item.tags, tagControl]})
            setTagControl('')
            return
        }
        setItem({...item, tags: [tagControl]})
        setTagControl('')
    }
    
    let checkSKU = async (e) => {
        let {data} = await axiosScript('post', '/api/admin/getItem', {search: {sku: e.target.value}}) 
        console.log(data.data.length)
        if(data.data.length > 0)return setSkuErr(true)
        setSkuErr(false)
    }

    useEffect(()=>{
        console.log('change')
        setItem(props.item)
    },[props.open])
    return (
        <Dialog open={props.open} onClose={()=>{
            console.log(skuErr)
            props.onClose(item, skuErr)}}>
            {!item ? <div>Error Item Did Not Load Try Again</div> : (
            <Box display='flex' flexDirection='column' alignItems='center' minWidth='30vw' minHeight='70vh' bgcolor='white'>
            <Box color='white' bgcolor='rgb(36, 37, 38)' width='100%' display='flex' justifyContent='center' alignItems='center' height='75px' mb={5}><Typography variant='h3'>{!item.name ? 'Loading...' : item.name}</Typography></Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Details:</Typography></Box>
                <TextField label='description' value={item.details} onChange={(e)=>setItem({...item, details: e.target.value})}/>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Tags:</Typography></Box>
                <Box width='35%' display='flex' justifyContent='center' alignItems='center'>
                    <TextField value={tagControl} onKeyUp={(e)=>e.key === 'Enter' ? addTag() : null} onChange={(e)=>setTagControl(e.target.value)} label='Tag'/>
                    <Button variant='contained' onClick={()=>addTag()}>+</Button>
                </Box>
            </Box>
            <Box pt={3} pb={3} display='flex' justifyContent='space-around' width='75%' flexWrap='wrap'>
                {!item.tags ? 'Please add some tags' : item.tags.map((row)=>{
                    return (
                        <Box display='flex' justifyContent='space-around' alignItems='center' minWidth='100px' minHeight='25px' bgcolor='#5184d3' style={{borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px'}}>
                            <Box minWidth='25%' maxWidth='25%'><Box width='10px' height='10px' bgcolor='white' borderRadius='100%' position='relative' left='28'></Box></Box>
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
                <TextField label='Additional Info (Inhouse)' value={item.additionalInfo} onChange={(e)=>setItem({...item, additionalInfo: e.target.value})}/>
            </Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>SKU:</Typography></Box>
                <TextField label='SKU' error={skuErr} helperText={skuErr ? 'This SKU already Exists' : null} value={item.sku} onChange={(e)=>{
                    checkSKU(e)
                    setItem({...item, sku: e.target.value})}}/>
            </Box>
            <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                <Box width='50%'><Typography variant='h5'>Cost:</Typography></Box>
                <TextField type={'number'} label="Cost" inputProps={{step: "1"}} value={item.cost} onChange={(e)=>setItem({...item, cost: parseFloat(e.target.value)})}/>
            </Box>
        </Box>
            )}
            <Button variant='outlined' onClick={()=>props.updateItem(item.tags, item, skuErr)}>Save</Button>
    </Dialog>
    )

}