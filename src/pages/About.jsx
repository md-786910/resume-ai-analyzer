import React from 'react';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | AI Resume Parser & Cover Letter Generator</title>
        <meta name="description" content="Learn about our AI-powered resume parser and cover letter generator that helps job seekers optimize their applications for ATS systems." />
        <link rel="canonical" href="https://resumeparserpro.online/about" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">About AI Resume Parser</h1>
          
          <section className="bg-white rounded-xl shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At AI Resume Parser, we're dedicated to empowering job seekers with cutting-edge technology that simplifies and optimizes the job application process. Our mission is to level the playing field by giving everyone access to professional-grade tools that help their applications stand out in competitive job markets.
            </p>
            <p className="text-gray-600 mb-6">
              We understand the challenges of modern job hunting, where Applicant Tracking Systems (ATS) can filter out qualified candidates before a human ever sees their resume. Our AI-powered tools are designed to help you navigate these systems while creating compelling application materials that showcase your unique qualifications.
            </p>
          </section>
          
          <section className="bg-white rounded-xl shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Technology</h2>
            <p className="text-gray-600 mb-6">
              Our platform leverages advanced artificial intelligence and natural language processing to analyze resumes and job descriptions, identifying key matches and opportunities for improvement. We use Google's Gemini AI technology to provide sophisticated analysis and generate high-quality content tailored to your specific situation.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-medium text-blue-600 mb-3">Resume Analysis</h3>
                <p className="text-gray-600">
                  Our AI engine extracts and categorizes information from your resume, analyzes it against job descriptions, and provides actionable insights to improve your match rate with ATS systems.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-medium text-blue-600 mb-3">Cover Letter Generation</h3>
                <p className="text-gray-600">
                  We create personalized, professional cover letters in multiple styles that highlight your relevant experience and skills, tailored specifically to each job you apply for.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              AI Resume Parser was founded by a team of professionals with backgrounds in recruitment, HR technology, and artificial intelligence. We've experienced the job application process from both sides and understand what makes applications successful.
            </p>
            <p className="text-gray-600 mb-6">
              Our diverse team combines expertise in machine learning, natural language processing, user experience design, and career coaching to create tools that are both powerful and accessible to everyone, regardless of their technical background.
            </p>
            <p className="text-gray-600">
              We're constantly improving our algorithms and features based on user feedback and the latest developments in AI technology, ensuring that our users always have access to the most effective tools for their job search.
            </p>
          </section>
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
};

export default About;