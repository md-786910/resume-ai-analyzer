import React, { useState, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
import { WorkerMessageHandler } from "pdfjs-dist/build/pdf.worker.min.mjs";



export default function ParsePdf() {
    const [extractedText, setExtractedText] = useState("");
    const [pdfSrc, setPdfSrc] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = async () => {
            const arrayBuffer = fileReader.result;

            try {
                pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.mjs";
                const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

                const numPages = pdf.numPages;
                let extractedText = "";

                for (let i = 1; i <= numPages; i++) {
                    const page = await pdf.getPage(i);
                    const pageText = await page.getTextContent();

                    // Map over text items and join them with a newline character
                    const pageLines = pageText.items.map((item) => item.str).join("\n");

                    // Append the lines from this page to the extracted text
                    if (extractedText !== "") {
                        extractedText += "\n";
                    }
                    extractedText += pageLines;
                }

                setExtractedText(extractedText);
                setPdfSrc(URL.createObjectURL(selectedFile));
                setSelectedFileName(selectedFile.name);
            } catch (error) {
                console.error("Error parsing PDF:", error);

            }
        };

        setExtractedText("");
        fileReader.readAsArrayBuffer(selectedFile);
    };
    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                ref={fileInputRef}
            />

            <div className="ScrollableContainer">
                {extractedText &&

                    <div className="ScrollableContent">
                        <pre>{extractedText}</pre>
                    </div>
                }
            </div>
        </div>

    );
}