import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Helper function to safely render array items
const renderArrayItems = (items) => {
  if (!items || !Array.isArray(items)) return "<li>No data available</li>";

  return items
    .map((item) => {
      // Handle if item is an object
      if (typeof item === "object" && item !== null) {
        try {
          return `<li style="margin-bottom: 8px; padding: 8px; background: #f8fafc; border-left: 3px solid #2563eb; border-radius: 4px;">
          ${JSON.stringify(item).replace(/[{}"]/g, "").replace(/,/g, ", ")}
        </li>`;
        } catch (e) {
          return "<li>Complex data</li>";
        }
      }
      // Handle string or other primitive types
      return `<li style="margin-bottom: 8px; padding: 8px; background: #f8fafc; border-left: 3px solid #2563eb; border-radius: 4px;">
      ${String(item)}
    </li>`;
    })
    .join("");
};

export async function generateCoverLetterPDF(coverLetter, style) {
  if (!coverLetter) return;

  // Create a temporary div to render the cover letter
  const tempDiv = document.createElement("div");
  tempDiv.className = "pdf-container";
  tempDiv.style.width = "210mm";
  tempDiv.style.padding = "20mm";
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";

  // Format the content with proper styling
  tempDiv.innerHTML = `
    <div style="font-family: 'Arial', sans-serif; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 5px;">Cover Letter</h1>
        <p style="color: #6b7280; font-style: italic;">${style} Style</p>
      </div>
      <div style="white-space: pre-line; line-height: 1.6; text-align: justify;">
        ${coverLetter}
      </div>
      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280;">
        <p>Generated with AI Resume Parser</p>
      </div>
    </div>
  `;

  document.body.appendChild(tempDiv);

  try {
    // Convert the div to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Cover_Letter_${style.replace(/\s+/g, "_")}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF");
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
  }
}

export async function generateResumeAnalysisPDF(stats) {
  if (!stats) return;

  // Create a temporary div to render the analysis report
  const tempDiv = document.createElement("div");
  tempDiv.className = "pdf-container";
  tempDiv.style.width = "210mm";
  tempDiv.style.padding = "20mm";
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";

  // Format the analysis data with proper styling
  tempDiv.innerHTML = `
    <div style="font-family: 'Arial', sans-serif; color: #333;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4f46e5; font-size: 28px; margin-bottom: 5px;">Resume Analysis Report</h1>
        <p style="color: #6b7280;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="width: 48%; background: #f3f4f6; border-radius: 8px; padding: 15px; text-align: center;">
            <h3 style="color: #2563eb; margin-bottom: 10px;">Match Score</h3>
            <div style="font-size: 24px; font-weight: bold;">${
              stats.matchScore || 0
            }%</div>
          </div>
          <div style="width: 48%; background: #f3f4f6; border-radius: 8px; padding: 15px; text-align: center;">
            <h3 style="color: #2563eb; margin-bottom: 10px;">ATS Score</h3>
            <div style="font-size: 24px; font-weight: bold;">${
              stats.atsScore || 0
            }%</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between;">
          <div style="width: 48%; background: #f3f4f6; border-radius: 8px; padding: 15px; text-align: center;">
            <h3 style="color: #2563eb; margin-bottom: 10px;">Skills Match</h3>
            <div style="font-size: 24px; font-weight: bold;">${
              stats.skillsMatch || 0
            }%</div>
          </div>
          <div style="width: 48%; background: #f3f4f6; border-radius: 8px; padding: 15px; text-align: center;">
            <h3 style="color: #2563eb; margin-bottom: 10px;">Experience Relevance</h3>
            <div style="font-size: 24px; font-weight: bold;">${
              stats.experienceRelevance || 0
            }%</div>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Keyword Matches</h2>
        <ul style="list-style-type: none; padding-left: 0;">
          ${renderArrayItems(stats.keywordMatches)}
        </ul>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Missing Keywords</h2>
        <ul style="list-style-type: none; padding-left: 0;">
          ${renderArrayItems(stats.missingKeywords)}
        </ul>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Improvement Areas</h2>
        <ul style="list-style-type: none; padding-left: 0;">
          ${renderArrayItems(stats.improvementAreas)}
        </ul>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Competitive Edge</h2>
        <ul style="list-style-type: none; padding-left: 0;">
          ${renderArrayItems(stats.competitiveEdge)}
        </ul>
      </div>
      
      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p>Generated with AI Resume Parser</p>
      </div>
    </div>
  `;

  document.body.appendChild(tempDiv);

  try {
    // Convert the div to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Resume_Analysis_Report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF");
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
  }
}
