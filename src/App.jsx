import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeUploader from './components/ResumeUploader';
import Header from './components/Header';
import { Helmet } from 'react-helmet-async';
import {
  analyzeResumeJobMatch,
  getInterviewSuggestions,
  generateCoverLetters
} from './utils/api';
import JobDescriptionSection from './components/JobDescriptionSection';
import ResultsSection from './components/ResultsSection';
import ProgressIndicator from './components/ProgressIndicator';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function HomePage() {
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

  const handleJobDescriptionChange = (jd) => {
    setJobDescription(jd);
  };

  const handleGenerateCoverLetter = async () => {
    if (!resumeData || !jobDescription) {
      alert('Please upload your resume and provide a job description');
      return;
    }

    setLoading(true);
    try {
      // Analyze resume and job description match with detailed ATS insights
      const matchAnalysis = await analyzeResumeJobMatch(resumeData, jobDescription);
      setStats(matchAnalysis);

      // Get AI suggestions for interview preparation
      const suggestions = await getInterviewSuggestions(resumeData, jobDescription);
      setAiSuggestions(suggestions);

      // Generate 4 different cover letter styles
      const generatedCoverLetters = await generateCoverLetters(resumeData, jobDescription);
      setCoverLetters(generatedCoverLetters);

      setStep(3); // Move to results step
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Resume Parser & Cover Letter Generator | Optimize Your Job Applications</title>
        <meta name="description" content="Use our AI-powered tools to parse your resume, generate tailored cover letters, and optimize your job applications for ATS systems." />
        <link rel="canonical" href="https://resumeparserpro.online" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <main className="app-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={step} />

          {/* Step 1: Resume Upload */}
          {step === 1 && (
            <section className="max-w-2xl mx-auto" aria-labelledby="upload-resume-heading">
              <h2 id="upload-resume-heading" className="sr-only">Upload Resume</h2>
              <ResumeUploader onResumeUpload={handleResumeUpload} parsing={parsing} />
            </section>
          )}

          {/* Step 2: Job Description */}
          {step === 2 && (
            <JobDescriptionSection
              jobDescription={jobDescription}
              onChange={handleJobDescriptionChange}
              onSubmit={handleGenerateCoverLetter}
              resumeData={resumeData}
              loading={loading}
            />
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <ResultsSection
              coverLetters={coverLetters}
              selectedCoverLetter={selectedCoverLetter}
              setSelectedCoverLetter={setSelectedCoverLetter}
              stats={stats}
              aiSuggestions={aiSuggestions}
              setStep={setStep}
            />
          )}
        </main>

        <footer className="bg-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-200 pb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Resume Parser</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our advanced AI Resume Parser uses cutting-edge artificial intelligence to analyze your resume and optimize it for Applicant Tracking Systems (ATS). Get personalized insights and improve your chances of landing your dream job.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Cover Letter Generator</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Create professional, tailored cover letters in multiple styles that highlight your strengths and match job requirements. Our AI technology ensures your application stands out to hiring managers and passes through ATS filters.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Career Resources</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Access expert interview preparation tips, keyword optimization strategies, and personalized feedback to enhance your job application process. Our comprehensive tools help job seekers at all career stages.
                </p>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Optimize Your Job Search with AI-Powered Tools</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                In today's competitive job market, standing out is essential. Our AI Resume Parser and Cover Letter Generator provide job seekers with powerful tools to optimize resumes for ATS systems, create compelling cover letters, and receive personalized insights. With advanced natural language processing technology, we analyze your qualifications against job descriptions to highlight relevant skills, identify improvement areas, and generate tailored application materials that increase your chances of securing interviews.
              </p>
            </div>
            
            <div className="text-center mb-6">
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Resume Optimization</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">ATS Compatibility</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Cover Letter Templates</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Job Application Tools</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Career Development</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Interview Preparation</span>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <a href="/about" className="hover:text-blue-600">About Us</a>
              <a href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-blue-600">Terms of Service</a>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              © {new Date().getFullYear()} AI Resume Parser. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;