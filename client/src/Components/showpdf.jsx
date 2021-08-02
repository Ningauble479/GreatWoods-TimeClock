import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function ShowPDF (props) {

    return (
        
        <div>
            <Document
            file={{data: props.pdf}}
            ><Page pageNumber={1}/></Document>
        </div>
    )
} 