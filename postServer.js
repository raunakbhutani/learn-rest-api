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

const handlePOSTReqData = (req, res) => {
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

	if (method === "POST" && pathname === "/users") {
		// console.log('in POST');
		const postData = await handlePOSTReqData(req, res);
		const newUser = {
			id: Date.now(),
			name: postData?.name || 'sample user'
		};
		console.log(postData);
		console.log(newUser);

		users.push(newUser);
		res.statusCode = 201;
		res.end(JSON.stringify(users));
		return;
	}
	else {
		res.statusCode = 404;
		res.end('Not Found!');
	}
});

server.listen(port, () => {
	console.log(`Server running at port ${port}`);
});