# zcash

Minimal [Zcash](https://z.cash/) library for Node.js

```
npm install zcash --save
```

## Features

* A fast, concise codebase, with zero dependencies.
* Supports all commands listed in the [zcash Payment API](https://github.com/zcash/zcash/blob/master/doc/payment-api.md).

``` javascript
const Zcash = require("zcash");

const rpc = new Zcash({
	username: "__username__",
	password: "__password__"
});

rpc.z_listaddresses().then(addresses => {
	console.log(addresses);
});
```

``` javascript
[ 'zcW36oxxUKViWZsFUb6SUDLr61b3N6EaY9oRt8zPYhxFAUGRwUNCLuGFfd2yxYrDgM5ouLkTDHMRdGNgVqJgriHncbjRedN' ]
```
