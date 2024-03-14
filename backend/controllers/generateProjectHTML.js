// import Project from "../Schemas/Project";

const generateProjectHTML = (projectDoc) => {
  let htmlContent = `<Cannot redeclare block-scoped variable 'generateProjectHtml'.ts(!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Details</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th,
          td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Approved Teams</h1>
        <table>
          <thead>
            <tr>
              <th>Phase</th>
              <th>No. of Resources</th>
              <th>Role</th>
              <th>Availability %</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>`;
  // Add data dynamically for approved teams
  projectDoc[0]?.approved_teams.map((team) => {
    htmlContent += `
            <tr>
              <td>${team.phase}</td>
              <td>${team.no_of_resources}</td>
              <td>${team.role}</td>
              <td>${team.availability_percentage}</td>
              <td>${team.duration}</td>
            </tr>`;
  });

  // Close the table and body tags
  htmlContent += `</tbody>
        </table>
  
        <h1>Resources</h1>
        <table>
          <thead>
            <tr>
              <th>Resource Name</th>
              <th>Role</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>`;
  // Add data dynamically for resources
  projectDoc[0]?.resources.map((resource) => {
    htmlContent += `
            <tr>
              <td>${resource.name}</td>
              <td>${resource.role}</td>
              <td>${resource.start_date}</td>
              <td>${resource.end_date}</td>
              <td>${resource.comment}</td>
            </tr>`;
  });

  // Close the table and body tags
  htmlContent += `</tbody>
        </table>
  
        <h1>Client Feedback</h1>
        <table>
          <thead>
            <tr>
              <th>Feedback Type</th>
              <th>Date Received</th>
              <th>Detailed Feedback</th>
              <th>Action Taken</th>
              <th>Closure Date</th>
              <th>Complaint/Appreciation</th>
            </tr>
          </thead>
          <tbody>`;
  // Add data dynamically for client feedback
  projectDoc[0]?.client_feedback.map((feedback) => {
    htmlContent += `
            <tr>
              <td>${feedback.type}</td>
              <td>${feedback.date_received}</td>
              <td>${feedback.detailed_feedback}</td>
              <td>${feedback.action_taken}</td>
              <td>${feedback.closure_date}</td>
              <td>${feedback.complaint_appreciation}</td>
            </tr>`;
  });

  // Close the table and body tags
  htmlContent += `</tbody>
        </table>
  
        <h1>Project Updates</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>General Updates</th>
            </tr>
          </thead>
          <tbody>`;
  // Add data dynamically for project updates
  projectDoc[0]?.project_updates.map((update) => {
    htmlContent += `
            <tr>
              <td>${update.date}</td>
              <td>${update.general_updates}</td>
            </tr>`;
  });

  // Close the table and body tags
  htmlContent += `</tbody>
        </table>
  
        <h1>MOMs of Client Meetings</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Duration</th>
              <th>MOM Link</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>`;
  // Add data dynamically for MOMs
  projectDoc[0]?.moms.map((mom) => {
    htmlContent += `
            <tr>
              <td>${mom.date}</td>
              <td>${mom.duration}</td>
              <td>${mom.link}</td>
              <td>${mom.comment}</td>
            </tr>`;
  });

  // Close the table and body tags
  htmlContent += `</tbody>
        </table>
      </body>
    </html>
    `;

  return htmlContent;
};

export default  generateProjectHTML;