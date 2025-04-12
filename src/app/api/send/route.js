import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return Response.json({ message: "All fields are required" }, { status: 400 });
    }

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "munjamnavadeep123@gmail.com", // Change this to your receiving email
      subject: `New Message from ${email}: ${subject}`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return Response.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ message: "Failed to send email" }, { status: 500 });
  }
}
