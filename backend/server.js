const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

const USER_ID = process.env.USER_ID || "mehul_dadlani_07062003";
const EMAIL = process.env.EMAIL || "mm3874@srmist.edu.in";
const ROLL_NUMBER = process.env.ROLL_NUMBER || "RA2111030010227";

const validatePostInput = [
  body('data').isArray().withMessage('data must be an array'),
  body('data.*').isString().withMessage('All items in data must be strings'),
  body('file_b64').optional().isString().withMessage('file_b64 must be a string if provided')
];

const getMimeType = (base64String) => {
  const signatures = {
    '/9j/': 'image/jpeg',
    'iVBORw0KGgo': 'image/png',
    'JVBERi0': 'application/pdf',
    'UEsDBBQAC': 'application/zip',
    'R0lGODlh': 'image/gif',
    'PD94bWwg': 'application/xml',
    'TU0AKg': 'image/tiff'
  };

  for (const [signature, mimeType] of Object.entries(signatures)) {
    if (base64String.startsWith(signature)) {
      return mimeType;
    }
  }

  return 'application/octet-stream';
};

// POST endpoint
app.post('/api/bfhl', validatePostInput, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ is_success: false, errors: errors.array() });
    }

    const { data, file_b64 } = req.body;

    const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
    const alphabets = data.filter(item => isNaN(item) && item.trim() !== '' && item.length === 1);
    const highestLowercase = alphabets
      .filter(char => char.toLowerCase() === char)
      .sort((a, b) => b.localeCompare(a))[0];

    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKb = null;

    if (file_b64) {
      fileValid = true;
      fileMimeType = getMimeType(file_b64);
      fileSizeKb = Math.round((file_b64.length * 3) / 4 / 1024);
    }

    const response = {
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ is_success: false, error: "Internal server error" });
  }
});

// GET endpoint
app.get('/api/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ is_success: false, error: "Something went wrong!" });
});

app.use((req, res) => {
  res.status(404).json({ is_success: false, error: "Not Found" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// For Vercel, we need to export the app
module.exports = app;
