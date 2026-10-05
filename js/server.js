const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const Utils = require('./modules/utils');

class Server {
    constructor() {
        this.utils = new Utils();
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true); 
        const pathname = parsedUrl.pathname;

        console.log(`Incoming request path: ${pathname}`);

        res.setHeader('Content-Type', 'text/html');

        try {
            // Part B: Get Date Endpoint
            if (pathname.includes('/getDate')) {
                const name = parsedUrl.query.name || 'Guest';
                const htmlResponse = this.utils.getDate(name);
                res.writeHead(200);
                res.end(htmlResponse); 
            } 
            // Part C.1: Write / Append to file.txt
            else if (pathname.includes('/writeFile')) {
                const text = parsedUrl.query.text;
                if (text) {
                    const filePath = path.join(__dirname, 'file.txt');
                    fs.appendFile(filePath, text + '\n', (err) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Error writing to file');
                        } else {
                            res.writeHead(200);
                            res.end(`Successfully appended: ${text}`);
                        }
                    });
                } else {
                    res.writeHead(400);
                    res.end('Missing text query parameter (?text=...)');
                }
            } 
            // Part C.2: Read file.txt
            else if (pathname.includes('/readFile')) {
                const filePath = path.join(__dirname, 'file.txt');
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(404);
                        res.end(`404 Not Found: file.txt does not exist.`);
                    } else {
                        res.writeHead(200);
                        res.end(`<pre>${data}</pre>`);
                    }
                });
            } else {
                res.writeHead(404);
                res.end(`404 Not Found: ${pathname}`);
            }
        } catch (error) {
            console.error(error);
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    }

    start(port) {
        const server = http.createServer((req, res) => this.handleRequest(req, res));
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}

const PORT = process.env.PORT || 3000;
const myServer = new Server();
myServer.start(PORT);