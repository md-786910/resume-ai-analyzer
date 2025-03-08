import { useState, } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ResumeUploader from './components/ResumeUploader';
import JobDescriptionInput from './components/JobDescriptionInput';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import SelectionStats from './components/SelectionStats';
import Header from './components/Header';
import { Helmet } from 'react-helmet-async';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetters, setCoverLetters] = useState([]);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [step, setStep] = useState(1);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  function cleanupString(inputString) {
    const cleanedString = inputString.replace(/[\s\t\n]+/g, ' ').trim();
    return cleanedString;
  }

  const handleResumeUpload = async () => {
    try {
      setParsing(true);
      const data = cleanupString(JSON.parse(localStorage.getItem("text")));
      const prompt = `
        You are an expert ATS (Applicant Tracking System) analyzer and resume optimizer. 
        Extract key information from the resume text including skills, experience, education, achievements, and certifications. 
        Format the response as JSON.
        Resume text:
       ${data}
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const parsedData = response.text();
      setResumeData(parsedData);
      setStep(2); // Move to job description step after resume upload
    } catch (error) {
      console.log('Error parsing resume:', error);
      alert('Failed to parse resume');
    } finally {
      setParsing(false);
    }
  };

  const generateCoverLetter = async () => {
    if (!resumeData || !jobDescription) {
      alert('Please upload your resume and provide a job description');
      return;
    }

    setLoading(true);
    try {
      // Analyze resume and job description match with detailed ATS insights
      const analysisPrompt = `
        You are an expert ATS system and hiring manager advisor. 
        Analyze the match between resume and job description. 
        Return a detailed JSON with the following fields:
        1. matchScore (percentage between 0-100)
        2. keywordMatches (array of matched keywords with context)
        3. skillsMatch (percentage between 0-100)
        4. experienceRelevance (percentage between 0-100)
        5. missingKeywords (array of important keywords from JD missing in resume)
        6. improvementAreas (array of specific suggestions to improve match)
        7. atsScore (estimated ATS pass probability percentage)
        8. competitiveEdge (array of candidate's unique strengths relevant to the position)
        
        Resume: ${JSON.stringify(resumeData)}
        Job Description: ${jobDescription}
      `;

      const analysisResult = await model.generateContent(analysisPrompt);
      const analysisResponse = await analysisResult.response;
      const matchAnalysis = analysisResponse.text();
      setStats(JSON.parse(matchAnalysis?.replace(/^```json\s+|\s+```$/g, '')));

      // Get AI suggestions for interview preparation
      const suggestionsPrompt = `
        You are an expert career coach and hiring manager with insider knowledge.
        Based on the resume and job description, provide strategic advice to help the candidate stand out.
        Include:
        1. talkingPoints (array of top 5 tailored talking points for interviews)
        2. challengingQuestions (array of 3 potential challenging questions and suggested answers, each with question and answer fields)
        3. keyAchievements (array of achievements to emphasize)
        4. technicalSkills (array of technical skills to highlight)
        5. softSkills (array of soft skills that align with company culture)
        Format as JSON with these fields.
        
        Resume: ${JSON.stringify(resumeData)}
        Job Description: ${jobDescription}
      `;

      const suggestionsResult = await model.generateContent(suggestionsPrompt);
      const suggestionsResponse = await suggestionsResult.response;
      const suggestions = suggestionsResponse.text();
      setAiSuggestions(JSON.parse(suggestions?.replace(/^```json\s+|\s+```$/g, '')));

      // Generate 4 different cover letter styles
      const coverLetterStyles = [
        {
          name: "Professional",
          prompt: "Create a highly professional and formal cover letter that emphasizes qualifications and experience."
        },
        {
          name: "Modern & Creative",
          prompt: "Create a modern, slightly creative cover letter that shows personality while maintaining professionalism."
        },
        {
          name: "Achievement-Focused",
          prompt: "Create a cover letter that heavily emphasizes achievements and results with metrics and specific examples."
        },
        {
          name: "Company-Aligned",
          prompt: "Create a cover letter that demonstrates deep research about the company and alignment with their mission and values."
        }
      ];

      const coverLetterPromises = coverLetterStyles.map(async (style) => {
        const coverLetterPrompt = `
          You are an expert cover letter writer with extensive hiring experience.
          ${style.prompt}
          Create a highly compelling, ATS-optimized cover letter that:
          1. Immediately grabs attention with a strong opening
          2. Strategically incorporates keywords from the job description
          3. Quantifies achievements with metrics where possible
          4. Demonstrates clear understanding of the company's needs
          5. Shows enthusiasm and cultural fit
          6. Includes a confident call to action
          7. Maintains professional tone while showing personality
          8. Is concise (200-250 words) and impactful
          The letter should be tailored specifically to this candidate and position.
          
          Resume: ${JSON.stringify(resumeData)}
          Job Description: ${jobDescription}
        `;

        const coverLetterResult = await model.generateContent(coverLetterPrompt);
        const coverLetterResponse = await coverLetterResult.response;
        return {
          style: style.name,
          content: coverLetterResponse.text()
        };
      });

      const generatedCoverLetters = await Promise.all(coverLetterPromises);
      setCoverLetters(generatedCoverLetters);
      setStep(3); // Move to results step
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  };

  const handleJobDescriptionChange = (jd) => {
    setJobDescription(jd);
  };

  // Add these new functions for downloading content

  // Updated download functions
  const downloadCoverLetter = async () => {
    if (!coverLetters || coverLetters.length === 0) return;

    const selectedLetter = coverLetters[selectedCoverLetter];
    const content = selectedLetter.content;
    const style = selectedLetter.style;

    // Create a temporary div to render the cover letter
    const tempDiv = document.createElement('div');
    tempDiv.className = 'pdf-container';
    tempDiv.style.width = '210mm';
    tempDiv.style.padding = '20mm';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';

    // Format the content with proper styling
    tempDiv.innerHTML = `
      <div style="font-family: 'Arial', sans-serif; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 5px;">Cover Letter</h1>
          <p style="color: #6b7280; font-style: italic;">${style} Style</p>
        </div>
        <div style="white-space: pre-line; line-height: 1.6; text-align: justify;">
          ${content}
        </div>
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>Generated with AI Resume Parser</p>
        </div>
      </div>
    `;

    document.body.appendChild(tempDiv);

    try {
      // Convert the div to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Cover_Letter_${style.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF');
    } finally {
      // Clean up
      document.body.removeChild(tempDiv);
    }
  };

  const downloadResumeAnalysis = async () => {
    if (!stats) return;

    // Helper function to safely render array items
    const renderArrayItems = (items) => {
      if (!items || !Array.isArray(items)) return '<li>No data available</li>';

      return items.map(item => {
        // Handle if item is an object
        if (typeof item === 'object' && item !== null) {
          try {
            return `<li style="margin-bottom: 8px; padding: 8px; background: #f8fafc; border-left: 3px solid #2563eb; border-radius: 4px;">
              ${JSON.stringify(item).replace(/[{}"]/g, '').replace(/,/g, ', ')}
            </li>`;
          } catch (e) {
            return '<li>Complex data</li>';
          }
        }
        // Handle string or other primitive types
        return `<li style="margin-bottom: 8px; padding: 8px; background: #f8fafc; border-left: 3px solid #2563eb; border-radius: 4px;">
          ${String(item)}
        </li>`;
      }).join('');
    };

    // Create a temporary div to render the analysis report
    const tempDiv = document.createElement('div');
    tempDiv.className = 'pdf-container';
    tempDiv.style.width = '210mm';
    tempDiv.style.padding = '20mm';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';

    // Format the analysis data with proper styling
    tempDiv.innerHTML = `
      <div style="font-family: 'Arial', sans-serif; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4f46e5; font-size: 28px; margin-bottom: 5px;">Resume Analysis Report</h1>
          <p style="color: #6b7280;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div style="width: 48%; background: #f3f4f6; border-radius: 8px; padding: 15px; text-align: center;">
              <h3 style="color: #2563eb; margin-bottom: 10px;">Match Score</h3>
              <div style="font-size: 24px; font-weight: bold;">${stats.matchScore}%</div>
            </div>
            <div style="width: 48%; background: #f3f4f6; border-radius: 8px; padding: 15px; text-align: center;">
              <h3 style="color: #2563eb; margin-bottom: 10px;">ATS Score</h3>
              <div style="font-size: 24px; font-weight: bold;">${stats.atsScore}%</div>
            </div>
          </div>
          
          <div style="display: flex; justify-content: space-between;">
            <div style="width: 48%; background: #f3f4f6; border-radius: 8px; padding: 15px; text-align: center;">
              <h3 style="color: #2563eb; margin-bottom: 10px;">Skills Match</h3>
              <div style="font-size: 24px; font-weight: bold;">${stats.skillsMatch}%</div>
            </div>
            <div style="width: 48%; background: #f3f4f6; border-radius: 8px; padding: 15px; text-align: center;">
              <h3 style="color: #2563eb; margin-bottom: 10px;">Experience Relevance</h3>
              <div style="font-size: 24px; font-weight: bold;">${stats.experienceRelevance}%</div>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Keyword Matches</h2>
          <ul style="list-style-type: none; padding-left: 0;">
            ${renderArrayItems(stats.keywordMatches)}
          </ul>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Missing Keywords</h2>
          <ul style="list-style-type: none; padding-left: 0;">
            ${stats.missingKeywords.map(keyword => `
              <li style="margin-bottom: 8px; padding: 8px; background: #f8fafc; border-left: 3px solid #ef4444; border-radius: 4px;">
                ${keyword}
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Improvement Areas</h2>
          <ul style="list-style-type: none; padding-left: 0;">
            ${stats.improvementAreas.map(area => `
              <li style="margin-bottom: 8px; padding: 8px; background: #f8fafc; border-left: 3px solid #f59e0b; border-radius: 4px;">
                ${area}
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Competitive Edge</h2>
          <ul style="list-style-type: none; padding-left: 0;">
            ${stats.competitiveEdge.map(edge => `
              <li style="margin-bottom: 8px; padding: 8px; background: #f8fafc; border-left: 3px solid #10b981; border-radius: 4px;">
                ${edge}
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          <p>Generated with AI Resume Parser</p>
        </div>
      </div>
    `;

    document.body.appendChild(tempDiv);

    try {
      // Convert the div to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Resume_Analysis_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF');
    } finally {
      // Clean up
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Resume Parser & Cover Letter Generator | Optimize Your Job Applications</title>
        <meta name="description" content="Use our AI-powered tools to parse your resume, generate tailored cover letters, and optimize your job applications for ATS systems." />
        <link rel="canonical" href="https://yourwebsite.com" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <main className="app-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Improved Progress Indicator with ARIA attributes */}
          <nav aria-label="Progress" className="mb-12">
            <ol role="list" className="flex items-center justify-center">
              <div className="flex items-center w-full max-w-3xl relative">
                {/* Connecting line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" aria-hidden="true"></div>

                {[1, 2, 3].map((stepNumber) => (
                  <li key={stepNumber} className="flex-1 relative z-10">
                    <div
                      className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                        } border-2 ${step >= stepNumber ? 'border-blue-700' : 'border-gray-300'}`}
                      aria-current={step === stepNumber ? "step" : undefined}
                    >
                      <span className="sr-only">Step {stepNumber}</span>
                      <span aria-hidden="true">{stepNumber}</span>
                    </div>
                    <div className="text-center mt-3 text-sm font-medium">
                      <span className={step >= stepNumber ? "text-blue-600" : "text-gray-500"}>
                        {stepNumber === 1 ? 'Upload Resume' : stepNumber === 2 ? 'Job Description' : 'Results'}
                      </span>
                    </div>
                  </li>
                ))}
              </div>
            </ol>
          </nav>

          {step === 1 && (
            <section className="max-w-2xl mx-auto" aria-labelledby="upload-resume-heading">
              <h2 id="upload-resume-heading" className="sr-only">Upload Resume</h2>
              <ResumeUploader onResumeUpload={handleResumeUpload} parsing={parsing} />
            </section>
          )}

          {step === 2 && (
            <section className="max-w-2xl mx-auto" aria-labelledby="job-description-heading">
              <h2 id="job-description-heading" className="sr-only">Enter Job Description</h2>
              <JobDescriptionInput
                value={jobDescription}
                onChange={handleJobDescriptionChange}
              />
              <button
                onClick={generateCoverLetter}
                disabled={!resumeData || !jobDescription || loading}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-busy={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Application Materials...
                  </span>
                ) : (
                  'Generate Application Materials'
                )}
              </button>
            </section>
          )}

          {step === 3 && (
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" aria-labelledby="results-heading">
              <h2 id="results-heading" className="sr-only">Application Materials</h2>
              <div className="lg:col-span-8 space-y-8">
                {/* Cover Letter Section */}
                <article className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cover Letters</h2>

                    {/* Cover Letter Tabs */}
                    <div className="flex overflow-x-auto space-x-2 mb-4" role="tablist">
                      {coverLetters.map((letter, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedCoverLetter(index)}
                          className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedCoverLetter === index
                            ? 'bg-blue-600 text-red-400'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                          role="tab"
                          aria-selected={selectedCoverLetter === index}
                          aria-controls={`panel-${letter.style}`}
                          id={`tab-${letter.style}`}
                        >
                          {letter.style}
                        </button>
                      ))}
                    </div>

                    {/* Selected Cover Letter */}
                    {coverLetters.length > 0 && (
                      <div
                        role="tabpanel"
                        id={`panel-${coverLetters[selectedCoverLetter].style}`}
                        aria-labelledby={`tab-${coverLetters[selectedCoverLetter].style}`}
                      >
                        <CoverLetterGenerator
                          coverLetter={coverLetters[selectedCoverLetter].content}
                          style={coverLetters[selectedCoverLetter].style}
                        />
                      </div>
                    )}
                  </div>
                </article>
              </div>

              <aside className="lg:col-span-4 space-y-6">
                {/* Stats and Suggestions */}
                {stats && <SelectionStats stats={stats} aiSuggestions={aiSuggestions} />}

                {/* Actions */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
                  <div className="space-y-3">
                    <button
                      onClick={downloadCoverLetter}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-red-400 py-2 px-4 rounded"
                    >
                      Download Cover Letter
                    </button>
                    <button
                      onClick={downloadResumeAnalysis}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-red-400 py-2 px-4 rounded"
                    >
                      Download Resume Analysis
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </aside>
            </section>
          )}
        </main>

        <footer className="bg-white py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} AI Resume Parser. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;