import { Button, Box } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ShowPDF (props) {
    let [pageNumber, setPageNumber] = useState(1)
    let [width, setWidth] = useState(0)
    let [height, setHeight] = useState(0)
    const ref = useRef(null)
    useEffect(()=>{
        console.log(`Width: ${ref.current ? ref.current.offsetWidth : 0} Height: ${ref.current ? ref.current.clientHeight : 0}`)
        if(ref.current){
            setWidth(ref.current.offsetWidth)
            setHeight(ref.current.clientHeight)
        }
    })
    return (
        
        <div style={{flex:'1', display: 'flex', flexDirection:'column', alignContent: 'center', justifyItems: 'center'}} ref={ref}>

            <Document
            file={props.pdf}
            >
                <Page height={height} width={width} size='A4' pageNumber={props.page}/>

            </Document>
            {/* <Box display='flex' justifyContent='space-around'>

            <Button onClick={()=>{
                let newPage = pageNumber - 1
                setPageNumber(newPage)
                }}>{'<--'}</Button><Box>{pageNumber}</Box> <Button onClick={()=>{
                    let newPage = pageNumber + 1
                    setPageNumber(newPage)
                    }}>{'-->'}</Button>
            </Box> */}
        </div>
    )
} 