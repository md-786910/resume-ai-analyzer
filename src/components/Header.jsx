function Header() {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-100">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        AI Cover Letter Generator
                    </h1>
                    <p className="mt-2 text-gray-600 max-w-2xl">
                        Transform your job application with AI-powered cover letters. Upload your resume,
                        provide a job description, and get a personalized cover letter in seconds.
                    </p>
                </div>
            </div>
        </header>
    );
}

export default Header;