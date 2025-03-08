import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export function cleanupString(inputString) {
  const cleanedString = inputString.replace(/[\s\t\n]+/g, " ").trim();
  return cleanedString;
}

export async function parseResume(resumeText) {
  const data = cleanupString(resumeText);
  const prompt = `
    You are an expert ATS (Applicant Tracking System) analyzer and resume optimizer. 
    Extract key information from the resume text including skills, experience, education, achievements, and certifications. 
    Format the response as JSON.
    Resume text:
    ${data}
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function analyzeResumeJobMatch(resumeData, jobDescription) {
  const analysisPrompt = `
    You are an expert ATS system and hiring manager advisor. 
    Analyze the match between resume and job description. 
    Return a detailed JSON with the following fields:
    1. matchScore (percentage between 0-100)
    2. keywordMatches (array of matched keywords with context)
    3. skillsMatch (percentage between 0-100)
    4. experienceRelevance (percentage between 0-100)
    5. missingKeywords (array of important keywords from JD missing in resume)
    6. improvementAreas (array of specific suggestions to improve match)
    7. atsScore (estimated ATS pass probability percentage)
    8. competitiveEdge (array of candidate's unique strengths relevant to the position)
    
    Resume: ${JSON.stringify(resumeData)}
    Job Description: ${jobDescription}
  `;

  const analysisResult = await model.generateContent(analysisPrompt);
  const analysisResponse = await analysisResult.response;
  const matchAnalysis = analysisResponse.text();
  return JSON.parse(matchAnalysis?.replace(/^```json\s+|\s+```$/g, ""));
}

export async function getInterviewSuggestions(resumeData, jobDescription) {
  const suggestionsPrompt = `
    You are an expert career coach and hiring manager with insider knowledge.
    Based on the resume and job description, provide strategic advice to help the candidate stand out.
    Include:
    1. talkingPoints (array of top 5 tailored talking points for interviews)
    2. challengingQuestions (array of 3 potential challenging questions and suggested answers, each with question and answer fields)
    3. keyAchievements (array of achievements to emphasize)
    4. technicalSkills (array of technical skills to highlight)
    5. softSkills (array of soft skills that align with company culture)
    Format as JSON with these fields.
    
    Resume: ${JSON.stringify(resumeData)}
    Job Description: ${jobDescription}
  `;

  const suggestionsResult = await model.generateContent(suggestionsPrompt);
  const suggestionsResponse = await suggestionsResult.response;
  const suggestions = suggestionsResponse.text();
  return JSON.parse(suggestions?.replace(/^```json\s+|\s+```$/g, ""));
}

export async function generateCoverLetters(resumeData, jobDescription) {
  const coverLetterStyles = [
    {
      name: "Professional",
      prompt:
        "Create a highly professional and formal cover letter that emphasizes qualifications and experience.",
    },
    {
      name: "Modern & Creative",
      prompt:
        "Create a modern, slightly creative cover letter that shows personality while maintaining professionalism.",
    },
    {
      name: "Achievement-Focused",
      prompt:
        "Create a cover letter that heavily emphasizes achievements and results with metrics and specific examples.",
    },
    {
      name: "Company-Aligned",
      prompt:
        "Create a cover letter that demonstrates deep research about the company and alignment with their mission and values.",
    },
  ];

  const coverLetterPromises = coverLetterStyles.map(async (style) => {
    const coverLetterPrompt = `
      You are an expert cover letter writer with extensive hiring experience.
      ${style.prompt}
      Create a highly compelling, ATS-optimized cover letter that:
      1. Immediately grabs attention with a strong opening
      2. Strategically incorporates keywords from the job description
      3. Quantifies achievements with metrics where possible
      4. Demonstrates clear understanding of the company's needs
      5. Shows enthusiasm and cultural fit
      6. Includes a confident call to action
      7. Maintains professional tone while showing personality
      8. Is concise (200-250 words) and impactful
      The letter should be tailored specifically to this candidate and position.
      
      Resume: ${JSON.stringify(resumeData)}
      Job Description: ${jobDescription}
    `;

    const coverLetterResult = await model.generateContent(coverLetterPrompt);
    const coverLetterResponse = await coverLetterResult.response;
    return {
      style: style.name,
      content: coverLetterResponse.text(),
    };
  });

  return Promise.all(coverLetterPromises);
}
