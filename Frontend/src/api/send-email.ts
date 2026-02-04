import nodemailer from 'nodemailer';
type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  recaptchaToken: string;
};
function hasHeaderInjection(value: string): boolean {
  return /\r|\n/.test(value);
}
function isValidEmailAddress(value: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(value);
}
function sanitizeSubject(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}
function sanitizeText(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[<>]/g, '')
    .trim();
}

export async function sendEmail(input: SendEmailInput) {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET ?? import.meta.env.VITE_RECAPTCHA_SECRET_KEY;
  const smtpHost = process.env.SMTP_HOST ?? import.meta.env.VITE_SMTP_HOST;
  const smtpPortRaw = process.env.SMTP_PORT ?? import.meta.env.VITE_SMTP_PORT;
  const smtpUser = process.env.SMTP_USER ?? import.meta.env.VITE_SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD ?? import.meta.env.VITE_SMTP_PASSWORD;
  const smtpFrom = process.env.SMTP_FROM ?? import.meta.env.VITE_SMTP_FROM;
  if (!recaptchaSecret) {
    throw new Error('Server misconfiguration: reCAPTCHA secret is missing');
  }
  if (!smtpHost || !smtpPortRaw || !smtpUser || !smtpPassword || !smtpFrom) {
    throw new Error('Server misconfiguration: SMTP configuration is incomplete');
  }
  const smtpPort = Number(smtpPortRaw);
  const secure = smtpPort === 465; 
  const to = input.to.trim();
  const subject = sanitizeSubject(input.subject);
  const text = sanitizeText(input.text);
  if (!isValidEmailAddress(to)) {
    throw new Error('Invalid recipient email');
  }
  if (hasHeaderInjection(to) || hasHeaderInjection(subject)) {
    throw new Error('Invalid characters in headers');
  }
  if (subject.length === 0 || subject.length > 150) {
    throw new Error('Subject length out of bounds');
  }
  if (text.length === 0 || text.length > 5000) {
    throw new Error('Message length out of bounds');
  }
  try {
    const body = new URLSearchParams();
    body.set('secret', recaptchaSecret);
    body.set('response', input.recaptchaToken);
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData?.success) {
      throw new Error('reCAPTCHA verification failed');
    }
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });
    await transporter.sendMail({
      from: smtpFrom,
      to,
      subject,
      text,
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending email:', message);
    throw new Error('Failed to send email');
  }
}