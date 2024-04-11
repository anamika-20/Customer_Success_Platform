const generateProjectHTML = (projectDoc) => {
  const formateDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };
  let htmlContent = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Project Details</title>
              <style>
              label {
                font-weight: bold;
              }
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
            <body>`;

  // Project Details:
  htmlContent += `<h1>General Information</h1>
  <label>Project Name:</label>
  <span>${projectDoc.projectName}</span>
  <br/>
  <label>Project Description:</label>
  <span>${projectDoc.projectDescription}</span>
  <br/>
  <label>Project Type:</label>
  <span>${projectDoc.projectType}</span>
  <br/>
  <label>Duration (in months):</label>
  <span>${projectDoc.durationMonths}</span>
  <br/>
  <label>Budgeted Hours:</label>
  <span>${projectDoc.budgetedHours}</span>
  <br/>
  <label>Project Scope:</label>
  <span>${projectDoc.scope || ""}</span>
  <br/>
  <label>Detailed Timeline Reference:</label>
  <span>${projectDoc.detailedTimelineReference || ""}</span>
  <br/>
  `;

  // Add data dynamically for Project Stack
  htmlContent += `
  <h1>Project Stack</h1>
  <label>Backend:</label>
  ${projectDoc?.projectStack?.backend.map((tech) => `<span>${tech}</span>`)}
  <br/>
  <label>Frontend:</label>
  ${projectDoc?.projectStack?.frontend.map((tech) => `<span>${tech}</span>`)}
  <br/>
  <label>Mobile App:</label>
  ${projectDoc?.projectStack?.mobileApp.map((tech) => `<span>${tech}</span>`)}
  <br/>
  <label>Database:</label>
  ${projectDoc?.projectStack?.database.map((tech) => `<span>${tech}</span>`)}
  <br/>
  <label>Infrastructure And Services:</label>
  ${projectDoc?.projectStack?.infrastructureAndServices.map(
    (tech) => `<span>${tech}</span>`
  )}
  <br/>`;

  // Add data dynamically for Escaltion Matrix
  htmlContent += `
    <h1>Escaltion Matrix</h1>
    <h3>Operational Matrix</h3>
    <table>
        <thead>
        <tr>
            <th>Escalation Level</th>
        </tr>
        </thead>
        <tbody>`;
  htmlContent += projectDoc.operationalMatrix.map(
    (matrix) => `
                    <tr>
                      <td>${matrix.escalationLevel}</td>
                      <td>${matrix.name}</td>
                    </tr>`
  );
  htmlContent += `</tbody>
                 </table>
  <br/>`;
  htmlContent += `
    <h3>Financial Matrix</h3>
    <table>
        <thead>
        <tr>
            <th>Escalation Level</th>
        </tr>
        </thead>
        <tbody>`;
  htmlContent += projectDoc.financialMatrix.map(
    (matrix) => `
                    <tr>
                      <td>${matrix.escalationLevel}</td>
                      <td>${matrix.name}</td>
                    </tr>`
  );
  htmlContent += `</tbody>
                 </table>
  <br/>`;

  htmlContent += `
    <h3>Technical Matrix</h3>
    <table>
        <thead>
        <tr>
            <th>Escalation Level</th>
        </tr>
        </thead>
        <tbody>`;
  htmlContent += projectDoc.technicalMatrix.map(
    (matrix) => `
                    <tr>
                      <td>Level - ${matrix.escalationLevel}</td>
                      <td>${matrix.name.name}</td>
                    </tr>`
  );
  htmlContent += `</tbody>
                 </table>
  <br/>`;
  // Add data dynamically for Stakeholders
  htmlContent += `
<h1>Stakeholders</h1>
<table>
    <thead>
    <tr>
        <th>Title</th>
        <th>Name</th>
        <th>Contact</th>
    </tr>
    </thead>
    <tbody>`;
  htmlContent += projectDoc.stakeholders.PM.map(
    (user) => `
                <tr>
                  <td>PM</td>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                </tr>`
  );
  htmlContent += projectDoc.stakeholders.Auditor.map(
    (user) => `
                <tr>
                    <td>Auditor</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>`
  );
  htmlContent += projectDoc.stakeholders.Client.map(
    (user) => `
                <tr>
                    <td>Client</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>`
  );
  htmlContent += `</tbody>
             </table>
