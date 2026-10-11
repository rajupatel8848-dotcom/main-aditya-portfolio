// Local server: serves /public and the contact API. Run with: npm run dev
require('dotenv').config();
const express = require('express');
const path = require('path');
const contact = require('./api/contact');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '20kb' }));
app.all('/api/contact', contact);
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Portfolio running at http://localhost:${port}`));
