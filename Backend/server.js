import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { isValidEmail, getProjectLabel, getTimelineLabel } from './lib/validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const JWT_PRIVATE_KEY_PATH = process.env.JWT_PRIVATE_KEY_PATH || (process.env.NODE_ENV === 'production' ? '/app/secrets/jwt_private_key.pem' : join(__dirname, '..', '..', 'Email-Service', 'secrets', 'jwt_private_key.pem'));
const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || 'http://email-service.email-service.svc.cluster.local:8080';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'enzomonnetmata@gmail.com';
const GOTIFY_URL = process.env.GOTIFY_URL || '';
const GOTIFY_TOKEN = process.env.GOTIFY_TOKEN || '';

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['https://www.zenixweb.fr', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));

function generateJWTToken() {
  try {
    const privateKey = readFileSync(JWT_PRIVATE_KEY_PATH, 'utf8');
    return jwt.sign(
      {
        project: 'enzo',
        permissions: ['send_email'],
      },
      privateKey,
      {
        algorithm: 'RS256',
        issuer: 'email-service',
        expiresIn: '1h',
      }
    );
  } catch (error) {
    throw new Error(`JWT generation failed: ${error.message}`);
  }
}


async function sendEmailToService(templateId, toEmail, toName, variables) {
  const token = generateJWTToken();
  
  const response = await fetch(`${EMAIL_SERVICE_URL}/api/v1/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      template_id: templateId,
      to_email: toEmail,
      to_name: toName,
      project: 'enzo',
      variables: variables,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return await response.json();
}

async function sendGotifyNotification(title, message, priority = 5) {
  if (!GOTIFY_URL || !GOTIFY_TOKEN) {
    console.warn('Gotify not configured (GOTIFY_URL or GOTIFY_TOKEN missing), skipping notification');
    return;
  }
  const url = `${GOTIFY_URL.replace(/\/$/, '')}/message?token=${GOTIFY_TOKEN}`;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('message', message);
  formData.append('priority', String(priority));
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    console.error('Gotify notification failed:', response.status, await response.text());
    throw new Error(`Gotify HTTP ${response.status}`);
  }
}

app.post('/api/send-contact', async (req, res) => {
  try {
    const { from_name, from_email, phone, company, project, budget, timeline, message } = req.body;

    console.log('Received contact form data:', {
      has_name: !!from_name,
      has_email: !!from_email,
      has_phone: !!phone,
      has_message: !!message,
      has_project: !!project,
      has_timeline: !!timeline
    });

    if (!from_name || !from_email || !phone || !message || !project || !timeline) {
      console.error('Missing required fields:', {
        from_name: !!from_name,
        from_email: !!from_email,
        phone: !!phone,
        message: !!message,
        project: !!project,
        timeline: !!timeline
      });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidEmail(from_email)) {
      console.error('Invalid email format:', from_email);
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const adminVariables = {
      from_name,
      from_email,
      phone,
      company: company || '',
      project_label: getProjectLabel(project),
      budget: budget || '',
      timeline_label: getTimelineLabel(timeline),
      message,
      date: new Date().toLocaleString('fr-FR', { 
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    await sendEmailToService('admin-notification', ADMIN_EMAIL, 'Enzo', adminVariables);

    await sendEmailToService('contact', from_email, from_name, {
      message: 'Votre demande a bien été reçue.'
    });

    try {
      const gotifyMessage = `${from_name} (${from_email}) - ${getProjectLabel(project)} - ${getTimelineLabel(timeline)}`;
      await sendGotifyNotification('Nouveau Contact ZenixWeb', gotifyMessage, 5);
    } catch (err) {
      console.error('Gotify notification error (emails sent successfully):', err.message);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    email_service_url: EMAIL_SERVICE_URL,
    admin_email: ADMIN_EMAIL
  });
});
