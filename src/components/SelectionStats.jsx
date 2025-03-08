function SelectionStats({ stats, aiSuggestions }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <h2 className="text-xl font-semibold text-white">Application Insights</h2>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Match Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Overall Match Score</span>
                <span className="text-sm font-medium text-gray-700">{stats?.matchScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${stats?.matchScore > 80 ? 'bg-green-500' : stats?.matchScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${stats?.matchScore}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Skills Match</span>
                <span className="text-sm font-medium text-gray-700">{stats?.skillsMatch}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${stats?.skillsMatch > 80 ? 'bg-green-500' : stats?.skillsMatch > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${stats?.skillsMatch}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Experience Relevance</span>
                <span className="text-sm font-medium text-gray-700">{stats?.experienceRelevance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${stats?.experienceRelevance > 80 ? 'bg-green-500' : stats?.experienceRelevance > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${stats?.experienceRelevance}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">ATS Pass Probability</span>
                <span className="text-sm font-medium text-gray-700">{stats?.atsScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${stats?.atsScore > 80 ? 'bg-green-500' : stats?.atsScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${stats?.atsScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Keyword Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Matched Keywords</h4>
              <div className="bg-green-50 p-3 rounded-md">
                <ul className="list-disc pl-5 space-y-1">
                  {stats?.keywordMatches?.map((data, index) => (
                    <li key={index} className="text-sm text-gray-600">{data?.keyword}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Missing Keywords</h4>
              <div className="bg-red-50 p-3 rounded-md">
                <ul className="list-disc pl-5 space-y-1">
                  {stats?.missingKeywords?.map((data, index) => (
                    <li key={index} className="text-sm text-gray-600">{data}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {aiSuggestions && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Interview Preparation</h3>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Talking Points</h4>
              <div className="bg-blue-50 p-3 rounded-md">
                <ol className="list-decimal pl-5 space-y-1">
                  {aiSuggestions?.talkingPoints?.map((data, index) => (
                    <li key={index} className="text-sm text-gray-600">{data}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Potential Questions & Answers</h4>
              <div className="space-y-3">
                {aiSuggestions?.challengingQuestions?.map((qa, index) => (
                  <div key={index} className="bg-purple-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-purple-700">{qa?.question}</p>
                    <p className="text-sm text-gray-600 mt-1">{qa?.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Improvement Areas</h4>
              <div className="bg-amber-50 p-3 rounded-md">
                <ul className="list-disc pl-5 space-y-1">
                  {stats?.improvementAreas?.map((area, index) => (
                    <li key={index} className="text-sm text-gray-600">{area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionStats;