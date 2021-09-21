import { Button, Box } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';



export default function ShowPDF (props) {
    let [base64, setBase64] = useState(null)
    let [height, setHeight] = useState(0)
    const ref = useRef(null)
    useEffect(()=>{
        const base64String = btoa(String.fromCharCode(...new Uint8Array(props.img)));
        setBase64(base64String)
    })
    if(!base64) return <div>Loading...</div>
    return (
        
        <img src={`data:image/jpg;base64,${base64}`} style={{flex:'1'}}>
            {/* <Box display='flex' justifyContent='space-around'>

            <Button onClick={()=>{
                let newPage = pageNumber - 1
                setPageNumber(newPage)
                }}>{'<--'}</Button><Box>{pageNumber}</Box> <Button onClick={()=>{
                    let newPage = pageNumber + 1
                    setPageNumber(newPage)
                    }}>{'-->'}</Button>
            </Box> */}
        </img>
    )
} 