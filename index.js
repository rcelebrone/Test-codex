let express;
try {
  express = require('express');
} catch (err) {
  // Provide a minimal stub when express is not installed, useful for offline tests
  express = () => ({
    get: () => {},
    listen: () => {}
  });
}
const https = require('https');

function fetchGoogle(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.google.com',
      path: '/search?q=' + encodeURIComponent(query),
      headers: { 'User-Agent': 'Mozilla/5.0' }
    };
    https.get(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk.toString();
      });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function fetchRcelebrone(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.rcelebrone.com',
      path: '/search?q=' + encodeURIComponent(query),
      headers: { 'User-Agent': 'Mozilla/5.0' }
    };
    https.get(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk.toString();
      });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractFirstTitle(html) {
  const match = html.match(/<h3[^>]*>(.*?)<\/h3>/i);
  if (match) {
    return match[1].replace(/<[^>]*>/g, '').trim();
  }
  return '';
}

function extractTitles(html) {
  const regex = /<h3[^>]*>(.*?)<\/h3>/gi;
  const titles = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    if (text) {
      titles.push(text);
    }
  }
  return titles;
}

function add(a, b) {
  return a + b;
}

const port = process.env.PORT || 3000;
const app = express();

app.get('/search', async (req, res) => {
  const q = req.query.q;
  if (!q) {
    res.status(400).json({ error: 'Missing q parameter' });
    return;
  }
  try {
    const html = await fetchGoogle(q);
    const title = extractFirstTitle(html);
    res.json({ title });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

app.get('/search-rcelebrone', async (req, res) => {
  const q = req.query.q;
  if (!q) {
    res.status(400).json({ error: 'Missing q parameter' });
    return;
  }
  try {
    const html = await fetchRcelebrone(q);
    const titles = extractTitles(html);
    res.json({ titles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  console.log('Build output: add(2,3) =', add(2,3));
}

module.exports = {
  add,
  fetchGoogle,
  fetchRcelebrone,
  extractFirstTitle,
  extractTitles,
  app,
};
