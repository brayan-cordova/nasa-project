require('colors');
const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
    require('colors');

    console.log(`Server running on port...${PORT.toString().bgGreen}`);
});
