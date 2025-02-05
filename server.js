const http = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT_BASE = 7000;
const HTTP_PORT = PORT_BASE + 80;

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(HTTP_PORT, (err) => {
      if (err) throw err;
      console.log(`> HTTP ready on http://localhost:${HTTP_PORT}`);
    });
});
