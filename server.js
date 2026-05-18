import express from 'express'
import cors from 'cors'
import compression from 'compression'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Compression middleware for better performance
app.use(compression())

app.use(cors({ origin: process.env.CONTACT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Cache headers for static assets
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: false,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    } else if (path.match(/\.(js|css|woff2|webp)$/)) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable')
    } else {
      res.set('Cache-Control', 'public, max-age=3600')
    }
  },
}))

const submissions = new Map()

const normalize = (value) => value?.toString().trim() || ''
const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/contact', async (req, res) => {
  try {
    const name = normalize(req.body.name)
    const email = normalize(req.body.email)
    const company = normalize(req.body.company)
    const phone = normalize(req.body.phone)
    const projectType = normalize(req.body.projectType)
    const budget = normalize(req.body.budget)
    const timeline = normalize(req.body.timeline)
    const message = normalize(req.body.message)

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' })
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' })
    }

    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown'
    const last = submissions.get(key) || 0
    if (Date.now() - last < 8000) {
      return res.status(429).json({ success: false, error: 'Please wait a few seconds before submitting again.' })
    }
    submissions.set(key, Date.now())

    const emailTo = process.env.EMAIL_TO || process.env.SMTP_USER
    const timestamp = new Date().toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    })

    const mailOptions = {
      from: `${escapeHtml(name)} <${escapeHtml(email)}>`,
      to: emailTo,
      subject: 'New Business Inquiry - Heviora Technologies',
      text: `New Business Inquiry\n\nFull Name: ${escapeHtml(name)}\nBusiness Email: ${escapeHtml(email)}\nCompany Name: ${escapeHtml(company || 'N/A')}\nPhone Number: ${escapeHtml(phone || 'N/A')}\nProject Type: ${escapeHtml(projectType || 'N/A')}\nEstimated Budget: ${escapeHtml(budget || 'N/A')}\nProject Timeline: ${escapeHtml(timeline || 'N/A')}\n\nMessage:\n${escapeHtml(message)}\n\nTimestamp: ${escapeHtml(timestamp)}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Business Inquiry</title>
        </head>
        <body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
          <div style="background: linear-gradient(135deg, #050816 0%, #0a1628 100%); padding: 40px 20px; min-height: 100vh;">
            <div style="max-width: 600px; margin: 0 auto;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #00AFFF; font-size: 28px; margin: 0; font-weight: 600; letter-spacing: -0.5px;">New Business Inquiry</h1>
                <p style="color: #B8C1D1; font-size: 13px; margin: 8px 0 0; letter-spacing: 0.05em; text-transform: uppercase;">Heviora Technologies</p>
              </div>

              <!-- Contact Information Card -->
              <div style="background: rgba(10, 25, 47, 0.6); border: 1px solid rgba(59, 130, 246, 0.18); border-radius: 24px; padding: 28px; margin-bottom: 20px; backdrop-filter: blur(20px);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div>
                    <p style="color: #B8C1D1; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Full Name</p>
                    <p style="color: #FFFFFF; font-size: 15px; margin: 0; font-weight: 500;">${escapeHtml(name)}</p>
                  </div>
                  <div>
                    <p style="color: #B8C1D1; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Business Email</p>
                    <p style="color: #00AFFF; font-size: 14px; margin: 0; word-break: break-all;">${escapeHtml(email)}</p>
                  </div>
                  <div>
                    <p style="color: #B8C1D1; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Company Name</p>
                    <p style="color: #FFFFFF; font-size: 15px; margin: 0; font-weight: 500;">${escapeHtml(company || 'N/A')}</p>
                  </div>
                  <div>
                    <p style="color: #B8C1D1; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Phone Number</p>
                    <p style="color: #FFFFFF; font-size: 15px; margin: 0; font-weight: 500;">${escapeHtml(phone || 'N/A')}</p>
                  </div>
                </div>
              </div>

              <!-- Project Requirements Section -->
              <div style="background: rgba(10, 25, 47, 0.6); border: 1px solid rgba(59, 130, 246, 0.18); border-radius: 24px; padding: 28px; margin-bottom: 20px; backdrop-filter: blur(20px);">
                <h2 style="color: #00AFFF; font-size: 14px; margin: 0 0 20px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Project Requirements</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div>
                    <p style="color: #B8C1D1; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Project Type</p>
                    <p style="color: #FFFFFF; font-size: 15px; margin: 0; font-weight: 500;">${escapeHtml(projectType || 'N/A')}</p>
                  </div>
                  <div>
                    <p style="color: #B8C1D1; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Estimated Budget</p>
                    <p style="color: #FFFFFF; font-size: 15px; margin: 0; font-weight: 500;">${escapeHtml(budget || 'N/A')}</p>
                  </div>
                  <div style="grid-column: 1 / -1;">
                    <p style="color: #B8C1D1; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Project Timeline</p>
                    <p style="color: #FFFFFF; font-size: 15px; margin: 0; font-weight: 500;">${escapeHtml(timeline || 'N/A')}</p>
                  </div>
                </div>
              </div>

              <!-- Message Section -->
              <div style="background: rgba(10, 25, 47, 0.6); border: 1px solid rgba(59, 130, 246, 0.18); border-radius: 24px; padding: 28px; margin-bottom: 20px; backdrop-filter: blur(20px);">
                <h2 style="color: #00AFFF; font-size: 14px; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Project Message</h2>
                <p style="color: #B8C1D1; font-size: 14px; margin: 0; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(message)}</p>
              </div>

              <!-- Timestamp Footer -->
              <div style="text-align: center; padding: 20px; border-top: 1px solid rgba(59, 130, 246, 0.18);">
                <p style="color: #B8C1D1; font-size: 12px; margin: 0; letter-spacing: 0.05em;">Submitted on ${timestamp}</p>
                <p style="color: #7A8A9E; font-size: 11px; margin: 8px 0 0; letter-spacing: 0.05em;">© Heviora Technologies • Premium AI Solutions</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)

    await transporter.sendMail({
      from: `"Heviora Technologies" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank You for Contacting Heviora Technologies',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Thank You for Contacting Heviora Technologies</title>
        </head>
        <body style="margin:0; padding:0; background:#041025; color:#e7eef9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#041025; padding: 24px 0; width:100%;">
            <tr>
              <td align="center">
                <table width="680" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px; margin: 0 auto; background: linear-gradient(180deg, #0d1a38 0%, #081326 100%); border-radius: 28px; overflow:hidden; box-shadow: 0 32px 80px rgba(0, 0, 0, 0.35);">
                  <tr>
                    <td style="padding: 32px 28px 24px; text-align:center;">
                      <p style="margin:0; font-size:12px; letter-spacing: 0.2em; color:#5b7eaa; text-transform: uppercase;">Heviora Technologies</p>
                      <h1 style="margin: 16px 0 0; font-size: 32px; line-height: 1.1; color:#ffffff;">Thank you, ${escapeHtml(name)}.</h1>
                      <p style="margin: 14px auto 0; max-width:560px; font-size:16px; line-height:1.7; color:#b8c9e6;">We have received your inquiry and our team is already reviewing your project details. You can expect a response from us within 24 hours.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 28px 24px;">
                      <div style="background:#0d223e; border:1px solid rgba(78, 148, 255, 0.14); border-radius:22px; padding:24px;">
                        <h2 style="margin:0 0 14px; color:#7ec8ff; font-size:18px; letter-spacing:0.04em; text-transform: uppercase;">Inquiry Received</h2>
                        <p style="margin:0; color:#d4e0fc; font-size:15px; line-height:1.8;">Your message has been delivered to our business inquiry team. We look forward to connecting with you about how our AI-powered enterprise services can make your next initiative more efficient and future-ready.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 28px 24px;">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:22px; overflow:hidden; background:#081229; border:1px solid rgba(68, 118, 193, 0.18);">
                        <tr>
                          <td style="padding: 24px;">
                            <h3 style="margin:0 0 18px; color:#a4cafe; font-size:17px;">Our Core Services</h3>
                            <ul style="margin:0; padding:0; list-style:none; color:#e7eef9; font-size:15px; line-height:2;">
                              <li>• AI Solutions</li>
                              <li>• Web Development</li>
                              <li>• SaaS Products</li>
                              <li>• Automation Systems</li>
                              <li>• UI/UX Engineering</li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 28px 28px; text-align:center;">
                      <a href="https://heviora-technologies.onrender.com" style="display:inline-block; background: linear-gradient(135deg, #3a86ff 0%, #0b4b9b 100%); color:#ffffff; text-decoration:none; padding: 16px 28px; border-radius: 999px; font-size: 15px; font-weight:600; letter-spacing:0.01em;">Visit Heviora Technologies</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 28px 28px; border-top:1px solid rgba(75, 118, 185, 0.18);">
                      <p style="margin:0; font-size:13px; line-height:1.6; color:#8597b1;">If you have any immediate questions, reply to this message and our team will prioritize your inquiry.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 28px 28px; text-align:center;">
                      <p style="margin:0; font-size:12px; color:#5a759c; letter-spacing:0.08em; text-transform:uppercase;">Heviora Technologies</p>
                      <p style="margin: 8px 0 0; font-size:12px; color:#5a759c;">Enterprise AI • SaaS • Automation</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return res.status(200).json({ success: true, message: 'Inquiry submitted successfully. Confirmation email sent.' })
  } catch (error) {
    console.error('Contact API error:', error)
    return res.status(500).json({ success: false, error: 'Unable to send inquiry' })
  }
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Contact API listening on port ${PORT}`)
})
