const stdrpc = require("stdrpc");

module.exports = new Proxy(class ZCash {}, {
	construct: (target, args) =>
		stdrpc({
			url: 'http://localhost:8232'
			...args
		})
});
