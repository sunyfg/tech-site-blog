// 类型转换

// Number 转换
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number("123")); // 123
console.log(Number("123abc")); // NaN
console.log(Number("")); // 0
console.log(Number("0x12")); // 18
// console.log(Number(Symbol("123"))); // 报错 Cannot convert a Symbol value to a number
console.log(Number({})); // NaN
console.log(Number({ toString: () => "11111" })); // 11111
console.log(Number({ toString: () => "abc" })); // NaN
console.log(Number({ valueOf: () => "2222" })); // 2222
console.log(Number([])); // 0
console.log(Number([123])); // 123
console.log(Number([123, 456])); // NaN
console.log(Number([123, "abc"])); // NaN

// parseInt 转换
console.log("-----parseInt-----");
console.log("undefined ->", parseInt(undefined)); // NaN
console.log("null ->", parseInt(null)); // NaN
console.log("true ->", parseInt(true)); // NaN
console.log("false ->", parseInt(false)); // NaN
console.log("123 ->", parseInt("123")); // 123
console.log("123abc ->", parseInt("123abc")); // 123
console.log("abc123 ->", parseInt("abc123")); // NaN
console.log("'' ->", parseInt("")); // NaN
console.log("0x12 ->", parseInt("0x12")); // 18
// console.log("Symbol('123') ->", parseInt(Symbol("123"))); // TypeError: Cannot convert a Symbol value to a string

// String 转换
console.log("-----String-----");
console.log("undefined ->", String(undefined)); // "undefined"
console.log("null ->", String(null)); // "null"
console.log("true ->", String(true)); // "true"
console.log("false ->", String(false)); // "false"
console.log("123 ->", String(123)); // "123"
console.log("NaN ->", String(NaN)); // "NaN"
console.log("Infinity ->", String(Infinity)); // "Infinity"
console.log("Symbol('123') ->", String(Symbol("123"))); // "Symbol(123)"
console.log("[] ->", String([])); // ""
console.log("[123] ->", String([123])); // "123"
console.log("[123, 456] ->", String([123, 456])); // "123,456"
console.log("[123, 'abc'] ->", String([123, "abc"])); // "123,abc"
console.log("({}) ->", String({})); // "[object Object]"
console.log(
  "({toString: () => '11111'}) ->",
  String({ toString: () => "11111" })
); // "11111"
console.log("({toString: () => 'abc'}) ->", String({ toString: () => "abc" })); // "abc"
console.log("({valueOf: () => '2222'}) ->", String({ valueOf: () => "2222" })); // [object Object]

// Boolean 转换

console.log("-----Boolean-----");
console.log("undefined ->", Boolean(undefined)); // false
console.log("null ->", Boolean(null)); // false
console.log("true ->", Boolean(true)); // true
console.log("false ->", Boolean(false)); // false
console.log("123 ->", Boolean(123)); // true
console.log("0 ->", Boolean(0)); // false
console.log("NaN ->", Boolean(NaN)); // false
console.log("Infinity ->", Boolean(Infinity)); // true
console.log("Symbol('123') ->", Boolean(Symbol("123"))); // true
console.log("[] ->", Boolean([])); // true
console.log("[123] ->", Boolean([123])); // true
console.log("[123, 456] ->", Boolean([123, 456])); // true
console.log("[123, 'abc'] ->", Boolean([123, "abc"])); // true
console.log("({}) ->", Boolean({})); // true
console.log(
  "({toString: () => '11111'}) ->",
  Boolean({ toString: () => "11111" })
); // true
console.log("({toString: () => 'abc'}) ->", Boolean({ toString: () => "abc" })); // true
console.log("({valueOf: () => '2222'}) ->", Boolean({ valueOf: () => "2222" })); // true
console.log("({valueOf: () => 0}) ->", Boolean({ valueOf: () => 0 })); // true
console.log("({valueOf: () => null}) ->", Boolean({ valueOf: () => null })); // true
console.log(
  "({valueOf: () => undefined}) ->",
  Boolean({ valueOf: () => undefined })
); // true
console.log("new Boolean(false) ->", Boolean(new Boolean(false))); // true
