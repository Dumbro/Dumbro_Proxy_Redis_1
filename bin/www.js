const PORT = 8000;
const app = require('../app');
const http = require('http');
const server = http.createServer(app);

server.listen(PORT, () => {
  	console.log("start, express server on port : ", PORT);
});

