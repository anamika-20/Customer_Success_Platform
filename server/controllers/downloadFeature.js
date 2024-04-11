import { launch } from "puppeteer";
import generateProjectHTML from "./generateProjectHTML.js";
import Project from "../models/Project.js";

const downloadFeature = async (req, res) => {
  try {
    const { proj } = req.params;

    const projectDoc = await Project.findById(proj)
      .populate("resources")
      .populate("projectStack")
      .populate("projectUpdates")
      .populate("clientFeedback")
      .populate("moms")
      .populate("auditHistory")
      .populate("riskProfiling")
      .populate("phases.phase")
      .populate("sprints.sprint")
      .populate({
        path: "versionHistory.version",
        model: "VersionHistory",
        populate: {
          path: "createdBy approvedBy",
          model: "User",
        },
      })
      .populate({
        path: "financialMatrix.name",
        model: "User",
      })
      .populate({
        path: "technicalMatrix.name",
        model: "User",
      })
      .populate({
        path: "operationalMatrix.name",
        model: "User",
      })
      .populate({
        path: "stakeholders",
        populate: {
          path: "PM Auditor Client",
          model: "User",
        },
      });
    // console.log(
    //   "================================" + projectDoc.sprints[0].sprint
    // );
    if (!projectDoc) {
      return res.status(409).json({ message: "Project does not exist" });
    }

    // Create a browser instance
    const browser = await launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-features=site-per-process",
      ],
    });

    // Create a new page
    const page = await browser.newPage();

    const htmlContent = generateProjectHTML(projectDoc);

    // Set the content of the page
    await page.setContent(htmlContent);

    // Download the PDF
    const pdf = await page.pdf({ format: "A4", printBackground: true });

    // Get the HTML content for preview
    const previewHtml = await page.content();

    // Close the browser instance
    await browser.close();

    // Send the PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=project_details.pdf`
    );
    res.send(pdf);

    // Send the HTML as a response for preview
    res.setHeader("Content-Type", "text/html");
    res.send(previewHtml);
  } catch (error) {
    console.error("Error converting HTML to PDF:", error);
    res.status(500).send("Error converting HTML to PDF");
  }
};

export default downloadFeature;
