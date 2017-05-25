## argv

> A light-weight function argument validator and Inspired by [aproba](https://github.com/iarna/aproba)

### Usage

|type|description|
|:--:|:---------:|
|A|Array|
|S|String|
|N|Number|
|F|Function|
|O|Object|
|B|Boolean|
|E|Error|


```js
function fn() {
  console.log("I am verified in fn");
}

var fnVerified = argv("SN")(fn);

fnVerified('123', 1) // true
fnVerified('123', '23') // false
```