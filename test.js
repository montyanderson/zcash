const zcash = require("./");

const rpc = new zcash({
	username: "username",
	password: "4H5DEbA2Wkk0+ZfIKsAgE0wHL1YlJUuuu3G8Zw3O3Zc="
});

rpc.z_listaddresses().then(addresses => {
	console.log(addresses);
});
