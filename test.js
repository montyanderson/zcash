const Zcash = require("./");

const rpc = Zcash.auto();

rpc.z_listaddresses().then(addresses => {
	console.log(addresses);
});
