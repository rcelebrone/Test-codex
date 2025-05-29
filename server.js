const http = require('http');
const https = require('https');
const { URL } = require('url');

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

function extractFirstTitle(html) {
  const match = html.match(/<h3[^>]*>(.*?)<\/h3>/i);
  if (match) {
    return match[1].replace(/<[^>]*>/g, '').trim();
  }
  return '';
}

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/search') {
    const q = url.searchParams.get('q');
    if (!q) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing q parameter' }));
      return;
    }
    try {
      const html = await fetchGoogle(q);
      const title = extractFirstTitle(html);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ title }));
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch results' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = { fetchGoogle, extractFirstTitle, server };
