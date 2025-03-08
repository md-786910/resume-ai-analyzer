import React from 'react';

const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Upload Resume' },
    { number: 2, label: 'Job Description' },
    { number: 3, label: 'Results' }
  ];

  return (
    <nav aria-label="Progress" className="mb-12">
      <ol role="list" className="flex items-center justify-center">
        <div className="flex items-center w-full max-w-3xl relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" aria-hidden="true"></div>
          
          {steps.map((step) => (
            <li key={step.number} className="flex-1 relative z-10">
              <div
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                } border-2 ${currentStep >= step.number ? 'border-blue-700' : 'border-gray-300'}`}
                aria-current={currentStep === step.number ? "step" : undefined}
              >
                <span className="sr-only">Step {step.number}</span>
                <span aria-hidden="true">{step.number}</span>
              </div>
              <div className="text-center mt-3 text-sm font-medium">
                <span className={currentStep >= step.number ? "text-blue-600" : "text-gray-500"}>
                  {step.label}
                </span>
              </div>
            </li>
          ))}
        </div>
      </ol>
    </nav>
  );
};

export default ProgressIndicator;