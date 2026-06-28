const http = require('http');
const Url = require('url');
const port = 3000;

// i want to fetch these data of users at the '/users' route
const users = [
    {
        id: 1,
        name: 'raunak'
    },
    {
        id: 2,
        name: 'amit'
    },
    {
        id: 3,
        name: 'jyoti'
    },
];

const server = http.createServer((req, res) => {
    console.log('req', req.method, req.url);

    // parse URL and query parameters
    const parsed = Url.parse(req.url, true);
    const pathname = parsed.pathname;
    const query = parsed.query;

    // this is an API to fetch the users at the '/users' route
    if (req.method === 'GET' && pathname === '/users') {
        // if an id query param is provided, return that user
        if (query && query.id) {
            const id = Number(query.id);
            if (Number.isNaN(id)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end(JSON.stringify({ error: 'Invalid id query parameter' }));
                return;
            }
            const user = users.find(u => u.id === id);
            if (!user) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(JSON.stringify({ error: 'User not found' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(user));
            return;
        }

        // otherwise return full list
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(users)); // the chunk shall be a string only
        return; // added return so that program gets executed safely
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');

}).listen(port, () => {
    console.log('server running on port', port);
})
