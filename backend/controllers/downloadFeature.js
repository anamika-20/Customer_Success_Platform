import { launch } from "puppeteer";
import generateProjectHTML from "./generateProjectHTML.js"; // Adjust the path if necessary
import Project from "../Schemas/Project.js"; // Adjust the path if necessary

const downloadFeature = async (req, res) => {
  try {
    const { project_id } = req.params;

    const projectDoc = await Project.findById(project_id)
      .populate("approvedTeams")
      .populate("client")
      .populate("resources")
      .populate("projectUpdates")
      .populate("moms");

    if (!projectDoc) {
      return res.status(409).json({ message: "Project does not exist" });
    }

    // Create a browser instance
    const browser = await launch();
    // Create a new page
    const page = await browser.newPage();

    const htmlContent = generateProjectHTML(projectDoc);

    // Set the content of the page
    await page.setContent(htmlContent);

    // Download the PDF
    const pdf = await page.pdf({ format: "A4", printBackground: true });

    // Close the browser instance
    await browser.close();

    // Send the PDF as a response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);
  } catch (error) {
    console.error("Error converting HTML to PDF:", error);
    res.status(500).send("Error converting HTML to PDF");
  }
};

export default downloadFeature;
