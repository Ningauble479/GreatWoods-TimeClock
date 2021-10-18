import { Box, Typography, TextField, Button, Dialog, Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";
import axiosScript from "../../../scripts/axiosScripts";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';


export default function MultiItemDialog(props) {
    let [item, setItem] = useState({
                name: null,
                details: null,
                purchaseID: null,
                soldTo: null,
                additionalInfo: null,
                dateEntered: new Date(),
                inStock: false,
                cost: null,
                sku: null,
                tags: [],
                index: 0,
    })
    let [tagControl, setTagControl] = useState(null)
    let [edited, setEdited] = useState(null)
    let [skuErr, setSkuErr] = useState(false)
    let [lastSKU, setLastSKU] = useState(0)
    let [baseSKU, setBaseSKU] = useState(null)
    let addTag = (e) => {
        if (!tagControl || tagControl === '') return alert('Please Type In A Tag')
        if (Array.isArray(item.tags)) {
            if (item.tags.includes(tagControl)) return alert('This item already has that tag')
            console.log('huh')
            setItem({ ...item, tags: [...item.tags, tagControl] })
            setTagControl('')
            return
        }
        setItem({ ...item, tags: [tagControl] })
        setTagControl('')
    }

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }

    let removeTag = async (tag) => {
        let newArr = await removeItemOnce(item.tags, tag)
        setItem({...item, tags: newArr})
    }

    let checkSKU = async (e) => {
        let { data } = await axiosScript('post', '/api/admin/getSKU', { search: { sku: e.target.value } })
        if(data.data[0] && Array.isArray(data.data)){setLastSKU(data.data[0].last)}
        else{setLastSKU(0)}
        // if (data.data.length > 0) return setSkuErr(true)
        // setSkuErr(false)
    }

    let uniq = (a) => {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    let pasteTags = async () => {
        let Arr = item.tags
        Arr.push(...props.copiedTags)
        let fixedArr = uniq(Arr)
        console.log(fixedArr)

        setItem({...item, tags: fixedArr})
    }

    useEffect(() => {
        console.log('change')
        setItem({...item, name: props.itemAddName})
    }, [props.open])
    console.log(item)
    return (
        <Dialog open={props.open} onClose={() => {
            console.log(skuErr)
            props.onClose(item, baseSKU, lastSKU)
        }}>
            {!item ? <div>Error Item Did Not Load Try Again</div> : (
                <Box display='flex' flexDirection='column' alignItems='center' minWidth='30vw' minHeight='70vh' bgcolor='white'>
                    <Box color='white' bgcolor='rgb(36, 37, 38)' width='100%' display='flex' justifyContent='center' alignItems='center' height='75px' mb={5}><Typography variant='h3'>{!item.name ? 'Loading...' : item.name}</Typography></Box>
                    <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                        <Box width='50%'><Typography variant='h5'>Details:</Typography></Box>
                        <TextField label='description' value={item.details} onChange={(e) => setItem({ ...item, details: e.target.value })} />
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='space-around' width='100%'>
                        <Box width='50%' display='flex' justifyContent='space-between'><Typography variant='h5'>Tags:</Typography>
                            <Box>
                                <Tooltip title='Paste Tag Set'>
                                    <SaveIcon className='linkClean' onClick={()=>pasteTags()}/>
                                </Tooltip>
                                <Tooltip title='Copy Tag Set'>
                                    <FileCopyIcon className='linkClean' onClick={() => { props.copyTags(item.tags) }} />
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box width='35%' display='flex' justifyContent='center' alignItems='center'>
                            <TextField value={tagControl} onKeyUp={(e) => e.key === 'Enter' ? addTag() : null} onChange={(e) => setTagControl(e.target.value)} label='Tag' />
                            <Button variant='contained' onClick={() => addTag()}>+</Button>
                        </Box>
                    </Box>
                    <Box pt={3} pb={3} display='flex' justifyContent='space-around' width='75%' flexWrap='wrap'>
                        {!item.tags ? 'Please add some tags' : item.tags.map((row) => {
                            return (
                                <Box display='flex' justifyContent='space-around' alignItems='center' minWidth='100px' minHeight='25px' bgcolor='#5184d3' style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>
                                    <Box minWidth='25%' maxWidth='25%'><Box width='10px' height='10px' bgcolor='white' borderRadius='100%' position='relative' left='28'></Box></Box>
                                    #{row}<Typography className='linkClean' onClick={()=>removeTag(row)}>X</Typography>
                                </Box>
                            )
                        })}
                    </Box>
                    <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                        <Box width='50%'><Typography variant='h5'>Sold To:</Typography></Box>
                        <TextField label='Customer' />
                    </Box>
                    <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                        <Box width='50%'><Typography variant='h5'>Additional Info (Inhouse):</Typography></Box>
                        <TextField label='Additional Info (Inhouse)' value={item.additionalInfo} onChange={(e) => setItem({ ...item, additionalInfo: e.target.value })} />
                    </Box>
                    <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                        <Box width='50%'><Typography variant='h5'>Base SKU ex:PCBIG:</Typography></Box>
                        <TextField label='SKU' error={skuErr} helperText={skuErr ? 'This SKU already Exists' : null} value={item.sku} onChange={(e) => {
                            checkSKU(e)
                            setBaseSKU(e.target.value)
                        }} />
                    </Box>
                    <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                        <Box width='50%'><Typography variant='h5'>Last SKU:</Typography></Box>
                        <Box width='34%'><Typography>{lastSKU}</Typography></Box>
                    </Box>
                    <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                        <Box width='50%'><Typography variant='h5'>Next SKU:</Typography></Box>
                        <Box width='34%'><Typography>{`${baseSKU}${lastSKU < 10 ? "00"+(lastSKU+1) : lastSKU < 100 ? "0"+(lastSKU+1) : lastSKU+1}`}</Typography></Box>
                    </Box>
                    <Box display='flex' mr={5} ml={5} alignItems='center' justifyContent='space-around' width='100%'>
                        <Box width='50%'><Typography variant='h5'>Cost:</Typography></Box>
                        <TextField type={'number'} label="Cost" inputProps={{ step: "1" }} value={item.cost} onChange={(e) => setItem({ ...item, cost: parseFloat(e.target.value) })} />
                    </Box>
                </Box>
            )}
            <Button variant='outlined' onClick={() => props.finishItem(item, baseSKU, lastSKU)}>Save</Button>
        </Dialog>
    )

}