<br/>`;

  // Risk Profiling
  htmlContent += `
    <h3>Risk Profiling</h3>
    <table>
        <thead>
        <tr>
            <th>Risk Type</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Impact</th>
            <th>Remedial Steps</th>
            <th>Status</th>
            <th>Closure Date</th>
        </tr>
        </thead>
        <tbody>`;
  htmlContent += projectDoc.riskProfiling.map(
    (matrix) => `
                    <tr>
                      <td>${matrix.riskType}</td>
                      <td>${matrix.description}</td>
                      <td>${matrix.severity}</td>
                      <td>${matrix.impact}</td>
                      <td>${matrix.remedialSteps}</td>
                      <td>${matrix.status}</td>
                      <td>${formateDate(matrix.closureDate)}</td>
                    </tr>`
  );
  htmlContent += `</tbody>
                 </table>
  <br/>`;

  // Phases
  htmlContent += `
    <h3>Phases</h3>
    <table>
        <thead>
        <tr>
            <th></th>
            <th>Title</th>
            <th>Start Date</th>
            <th>Completion Date</th>
            <th>Approval Date</th>
            <th>Status</th>
            <th>Revised Completion Date</th>
            <th>Comments</th>
        </tr>
        </thead>
        <tbody>`;
  htmlContent += projectDoc?.phases?.map(
    (phase) => `
                    <tr>
                      <td>${phase.phaseNumber}</td>
                      <td>${phase.phase?.title}</td>
                      <td>${formateDate(phase.phase?.startDate)}</td>
                      <td>${formateDate(phase.phase?.completionDate)}</td>
                      <td>${formateDate(phase.phase?.approvalDate)}</td>
                      <td>${phase.phase?.status}</td>
                      <td>${formateDate(
                        phase.phase?.revisedCompletionDate
                      )}</td>
                      <td>${phase.phase?.comments}</td>
                    </tr>`
  );
  htmlContent += `</tbody>
                 </table>
  <br/>`;

  // Resources
  htmlContent += `
 <h3>Resources</h3>
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
  htmlContent += projectDoc.resources.map(
    (resource) => `
                 <tr>
                 <tr>
                    <td>${resource.name}</td>
                    <td>${resource.role}</td>
                    <td>${formateDate(resource.startDate)}</td>
                    <td>${formateDate(resource.endDate)}</td>
                    <td>${resource.comments}</td>
                </tr>`
  );
  htmlContent += `</tbody>
              </table>
<br/>`;

  // Client Feeedback
  htmlContent += `
 <h3>Client Feedback</h3>
 <table>
     <thead>
     <tr>
        <th>Feedback Type</th>
        <th>Date Received</th>
        <th>Detailed Feedback</th>
        <th>Action Taken</th>
        <th>Closure Date</th>
     </tr>
     </thead>
     <tbody>`;
  htmlContent += projectDoc.clientFeedback.map(
    (feedback) => `
    <tr>
        <td>${feedback.type}</td>
        <td>${formateDate(feedback.dateReceived)}</td>
        <td>${feedback.detailedFeedback}</td>
        <td>${feedback.actionTaken}</td>
        <td>${formateDate(feedback.closureDate)}</td>
    </tr>`
  );
  htmlContent += `</tbody>
              </table>
<br/>`;

  // Minutes of Meeting
  htmlContent += `
 <h3>Minutes of Meeting</h3>
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
  htmlContent += projectDoc.moms.map(
    (mom) => `
    <tr>
        <td>${formateDate(mom.date)}</td>
        <td>${mom.duration}</td>
        <td>${mom.momLink}</td>
        <td>${mom.comments}</td>
    </tr>`
  );
  htmlContent += `</tbody>
              </table>
<br/>`;

  // Project Updates
  htmlContent += `
 <h3>Project Updates</h3>
 <table>
     <thead>
     <tr>
        <th>Date</th>
        <th>General Updates</th>
     </tr>
     </thead>
     <tbody>`;
  htmlContent += projectDoc.projectUpdates.map(
    (updates) => `
    <tr>
        <td>${formateDate(updates.date)}</td>
        <td>${updates.generalUpdates}</td>
    </tr>`
  );
  htmlContent += `</tbody>
              </table>
<br/>`;

  // Audit History
  htmlContent += `
 <h3>Audit History</h3>
 <table>
     <thead>
     <tr>
        <th>Date</th>
        <th>Reviewed By</th>
        <th>Status</th>
        <th>Reviewed Section</th>
        <th>Comment Queries</th>
        <th>Action Item</th>
     </tr>
     </thead>
     <tbody>`;
  htmlContent += projectDoc.auditHistory.map(
    (audit) => `
    <tr>
        <td>${formateDate(audit.dateOfAudit)}</td>
        <td>${audit.reviewedBy}</td>
        <td>${audit.status}</td>
        <td>${audit.reviewedSection}</td>
        <td>${audit.commentQueries}</td>
        <td>${audit.actionItem}</td>
    </tr>`
  );
  htmlContent += `</tbody>
              </table>
