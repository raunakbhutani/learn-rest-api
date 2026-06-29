const http = require("http");
const Url = require("url");
const port = 3000;

const users = [
    {
        id: 1,
        name: "Shubham",
    },
    {
        id: 2,
        name: "Raj",
    },
    {
        id: 3,
        name: "Shyam",
    },
];

const server = http.createServer((req, res) => {
    const { method, url } = req;
    const { query, pathname } = Url.parse(url, true);

    res.setHeader("Content-type", "application/json");

    if (method === "GET" && pathname === "/users") { // api to get all the users
        if (query.id) {
            const requiredUsers = users.filter(
                (ele, index) => ele.id === +query.id
            );
            res.end(JSON.stringify(requiredUsers));
            return;
        }
        res.end(JSON.stringify(users));
        return;
    }
    else if (method === "GET" && pathname.startsWith("/users")) {
        const pathID = pathname.split('/')[2];
        const requiredUsers = users.filter(
            (ele, index) => ele.id === +pathID
        );
        res.end(JSON.stringify(requiredUsers));
        return;
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});