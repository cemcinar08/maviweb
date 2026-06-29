import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface SendNewsletterParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendNewsletterParams) {
  try {
    await resend.emails.send({
      from: 'RegNews <newsletter@regnews.vercel.app>',
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error('Email send error:', error)
  }
}

export function generateDigestHTML(articles: { title: string; url: string; source: string; category: string }[]): string {
  const items = articles
    .map(
      (a) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
          <a href="${a.url}" style="font-size: 16px; color: #1a73e8; text-decoration: none; font-weight: 500;">${a.title}</a>
          <div style="font-size: 13px; color: #666; margin-top: 4px;">${a.source} · ${a.category}</div>
        </td>
      </tr>`
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1a73e8; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">RegNews</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">Günlük regülasyon ve teknoloji haberleri</p>
      </div>
      <div style="background: #fff; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${items}
        </table>
      </div>
      <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
        Bu e-postayı almak istemiyorsanız <a href="#" style="color: #999;">abonelikten çıkın</a>.
      </p>
    </body>
    </html>`
}