<br/>`;

  // Sprint
  htmlContent += `
 <h3>Sprint</h3>
 <table>
     <thead>
     <tr>
        <th>Start Date</th>
        <th>End Date</th>
        <th>status</th>
        <th>Comment</th>
     </tr>
     </thead>
     <tbody>`;
  htmlContent += projectDoc.sprints.map(
    (sprint) => `
    <tr>
        <td>${formateDate(sprint.sprint?.startDate)}</td>
        <td>${formateDate(sprint.sprint?.endDate)}</td>
        <td>${sprint.sprint?.status}</td>
        <td>${sprint.sprint?.comments}</td>
    </tr>`
  );
  htmlContent += `</tbody>
              </table>
<br/>`;

  // VErsion History
  htmlContent += `
 <h3>Version History</h3>
 <table>
     <thead>
     <tr>
        <th>Type</th>
        <th>Type Change</th>
        <th>Change Reason</th>
        <th>Created By</th>
        <th>Revision Date</th>
        <th>Approval Date</th>
        <th>Approved By</th>
    </tr>
     </thead>
     <tbody>`;
  htmlContent += projectDoc.versionHistory.map(
    (version) => `
    <tr>
        <td>${version.version?.type}</td>
        <td>${version.version?.change}</td>
        <td>${version.version?.changeReason}</td>
        <td>${version.version?.createdBy?.name}</td>
        <td>${formateDate(version.version?.revisionDate)}</td>
        <td>${formateDate(version.version?.approvalDate)}</td>
        <td>${version.version?.approvedBy?.name}</td>
    </tr>`
  );
  htmlContent += `</tbody>
              </table>
