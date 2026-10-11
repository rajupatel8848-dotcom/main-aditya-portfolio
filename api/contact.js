// Contact form endpoint. Works on Vercel (api/ folder) and with the local Express server (server.js).
const nodemailer = require('nodemailer');

const TYPES = ['Website', 'Dashboard', 'AI / automation', 'Other'];
const WINDOW_MS = 60 * 60 * 1000; // rate-limit window: 1 hour
const MAX_PER_WINDOW = 5;         // max messages per IP per window (best effort on serverless)
const hits = new Map();

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const oneLine = (s) => String(s == null ? '' : s).replace(/[\r\n]+/g, ' ').trim();

function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) { hits.set(ip, list); return true; }
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return false;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  // Spam checks: honeypot field and "too fast to be human"
  if (body.hp) return res.status(200).json({ ok: true });
  if (Number(body.elapsed) < 1500) return res.status(400).json({ ok: false, error: 'Please try again.' });

  const ip = oneLine((req.headers['x-forwarded-for'] || '').split(',')[0]) || (req.socket && req.socket.remoteAddress) || 'unknown';
  if (limited(ip)) return res.status(429).json({ ok: false, error: 'Too many messages. Please try again later.' });

  const name = oneLine(body.name);
  const email = oneLine(body.email);
  const type = TYPES.includes(body.type) ? body.type : 'Other';
  const message = String(body.message == null ? '' : body.message).trim();

  if (name.length < 2 || name.length > 100) return res.status(400).json({ ok: false, error: 'Please enter your name.' });
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  if (message.length < 10 || message.length > 3000) return res.status(400).json({ ok: false, error: 'Message must be between 10 and 3000 characters.' });

  const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '465', SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error('Contact form is not configured: set SMTP_USER, SMTP_PASS and CONTACT_TO.');
    return res.status(500).json({ ok: false, error: 'The contact service is not set up yet. Please email me directly.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Portfolio contact form" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `Portfolio enquiry - ${type} - ${name}`.slice(0, 150),
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`,
      html: `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Project type:</b> ${esc(type)}</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Sending email failed:', err && err.message);
    return res.status(502).json({ ok: false, error: 'Sorry, the message could not be sent. Please try again or email me directly.' });
  }
};
