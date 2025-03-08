function CoverLetterGenerator({ coverLetter }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(coverLetter);
        alert('Cover letter copied to clipboard!');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Generated Cover Letter</h2>
                    <button
                        onClick={copyToClipboard}
                        className="bg-white/20 hover:bg-white/30 text-red-400 font-medium py-2 px-4 rounded-lg backdrop-blur-sm transition-all duration-200 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-line text-gray-700 font-medium leading-relaxed">
                    {coverLetter}
                </div>
            </div>
        </div>
    );
}

export default CoverLetterGenerator;