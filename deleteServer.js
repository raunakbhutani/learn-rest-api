const http = require("http");
const Url = require("url");
const port = 3000;

let users = [
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

const handleDELETEReqData = (req, res) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => body += chunk.toString());
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(error);
            }
        });
    });
}

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    const { query, pathname } = Url.parse(url, true);

    res.setHeader("Content-type", "application/json");

    if (method === "DELETE" && pathname.startsWith('/users/')) { // send the user to be deleted with an ID in the path
        const userIDToDelete = +pathname.split("/")[2];
        
        // delete a particular user with a userID
        const userToDeleteIndex = users.findIndex((ele) => ele.id === +userIDToDelete);
        
        if (userToDeleteIndex === -1) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "User does not exists" }));
            return;
        }

        // delete that user by filtering out their ID
        users = users?.filter((ele) => ele?.id !== +userIDToDelete);
		res.statusCode = 200;
		res.end(JSON.stringify({
				users,
				message: `User with id as ${userIDToDelete} deleted successfully`,
			})
		);
		return;
    } 

    else {
        res.statusCode = 404;
        res.end('Not found!');
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});