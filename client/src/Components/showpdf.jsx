import React, { useState } from 'react';
import { Document, Page, View, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function ShowPDF (props) {

    return (
        
        <div style={{width:'1000px', height:'1000px', display: 'flex', alignContent: 'center', justifyItems: 'center'}}>
            <Document
            file={{data: props.pdf}}
            >
                <Page height={1000} size='A4' pageNumber={1}/>

            </Document>
        </div>
    )
} 