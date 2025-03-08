import React from 'react';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service | AI Resume Parser & Cover Letter Generator</title>
                <meta name="description" content="Read our terms of service for using the AI Resume Parser and Cover Letter Generator application." />
                <link rel="canonical" href="https://resumeparserpro.online/terms-of-service" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
                <Header />
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>

                    <div className="bg-white rounded-xl shadow-md p-8">
                        <p className="text-gray-600 mb-6">
                            Last Updated: March 8, 2024
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 mb-4">
                                Welcome to AI Resume Parser. These Terms of Service ("Terms") govern your access to and use of our website, applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
                            </p>
                            <p className="text-gray-600">
                                If you do not agree to these Terms, please do not use our Services. We reserve the right to modify these Terms at any time. Your continued use of the Services after any changes indicates your acceptance of the modified Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Services</h2>
                            <p className="text-gray-600 mb-4">
                                AI Resume Parser provides AI-powered tools to analyze resumes, generate cover letters, and optimize job applications. Our Services include:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-600">
                                <li>Resume parsing and analysis</li>
                                <li>Cover letter generation in multiple styles</li>
                                <li>ATS optimization recommendations</li>
                                <li>Job description matching analysis</li>
                            </ul>
                            <p className="text-gray-600">
                                We may update, modify, or discontinue any aspect of our Services at any time without prior notice.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts and Registration</h2>
                            <p className="text-gray-600 mb-4">
                                Some features of our Services may require you to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                            </p>
                            <p className="text-gray-600 mb-4">
                                You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                            </p>
                            <p className="text-gray-600">
                                We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply with these Terms or if we suspect misuse of our Services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. User Content</h2>
                            <p className="text-gray-600 mb-4">
                                Our Services allow you to upload, submit, store, or transmit content such as resumes and job descriptions ("User Content"). You retain all rights to your User Content, and you are solely responsible for it.
                            </p>
                            <p className="text-gray-600 mb-4">
                                By uploading User Content, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process your User Content solely for the purpose of providing and improving our Services.
                            </p>
                            <p className="text-gray-600 mb-4">
                                You represent and warrant that:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-600">
                                <li>You own or have the necessary rights to your User Content</li>
                                <li>Your User Content does not violate the privacy rights, publicity rights, copyright, contractual rights, or any other rights of any person or entity</li>
                                <li>Your User Content does not contain any material that is false, defamatory, misleading, or otherwise unlawful</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
                            <p className="text-gray-600 mb-4">
                                The Services and their original content, features, and functionality are owned by AI Resume Parser and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                            </p>
                            <p className="text-gray-600">
                                You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, or transmit any of the material on our Services without prior written consent.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitations of Liability</h2>
                            <p className="text-gray-600 mb-4">
                                In no event shall AI Resume Parser, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-600">
                                <li>Your access to or use of or inability to access or use the Services</li>
                                <li>Any conduct or content of any third party on the Services</li>
                                <li>Any content obtained from the Services</li>
                                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                            </ul>
                            <p className="text-gray-600">
                                Our liability is limited to the maximum extent permitted by law.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Disclaimer of Warranties</h2>
                            <p className="text-gray-600 mb-4">
                                Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                            </p>
                            <p className="text-gray-600 mb-4">
                                We do not guarantee that:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-600">
                                <li>The Services will meet your specific requirements</li>
                                <li>The Services will be uninterrupted, timely, secure, or error-free</li>
                                <li>The results from using the Services will be accurate or reliable</li>
                                <li>The quality of any products, services, information, or other material obtained through the Services will meet your expectations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Governing Law</h2>
                            <p className="text-gray-600 mb-4">
                                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                            </p>
                            <p className="text-gray-600">
                                Any dispute arising from or relating to these Terms or your use of the Services shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Termination</h2>
                            <p className="text-gray-600 mb-4">
                                We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
                            </p>
                            <p className="text-gray-600">
                                Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
                            <p className="text-gray-600 mb-4">
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <p className="text-gray-600">
                                Email: terms@resumeparserpro.online
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

export default TermsOfService;