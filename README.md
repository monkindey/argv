## argv

> a light-weight function argument validator and inspired by [aproba](https://github.com/iarna/aproba)

### Usage

```js
function fn() {
	console.log("I am verified in fn");
}

var fnVerified = argv("SN")(fn);
```