<br/>`;

  //   // Add data dynamically for approved teams
  //   htmlContent += `<h1>Approved Teams</h1>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th>Phase</th>
  //                     <th>No. of Resources</th>
  //                     <th>Role</th>
  //                     <th>Availability %</th>
  //                     <th>Duration</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>`;

  //   htmlContent += projectDoc.approvedTeam.team
  //     .map(
  //       (team) => `
  //                   <tr>
  //                     <td>${team.phaseNumber}</td>
  //                     <td>${team.team.length}</td>
  //                     <td>${team.team[0]?.role}</td>
  //                     <td>${team.team[0]?.availability_percentage}</td>
  //                     <td>${team.team[0]?.duration}</td>
  //                   </tr>`
  //     )
  //     .join("");

  //   // Add data dynamically for resources
  //   htmlContent += `</tbody>
  //               </table>

  //               <h1>Resources</h1>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th>Resource Name</th>
  //                     <th>Role</th>
  //                     <th>Start Date</th>
  //                     <th>End Date</th>
  //                     <th>Comment</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>`;

  //   htmlContent += projectDoc.resources
  //     .map(
  //       (resource) => `
  //                   <tr>
  //                     <td>${resource.name}</td>
  //                     <td>${resource.role}</td>
  //                     <td>${resource.start_date}</td>
  //                     <td>${resource.end_date}</td>
  //                     <td>${resource.comment}</td>
  //                   </tr>`
  //     )
  //     .join("");

  //   // Add data dynamically for client feedback
  //   htmlContent += `</tbody>
  //               </table>

  //               <h1>Client Feedback</h1>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th>Feedback Type</th>
  //                     <th>Date Received</th>
  //                     <th>Detailed Feedback</th>
  //                     <th>Action Taken</th>
  //                     <th>Closure Date</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>`;

  //   htmlContent += projectDoc.clientFeedback
  //     .map(
  //       (feedback) => `
  //                   <tr>
  //                     <td>${feedback.type}</td>
  //                     <td>${feedback.dateReceived}</td>
  //                     <td>${feedback.detailedFeedback}</td>
  //                     <td>${feedback.actionTaken}</td>
  //                     <td>${feedback.closureDate}</td>
  //                   </tr>`
  //     )
  //     .join("");

  //   // Add data dynamically for project updates
  //   htmlContent += `</tbody>
  //               </table>

  //               <h1>Project Updates</h1>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th>Date</th>
  //                     <th>General Updates</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>`;

  //   htmlContent += projectDoc.projectUpdates
  //     .map(
  //       (update) => `
  //                   <tr>
  //                     <td>${formateDate(update.date)}</td>
  //                     <td>${update.generalUpdates}</td>
  //                   </tr>`
  //     )
  //     .join("");

  //   // Add data dynamically for MOMs
  //   htmlContent += `</tbody>
  //               </table>

  //               <h1>MOMs of Client Meetings</h1>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th>Date</th>
  //                     <th>Duration</th>
  //                     <th>MOM Link</th>
  //                     <th>Comment</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>`;

  //   htmlContent += projectDoc.moms
  //     .map(
  //       (mom) => `
  //                   <tr>
  //                     <td>${mom.date}</td>
  //                     <td>${mom.duration}</td>
  //                     <td>${mom.momLink}</td>
  //                     <td>${mom.comment}</td>
  //                   </tr>`
  //     )
  //     .join("");

  //   htmlContent += `</tbody>
  //               </table>
  //             </body>
  //           </html>`;

  //   // Add data dynamically for Project Stack
  //   htmlContent += `</tbody>
  //  </table>

  //  <h1>Project Stack</h1>
  //  <table>
  //    <thead>
  //      <tr>
  //        <th>Backend</th>
  //        <th>Frontend</th>
  //        <th>Mobile App</th>
  //        <th>Database</th>
  //        <th>Infrastructure And Services</th>
  //      </tr>
  //    </thead>
  //    <tbody>`;

  //   htmlContent += projectDoc.projectStack
  //     .map(
  //       (stack) => `
  //      <tr>
  //        <td>${stack.backend}</td>
  //        <td>${stack.frontend}</td>
  //        <td>${stack.mobileApp}</td>
  //        <td>${stack.database}</td>
  //        <td>${stack.infrastructureAndServices}</td>
  //      </tr>`
  //     )
  //     .join("");

  //   htmlContent += `</tbody>
  //  </table>
  // </body>
  // </html>`;

  //   // Add data dynamically for Risks
  //   htmlContent += `</tbody>
  //  </table>

  //  <h1>Risks</h1>
  //  <table>
  //    <thead>
  //      <tr>
  //        <th>Type</th>
  //        <th>Description</th>
  //        <th>Severity</th>
  //        <th>Impact</th>
  //        <th>Remedial Steps</th>
  //        <th>Status</th>
  //        <th>Closure Date</th>
  //      </tr>
  //    </thead>
  //    <tbody>`;

  //   htmlContent += projectDoc.riskProfiling
  //     .map(
  //       (risk) => `
  //      <tr>
  //        <td>${risk.riskType}</td>
  //        <td>${risk.description}</td>
  //        <td>${risk.severity}</td>
  //        <td>${risk.impact}</td>
  //        <td>${risk.remedialSteps}</td>
  //        <td>${risk.status}</td>
  //        <td>${risk.closureDate}</td>
  //      </tr>`
  //     )
  //     .join("");

  //   htmlContent += `</tbody>
  //  </table>
  // </body>
  // </html>`;

  //   // Add data dynamically for Sprints
  //   htmlContent += `</tbody>
  //  </table>

  //  <h1>Sprints</h1>
  //  <table>
  //    <thead>
  //      <tr>
  //        <th>Start Date</th>
  //        <th>End Date</th>
  //        <th>status</th>
  //        <th>Comment</th>
  //      </tr>
  //    </thead>
  //    <tbody>`;

  //   htmlContent += projectDoc.sprints
  //     .map(
  //       (mom) => `
  //      <tr>
  //        <td>${mom.startDate}</td>
  //        <td>${mom.endDate}</td>
  //        <td>${mom.status}</td>
  //        <td>${mom.comments}</td>
  //      </tr>`
  //     )
  //     .join("");

  //   htmlContent += `</tbody>
  //  </table>
  // </body>
  // </html>`;

  //   // Add data dynamically for MOMs
  //   htmlContent += `</tbody>
  //  </table>

  //  <h1>Sprints</h1>
  //  <table>
  //    <thead>
  //      <tr>
  //        <th>Start Date</th>
  //        <th>End Date</th>
  //        <th>status</th>
  //        <th>Comment</th>
  //      </tr>
  //    </thead>
  //    <tbody>`;

  //   htmlContent += projectDoc.sprints
  //     .map(
  //       (mom) => `
  //      <tr>
  //        <td>${mom.startDate}</td>
  //        <td>${mom.endDate}</td>
  //        <td>${mom.status}</td>
  //        <td>${mom.comments}</td>
  //      </tr>`
  //     )
  //     .join("");

  //   htmlContent += `</tbody>
  //  </table>
  // </body>
  // </html>`;

  htmlContent += `
</body>
</html>`;

  return htmlContent;
};

export default generateProjectHTML;
