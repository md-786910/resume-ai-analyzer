import React from 'react';
import JobDescriptionInput from './JobDescriptionInput';

const JobDescriptionSection = ({ 
  jobDescription, 
  onChange, 
  onSubmit, 
  resumeData, 
  loading 
}) => {
  return (
    <section className="max-w-2xl mx-auto" aria-labelledby="job-description-heading">
      <h2 id="job-description-heading" className="sr-only">Enter Job Description</h2>
      <JobDescriptionInput
        value={jobDescription}
        onChange={onChange}
      />
      <button
        onClick={onSubmit}
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
  );
};

export default JobDescriptionSection;