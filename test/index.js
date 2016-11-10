import test from "ava";
import Zcash from "../";

let rpc;

test.serial("Zcash.auto", t => {
	rpc = Zcash.auto();

	t.true(rpc instanceof Zcash);
});

test("Zcash#z_getnewaddress", t => {
	t.plan(1);

	return rpc.z_getnewaddress()
	.then(address => {
		t.is(typeof address, "string");
	});
});

test("Zcash#z_listaddresses", t => {
	t.plan(1);

	return rpc.z_listaddresses()
	.then(addresses => {
		t.true(addresses instanceof Array);
	});
});
