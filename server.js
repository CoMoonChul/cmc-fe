const http = require('http');
const { parse } = require('url');
const next = require('next');

// const fs = require('fs');
// const https = require('https');
// const { CERT_ROOT, CERT_KEY_PATH, CERT_PATH } = require('./src/cmdUtils/const');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT_BASE = 7000;
const HTTP_PORT = PORT_BASE + 80;
// const SSL_PORT = PORT_BASE + 443;

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(HTTP_PORT, (err) => {
      if (err) throw err;
      console.log(`> HTTP ready on http://localhost:${HTTP_PORT}`);
    });

  // if (fs.existsSync(CERT_ROOT) && fs.existsSync(CERT_KEY_PATH) && fs.readFileSync(CERT_PATH)) {
  //   const options = {
  //     key: fs.readFileSync(CERT_KEY_PATH),
  //     cert: fs.readFileSync(CERT_PATH),
  //   };
  //   https
  //     .createServer(options, (req, res) => {
  //       // Be sure to pass `true` as the second argument to `url.parse`.
  //       // This tells it to parse the query portion of the URL.
  //       const parsedUrl = parse(req.url, true);
  //       handle(req, res, parsedUrl);
  //     })
  //     .listen(SSL_PORT, (err) => {
  //       if (err) throw err;
  //       console.log(`> HTTPS ready on https://localhost:${SSL_PORT}`);
  //     });
  // } else {
  //   console.log(`인증서가 발견되지 않아 HTTPS 서버 실행 안함.`);
  //   console.log('HTTPS 서버를 함께 실행하기 위해서는 pnpm gen-cert를 먼저 실행.');
  //   console.log(
  //     '실행 후 생성된 /cert/local-ca.crt를 브라우저에서 신뢰할수 있는 루트기관 인증서로 등록 후 정상 이용 가능. (등록 후 브라우저 재시작 필요할 수 있음)',
  //   );
  //   console.log(
  //     'MacOS: 키체인 접근 > 로그인 > 인증서 > 파일 > 항목 가져오기 > cert/local-ca.crt 선택 > 추가된 SKT_MAX 인증서 우클릭 > 신뢰 > 이 인증서 사용 시 "항상 신뢰" 설정 후 저장',
  //   );
  // }
});
