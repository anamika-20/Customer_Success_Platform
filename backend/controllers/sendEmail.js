import nodemailer from "nodemailer";

export const sendEmail = async (emails, data, names) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email service
      auth: {
        user: "anamikatiwary20@gmail.com", // Your email address
        pass: "wsby chsv cyqc phiu", // Your email password or app-specific password
      },
    });
    for (let i = 0; i < emails.length; i++) {
      const mailOptions = {
        from: '"Promact Infotech Pvt Ltd" <anamikatiwary20@gmail.com>', // Sender address
        to: emails[i], // List of recipients
        subject: "Audit History Updated", // Subject line
        html: `<b>Hello ${names[i]}, </b> <br/> <p>Please note that audit has been completed and here is the audit summary:<p> ${data} <br/>  <br/> <p> Location: <a href="http://localhost:3000/">Customer Success Platform</a></p> <br/> <p>Thanks and Regards,</p><p>
        Promact Infotech Pvt Ltd</p>
        `, // html body
      };
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
    }

    // Return success message
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    // Log error
    console.error("Error sending email:", error);
    // Return error message
    return { success: false, message: "Failed to send email." };
  }
};
export default {
  sendEmail,
};
