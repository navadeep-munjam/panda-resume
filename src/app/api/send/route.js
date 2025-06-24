import nodemailer from "nodemailer";

// Utility function to validate email format
function isValidEmail(email) {
  // Simple regex for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Utility function to sanitize input (basic)
function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input.replace(/[<>]/g, "");
}

export async function POST(req) {
  try {
    // Parse and sanitize input
    const { email, subject, message } = await req.json();

    // Validate required fields
    if (!email || !subject || !message) {
      return Response.json({ message: "All fields are required." }, { status: 400 });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return Response.json({ message: "Invalid email address." }, { status: 400 });
    }

    // Sanitize subject and message
    const cleanSubject = sanitizeInput(subject).trim();
    const cleanMessage = sanitizeInput(message).trim();

    if (!cleanSubject || !cleanMessage) {
      return Response.json({ message: "Subject and message cannot be empty." }, { status: 400 });
    }

    // Check for environment variables
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_TO = process.env.EMAIL_TO || "munjamnavadeep123@gmail.com";

    if (!EMAIL_USER || !EMAIL_PASS) {
      return Response.json({ message: "Email service not configured." }, { status: 500 });
    }

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("Nodemailer transporter verification failed:", verifyError);
      return Response.json({ message: "Email service unavailable." }, { status: 500 });
    }

    const mailOptions = {
      from: `"Contact Form" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject: `New Message from ${email}: ${cleanSubject}`,
      text: cleanMessage,
      html: `
        <div>
          <h2>New Message from Contact Form</h2>
          <p><strong>From:</strong> ${sanitizeInput(email)}</p>
          <p><strong>Subject:</strong> ${cleanSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${cleanMessage.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    if (info.accepted && info.accepted.length > 0) {
      return Response.json({ message: "Email sent successfully!" }, { status: 200 });
    } else {
      return Response.json({ message: "Failed to send email." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ message: "Failed to send email." }, { status: 500 });
  }
}
