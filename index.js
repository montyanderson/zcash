const os = require("os");
const fs = require("fs");
const http = require("http");

const methods = require("./methods");

class Zcash {
	constructor(conf) {
		if(conf.username && conf.password) {
			this.auth = "Basic " + Buffer.from(conf.username + ":" + conf.password).toString("base64");
		}

		this.host = conf.host || "localhost";
		this.port = conf.port || 8232;
	}

	static auto() {
		const lines = fs.readFileSync(os.homedir() + "/.zcash/zcash.conf", "utf8")
			.split("\n");

		lines.pop();

		const config = {};

		lines.forEach(line => {
			const split = line.split("=");
			const key = split.shift();
			const value = split.join("=");
			config[key] = value;
		});

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

			if(this.auth) {
				options.headers.Authorization = this.auth;
			}

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
