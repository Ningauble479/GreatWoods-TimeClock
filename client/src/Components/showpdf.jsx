import { Button, Box } from '@material-ui/core';
import React, { useState } from 'react';
import { Document, Page, View, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function ShowPDF (props) {
    let [pageNumber, setPageNumber] = useState(1)
    return (
        
        <div style={{width:'1000px', height:'1000px', display: 'flex', flexDirection:'column', alignContent: 'center', justifyItems: 'center'}}>
            <Document
            file={{data: props.pdf}}
            >
                <Page height={1000} size='A4' pageNumber={pageNumber}/>

            </Document>
            <Box display='flex' justifyContent='space-around'>

            <Button onClick={()=>{
                let newPage = pageNumber - 1
                setPageNumber(newPage)
                }}>{'<--'}</Button><Box>{pageNumber}</Box> <Button onClick={()=>{
                    let newPage = pageNumber + 1
                    setPageNumber(newPage)
                    }}>{'-->'}</Button>
            </Box>
        </div>
    )
} 