const os = require("os");
const fs = require("fs");
const http = require("http");

const methods = require("./methods");

class Zcash {
	constructor(conf) {
		if(typeof conf.username === "string" && typeof conf.password === "string") {
			this.auth = "Basic " + Buffer.from(conf.username + ":" + conf.password).toString("base64");
		}

		this.host = typeof conf.host === "string" ? conf.host : "localhost";
		this.port = typeof conf.port === "number" ? conf.port : 8232;
	}

	static auto() {
		let lines;

		try {
			lines =
				fs.readFileSync(os.homedir() + "/.zcash/zcash.conf", "utf8")
				.split("\n")
				.filter(l => l.indexOf("=") > 0);
		} catch(error) {
			throw new Error("Unable to read Zcash config file");
		}

		const config = {};

		for(let line of lines) {
			const [ key, ...value ] = line.split("=");
			config[key] = value.join("=");
		}

		if(typeof config.rpcuser !== "string" || typeof config.rpcpassword !== "string") {
			throw new Error("Unable to find 'rpcuser' and 'rpcpassword' in Zcash config file");
		}

		return new Zcash({
			username: config.rpcuser,
			password: config.rpcpassword
		});
	}
};

methods.forEach(method => {
	Zcash.prototype[method] = function() {
		return new Promise((resolve, reject) => {
			const params = [...arguments];

			const postData = JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method, params
			});

			const options = {
				hostname: this.host,
				port: this.port,
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Content-Length": Buffer.byteLength(postData)
				}
			};

			if(this.auth)
				options.headers.Authorization = this.auth;

			const req = http.request(options, (res) => {
				let data = "";

				res.setEncoding("utf8");
				res.on("data", chunk => data += chunk);

				res.on("end", () => {
					let response;

					try {
						response = JSON.parse(data);
					} catch(error) {
						return reject(error);
					}

					if(response.error) {
						return reject(new Error(response.error));
					}

					resolve(response.result);
				});
			});

			req.on("error", reject);

			req.write(postData);
			req.end();
		});
	};
});

module.exports = Zcash;
