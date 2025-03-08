import React from 'react';
import CoverLetterGenerator from './CoverLetterGenerator';
import SelectionStats from './SelectionStats';
import { generateCoverLetterPDF, generateResumeAnalysisPDF } from '../utils/pdfGenerator';

const ResultsSection = ({
    coverLetters,
    selectedCoverLetter,
    setSelectedCoverLetter,
    stats,
    aiSuggestions,
    setStep
}) => {
    const downloadCoverLetter = () => {
        if (!coverLetters || coverLetters.length === 0) return;
        const selectedLetter = coverLetters[selectedCoverLetter];
        generateCoverLetterPDF(selectedLetter.content, selectedLetter.style);
    };

    const downloadResumeAnalysis = () => {
        if (!stats) return;
        generateResumeAnalysisPDF(stats);
    };

    return (
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
    );
};

export default ResultsSection;