# zcash
zcash library for Node

``` javascript
const zcash = require("zcash");

const rpc = new zcash({
	username: "__username__",
	password: "__password__"
});

rpc.z_listaddresses().then(addresses => {
	console.log(addresses);
});
```

```
[ 'zcW36oxxUKViWZsFUb6SUDLr61b3N6EaY9oRt8zPYhxFAUGRwUNCLuGFfd2yxYrDgM5ouLkTDHMRdGNgVqJgriHncbjRedN' ]
```
