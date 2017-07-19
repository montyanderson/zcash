# zcash

:dollar: Minimal [Zcash](https://z.cash/) library for Node.js

> Note: This library has been succeeded by the isomorphic library [stdrpc](https://github.com/montyanderson/stdrpc).

```
npm install zcash --save
```

## Features

* A fast, concise codebase, with zero dependencies.
* Supports all commands listed in the [zcash Payment API](https://github.com/zcash/zcash/blob/master/doc/payment-api.md).
* Test suite!

## To Do

* Write a more full test suite.

## API

### Zcash.auto()

Returns a new `Zcash` instance, after reading the username and password from `HOME/.zcash/zcash.conf`. You can then use all the RPC commands as normal.

``` javascript
const rpc = Zcash.auto();

rpc.z_listaddresses().then(addresses => {
	console.log(addresses);
});
```

### new Zcash(options)

Returns a new `Zcash` instances, with the specified options.

#### options

Type: `object`

###### username

The RPC username.

Type: `string`

###### password

The RPC password.

Type: `string`

###### host

The RPC host.

Type: `string`

###### port

The RPC port.

Type: `number`

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
