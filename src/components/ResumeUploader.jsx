import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjs from "pdfjs-dist";
import { WorkerMessageHandler } from "pdfjs-dist/build/pdf.worker.min.mjs";
import ParsePdf from './ParsePdf';

function ResumeUploader({ onResumeUpload, parsing }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const extractTextFromPDF = async (selectedFile) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const arrayBuffer = fileReader.result;
      let extractedText = "";
      try {
        pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.mjs";
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

        const numPages = pdf.numPages;

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
        localStorage.setItem("text", JSON.stringify(extractedText));
        onResumeUpload({ text: extractedText })
      } catch (error) {
        console.error("Error parsing PDF:", error);
        throw error;
      }

    };
    fileReader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);

    try {
      // Fix: Pass a proper callback function that sets the state and then calls onResumeUpload
      await extractTextFromPDF(selectedFile)
      // onResumeUpload({ hi: "kje" });
    } catch (error) {
      console.error('Error parsing resume:', error);
      setError(`Failed to parse resume: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded inline-block"
        >
          {parsing ? 'Parsing with Gemini...' : 'Select Resume'}
        </label>
        <p className="mt-2 text-sm text-gray-500">
          Supported format: PDF
        </p>
        {file && (
          <p className="mt-2 text-sm text-green-600">
            File selected: {file.name}
          </p>
        )}
        {error && (
          <div className="mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUploader;
