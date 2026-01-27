"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

// Type for form data
export type ContactFormData = z.infer<typeof formSchema>

// Type for form response
export type ContactFormResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResponse> {
  try {
    // Extract form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validate form data
    const validationResult = formSchema.safeParse(data)

    if (!validationResult.success) {
      // Return validation errors
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
    })

    // Email content
    const mailOptions = {
      from: `"RMGP Website" <${process.env.SMTP_USER || "noreply@example.com"}>`,
      to: "parkar.ar@northeastern.edu",
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #dc2626;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Subject:</strong> ${data.subject}</p>
  <div style="margin-top: 20px;">
    <h3 style="color: #333;">Message:</h3>
    <p style="white-space: pre-line; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
  </div>
  <p style="margin-top: 30px; font-size: 12px; color: #666;">This email was sent from the RMGP website contact form.</p>
</div>
      `,
    }

    // For development/testing, log the email instead of sending it
    if (process.env.NODE_ENV === "development") {
      console.log("Email would be sent:", mailOptions)
      return {
        success: true,
        message: "Your message has been sent successfully! (Development mode - email logged to console)",
      }
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    }
  }
}
