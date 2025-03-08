import React from 'react';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | AI Resume Parser & Cover Letter Generator</title>
        <meta name="description" content="Our privacy policy explains how we collect, use, and protect your personal information when you use our AI Resume Parser and Cover Letter Generator." />
        <link rel="canonical" href="https://resumeparserpro.online/privacy-policy" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <p className="text-gray-600 mb-6">
              Last Updated: March 8, 2024
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                At AI Resume Parser ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="text-gray-600">
                Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-600 mb-4">
                We may collect personal information that you voluntarily provide to us when you use our services, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Contact information (such as name and email address)</li>
                <li>Resume content and job descriptions you upload or enter</li>
                <li>Account credentials</li>
                <li>Feedback and correspondence (such as when you contact us)</li>
              </ul>
              
              <h3 className="text-xl font-medium text-gray-700 mb-3">2.2 Usage Information</h3>
              <p className="text-gray-600 mb-4">
                We automatically collect certain information about your device and how you interact with our services, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>IP address and device information</li>
                <li>Browser type and settings</li>
                <li>Usage data and browsing history on our platform</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and analyze your resume and job descriptions</li>
                <li>Generate cover letters and provide resume analysis</li>
                <li>Respond to your requests and provide customer support</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Protect against fraudulent, unauthorized, or illegal activity</li>
                <li>Improve and develop new features and services</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We will securely delete or anonymize your information when it is no longer needed for these purposes.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to rectify or update your personal information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to our processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
              <p className="text-gray-600">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on this page with a new effective date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p className="text-gray-600">
                Email: privacy@resumeparserpro.online
              </p>
            </section>
          </div>
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

export default PrivacyPolicy;