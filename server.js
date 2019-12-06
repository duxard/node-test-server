const http = require("http");
const sendFile = require("./helpers/sendfile");

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer((req, res) => {
  console.log(`Request was made: ${req.url}`);

  switch (req.url) {
    case '/':
      sendFile("index.html", res);
      break;

    case '/test':
      res.writeHead(200, {
        "Content-Type": "text/plaintext",
        "Set-Cookie": "author=AVS"
      });
      // res.setHeader("Set-Cookie", "type=ninja");
      res.end("Test page");
      break;

    default:
      res.statusCode = 404;
      res.end("Not found");
  }

}).listen(port, host, () => {
  console.log(`Server is up and running at ${host}:${port}`);
});
