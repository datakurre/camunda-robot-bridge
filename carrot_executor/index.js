'use strict';

var os$3 = require('os');
var require$$0$3 = require('events');
var require$$0$4 = require('url');
var require$$0$2 = require('buffer');
var require$$0 = require('fs');
var require$$0$1 = require('stream');
var require$$1 = require('util');
var require$$3 = require('http');
var require$$4 = require('https');
var require$$0$5 = require('dns');
var require$$0$6 = require('zlib');
var require$$0$7 = require('net');
var path$3 = require('path');
var child_process = require('child_process');
var require$$1$1 = require('tls');
require('assert');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var os__default = /*#__PURE__*/_interopDefaultLegacy(os$3);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
var require$$0__default$4 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
var require$$0__default$5 = /*#__PURE__*/_interopDefaultLegacy(require$$0$5);
var require$$0__default$6 = /*#__PURE__*/_interopDefaultLegacy(require$$0$6);
var require$$0__default$7 = /*#__PURE__*/_interopDefaultLegacy(require$$0$7);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path$3);
var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var source$2 = {exports: {}};

var create = {};

var dist = {exports: {}};

(function (module, exports) {
/// <reference lib="es2018"/>
/// <reference lib="dom"/>
/// <reference types="node"/>
Object.defineProperty(exports, "__esModule", { value: true });
const { toString } = Object.prototype;
const isOfType = (type) => (value) => typeof value === type;
const getObjectType = (value) => {
    const objectName = toString.call(value).slice(8, -1);
    if (objectName) {
        return objectName;
    }
    return undefined;
};
const isObjectOfType = (type) => (value) => getObjectType(value) === type;
function is(value) {
    switch (value) {
        case null:
            return "null" /* null */;
        case true:
        case false:
            return "boolean" /* boolean */;
    }
    switch (typeof value) {
        case 'undefined':
            return "undefined" /* undefined */;
        case 'string':
            return "string" /* string */;
        case 'number':
            return "number" /* number */;
        case 'bigint':
            return "bigint" /* bigint */;
        case 'symbol':
            return "symbol" /* symbol */;
    }
    if (is.function_(value)) {
        return "Function" /* Function */;
    }
    if (is.observable(value)) {
        return "Observable" /* Observable */;
    }
    if (is.array(value)) {
        return "Array" /* Array */;
    }
    if (is.buffer(value)) {
        return "Buffer" /* Buffer */;
    }
    const tagType = getObjectType(value);
    if (tagType) {
        return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError('Please don\'t use object wrappers for primitive types');
    }
    return "Object" /* Object */;
}
is.undefined = isOfType('undefined');
is.string = isOfType('string');
const isNumberType = isOfType('number');
is.number = (value) => isNumberType(value) && !is.nan(value);
is.bigint = isOfType('bigint');
// eslint-disable-next-line @typescript-eslint/ban-types
is.function_ = isOfType('function');
is.null_ = (value) => value === null;
is.class_ = (value) => is.function_(value) && value.toString().startsWith('class ');
is.boolean = (value) => value === true || value === false;
is.symbol = isOfType('symbol');
is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
is.array = Array.isArray;
is.buffer = (value) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.isBuffer) === null || _c === void 0 ? void 0 : _c.call(_b, value)) !== null && _d !== void 0 ? _d : false; };
is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
is.object = (value) => !is.null_(value) && (typeof value === 'object' || is.function_(value));
is.iterable = (value) => { var _a; return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]); };
is.asyncIterable = (value) => { var _a; return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.asyncIterator]); };
is.generator = (value) => is.iterable(value) && is.function_(value.next) && is.function_(value.throw);
is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
is.nativePromise = (value) => isObjectOfType("Promise" /* Promise */)(value);
const hasPromiseAPI = (value) => {
    var _a, _b;
    return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.then) &&
        is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.catch);
};
is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
is.generatorFunction = isObjectOfType("GeneratorFunction" /* GeneratorFunction */);
is.asyncGeneratorFunction = (value) => getObjectType(value) === "AsyncGeneratorFunction" /* AsyncGeneratorFunction */;
is.asyncFunction = (value) => getObjectType(value) === "AsyncFunction" /* AsyncFunction */;
// eslint-disable-next-line no-prototype-builtins, @typescript-eslint/ban-types
is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty('prototype');
is.regExp = isObjectOfType("RegExp" /* RegExp */);
is.date = isObjectOfType("Date" /* Date */);
is.error = isObjectOfType("Error" /* Error */);
is.map = (value) => isObjectOfType("Map" /* Map */)(value);
is.set = (value) => isObjectOfType("Set" /* Set */)(value);
is.weakMap = (value) => isObjectOfType("WeakMap" /* WeakMap */)(value);
is.weakSet = (value) => isObjectOfType("WeakSet" /* WeakSet */)(value);
is.int8Array = isObjectOfType("Int8Array" /* Int8Array */);
is.uint8Array = isObjectOfType("Uint8Array" /* Uint8Array */);
is.uint8ClampedArray = isObjectOfType("Uint8ClampedArray" /* Uint8ClampedArray */);
is.int16Array = isObjectOfType("Int16Array" /* Int16Array */);
is.uint16Array = isObjectOfType("Uint16Array" /* Uint16Array */);
is.int32Array = isObjectOfType("Int32Array" /* Int32Array */);
is.uint32Array = isObjectOfType("Uint32Array" /* Uint32Array */);
is.float32Array = isObjectOfType("Float32Array" /* Float32Array */);
is.float64Array = isObjectOfType("Float64Array" /* Float64Array */);
is.bigInt64Array = isObjectOfType("BigInt64Array" /* BigInt64Array */);
is.bigUint64Array = isObjectOfType("BigUint64Array" /* BigUint64Array */);
is.arrayBuffer = isObjectOfType("ArrayBuffer" /* ArrayBuffer */);
is.sharedArrayBuffer = isObjectOfType("SharedArrayBuffer" /* SharedArrayBuffer */);
is.dataView = isObjectOfType("DataView" /* DataView */);
is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
is.urlInstance = (value) => isObjectOfType("URL" /* URL */)(value);
is.urlString = (value) => {
    if (!is.string(value)) {
        return false;
    }
    try {
        new URL(value); // eslint-disable-line no-new
        return true;
    }
    catch (_a) {
        return false;
    }
};
// TODO: Use the `not` operator with a type guard here when it's available.
// Example: `is.truthy = (value: unknown): value is (not false | not 0 | not '' | not undefined | not null) => Boolean(value);`
is.truthy = (value) => Boolean(value);
// Example: `is.falsy = (value: unknown): value is (not true | 0 | '' | undefined | null) => Boolean(value);`
is.falsy = (value) => !value;
is.nan = (value) => Number.isNaN(value);
const primitiveTypeOfTypes = new Set([
    'undefined',
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol'
]);
is.primitive = (value) => is.null_(value) || primitiveTypeOfTypes.has(typeof value);
is.integer = (value) => Number.isInteger(value);
is.safeInteger = (value) => Number.isSafeInteger(value);
is.plainObject = (value) => {
    // From: https://github.com/sindresorhus/is-plain-obj/blob/master/index.js
    if (getObjectType(value) !== "Object" /* Object */) {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.getPrototypeOf({});
};
const typedArrayTypes = new Set([
    "Int8Array" /* Int8Array */,
    "Uint8Array" /* Uint8Array */,
    "Uint8ClampedArray" /* Uint8ClampedArray */,
    "Int16Array" /* Int16Array */,
    "Uint16Array" /* Uint16Array */,
    "Int32Array" /* Int32Array */,
    "Uint32Array" /* Uint32Array */,
    "Float32Array" /* Float32Array */,
    "Float64Array" /* Float64Array */,
    "BigInt64Array" /* BigInt64Array */,
    "BigUint64Array" /* BigUint64Array */
]);
is.typedArray = (value) => {
    const objectType = getObjectType(value);
    if (objectType === undefined) {
        return false;
    }
    return typedArrayTypes.has(objectType);
};
const isValidLength = (value) => is.safeInteger(value) && value >= 0;
is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
is.inRange = (value, range) => {
    if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
    }
    if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
    }
    throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
};
const NODE_TYPE_ELEMENT = 1;
const DOM_PROPERTIES_TO_CHECK = [
    'innerHTML',
    'ownerDocument',
    'style',
    'attributes',
    'nodeValue'
];
is.domElement = (value) => is.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is.string(value.nodeName) &&
    !is.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every(property => property in value);
is.observable = (value) => {
    var _a, _b, _c, _d;
    if (!value) {
        return false;
    }
    // eslint-disable-next-line no-use-extend-native/no-use-extend-native
    if (value === ((_b = (_a = value)[Symbol.observable]) === null || _b === void 0 ? void 0 : _b.call(_a))) {
        return true;
    }
    if (value === ((_d = (_c = value)['@@observable']) === null || _d === void 0 ? void 0 : _d.call(_c))) {
        return true;
    }
    return false;
};
is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
is.infinite = (value) => value === Infinity || value === -Infinity;
const isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
is.evenInteger = isAbsoluteMod2(0);
is.oddInteger = isAbsoluteMod2(1);
is.emptyArray = (value) => is.array(value) && value.length === 0;
is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
is.emptyString = (value) => is.string(value) && value.length === 0;
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyString = (value) => is.string(value) && value.length > 0;
const isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
// TODO: Use `not` operator here to remove `Map` and `Set` from type guard:
// - https://github.com/Microsoft/TypeScript/pull/29317
is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
is.emptySet = (value) => is.set(value) && value.size === 0;
is.nonEmptySet = (value) => is.set(value) && value.size > 0;
is.emptyMap = (value) => is.map(value) && value.size === 0;
is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
const predicateOnArray = (method, predicate, values) => {
    if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
    if (values.length === 0) {
        throw new TypeError('Invalid number of values');
    }
    return method.call(values, predicate);
};
is.any = (predicate, ...values) => {
    const predicates = is.array(predicate) ? predicate : [predicate];
    return predicates.some(singlePredicate => predicateOnArray(Array.prototype.some, singlePredicate, values));
};
is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
const assertType = (condition, description, value) => {
    if (!condition) {
        throw new TypeError(`Expected value which is \`${description}\`, received value of type \`${is(value)}\`.`);
    }
};
exports.assert = {
    // Unknowns.
    undefined: (value) => assertType(is.undefined(value), "undefined" /* undefined */, value),
    string: (value) => assertType(is.string(value), "string" /* string */, value),
    number: (value) => assertType(is.number(value), "number" /* number */, value),
    bigint: (value) => assertType(is.bigint(value), "bigint" /* bigint */, value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (value) => assertType(is.function_(value), "Function" /* Function */, value),
    null_: (value) => assertType(is.null_(value), "null" /* null */, value),
    class_: (value) => assertType(is.class_(value), "Class" /* class_ */, value),
    boolean: (value) => assertType(is.boolean(value), "boolean" /* boolean */, value),
    symbol: (value) => assertType(is.symbol(value), "symbol" /* symbol */, value),
    numericString: (value) => assertType(is.numericString(value), "string with a number" /* numericString */, value),
    array: (value) => assertType(is.array(value), "Array" /* Array */, value),
    buffer: (value) => assertType(is.buffer(value), "Buffer" /* Buffer */, value),
    nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined" /* nullOrUndefined */, value),
    object: (value) => assertType(is.object(value), "Object" /* Object */, value),
    iterable: (value) => assertType(is.iterable(value), "Iterable" /* iterable */, value),
    asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable" /* asyncIterable */, value),
    generator: (value) => assertType(is.generator(value), "Generator" /* Generator */, value),
    asyncGenerator: (value) => assertType(is.asyncGenerator(value), "AsyncGenerator" /* AsyncGenerator */, value),
    nativePromise: (value) => assertType(is.nativePromise(value), "native Promise" /* nativePromise */, value),
    promise: (value) => assertType(is.promise(value), "Promise" /* Promise */, value),
    generatorFunction: (value) => assertType(is.generatorFunction(value), "GeneratorFunction" /* GeneratorFunction */, value),
    asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), "AsyncGeneratorFunction" /* AsyncGeneratorFunction */, value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (value) => assertType(is.asyncFunction(value), "AsyncFunction" /* AsyncFunction */, value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (value) => assertType(is.boundFunction(value), "Function" /* Function */, value),
    regExp: (value) => assertType(is.regExp(value), "RegExp" /* RegExp */, value),
    date: (value) => assertType(is.date(value), "Date" /* Date */, value),
    error: (value) => assertType(is.error(value), "Error" /* Error */, value),
    map: (value) => assertType(is.map(value), "Map" /* Map */, value),
    set: (value) => assertType(is.set(value), "Set" /* Set */, value),
    weakMap: (value) => assertType(is.weakMap(value), "WeakMap" /* WeakMap */, value),
    weakSet: (value) => assertType(is.weakSet(value), "WeakSet" /* WeakSet */, value),
    int8Array: (value) => assertType(is.int8Array(value), "Int8Array" /* Int8Array */, value),
    uint8Array: (value) => assertType(is.uint8Array(value), "Uint8Array" /* Uint8Array */, value),
    uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), "Uint8ClampedArray" /* Uint8ClampedArray */, value),
    int16Array: (value) => assertType(is.int16Array(value), "Int16Array" /* Int16Array */, value),
    uint16Array: (value) => assertType(is.uint16Array(value), "Uint16Array" /* Uint16Array */, value),
    int32Array: (value) => assertType(is.int32Array(value), "Int32Array" /* Int32Array */, value),
    uint32Array: (value) => assertType(is.uint32Array(value), "Uint32Array" /* Uint32Array */, value),
    float32Array: (value) => assertType(is.float32Array(value), "Float32Array" /* Float32Array */, value),
    float64Array: (value) => assertType(is.float64Array(value), "Float64Array" /* Float64Array */, value),
    bigInt64Array: (value) => assertType(is.bigInt64Array(value), "BigInt64Array" /* BigInt64Array */, value),
    bigUint64Array: (value) => assertType(is.bigUint64Array(value), "BigUint64Array" /* BigUint64Array */, value),
    arrayBuffer: (value) => assertType(is.arrayBuffer(value), "ArrayBuffer" /* ArrayBuffer */, value),
    sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), "SharedArrayBuffer" /* SharedArrayBuffer */, value),
    dataView: (value) => assertType(is.dataView(value), "DataView" /* DataView */, value),
    urlInstance: (value) => assertType(is.urlInstance(value), "URL" /* URL */, value),
    urlString: (value) => assertType(is.urlString(value), "string with a URL" /* urlString */, value),
    truthy: (value) => assertType(is.truthy(value), "truthy" /* truthy */, value),
    falsy: (value) => assertType(is.falsy(value), "falsy" /* falsy */, value),
    nan: (value) => assertType(is.nan(value), "NaN" /* nan */, value),
    primitive: (value) => assertType(is.primitive(value), "primitive" /* primitive */, value),
    integer: (value) => assertType(is.integer(value), "integer" /* integer */, value),
    safeInteger: (value) => assertType(is.safeInteger(value), "integer" /* safeInteger */, value),
    plainObject: (value) => assertType(is.plainObject(value), "plain object" /* plainObject */, value),
    typedArray: (value) => assertType(is.typedArray(value), "TypedArray" /* typedArray */, value),
    arrayLike: (value) => assertType(is.arrayLike(value), "array-like" /* arrayLike */, value),
    domElement: (value) => assertType(is.domElement(value), "Element" /* domElement */, value),
    observable: (value) => assertType(is.observable(value), "Observable" /* Observable */, value),
    nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream" /* nodeStream */, value),
    infinite: (value) => assertType(is.infinite(value), "infinite number" /* infinite */, value),
    emptyArray: (value) => assertType(is.emptyArray(value), "empty array" /* emptyArray */, value),
    nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array" /* nonEmptyArray */, value),
    emptyString: (value) => assertType(is.emptyString(value), "empty string" /* emptyString */, value),
    nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string" /* nonEmptyString */, value),
    emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace" /* emptyStringOrWhitespace */, value),
    emptyObject: (value) => assertType(is.emptyObject(value), "empty object" /* emptyObject */, value),
    nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object" /* nonEmptyObject */, value),
    emptySet: (value) => assertType(is.emptySet(value), "empty set" /* emptySet */, value),
    nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set" /* nonEmptySet */, value),
    emptyMap: (value) => assertType(is.emptyMap(value), "empty map" /* emptyMap */, value),
    nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map" /* nonEmptyMap */, value),
    // Numbers.
    evenInteger: (value) => assertType(is.evenInteger(value), "even integer" /* evenInteger */, value),
    oddInteger: (value) => assertType(is.oddInteger(value), "odd integer" /* oddInteger */, value),
    // Two arguments.
    directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T" /* directInstanceOf */, instance),
    inRange: (value, range) => assertType(is.inRange(value, range), "in range" /* inRange */, value),
    // Variadic functions.
    any: (predicate, ...values) => assertType(is.any(predicate, ...values), "predicate returns truthy for any value" /* any */, values),
    all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values" /* all */, values)
};
// Some few keywords are reserved, but we'll populate them for Node.js users
// See https://github.com/Microsoft/TypeScript/issues/2536
Object.defineProperties(is, {
    class: {
        value: is.class_
    },
    function: {
        value: is.function_
    },
    null: {
        value: is.null_
    }
});
Object.defineProperties(exports.assert, {
    class: {
        value: exports.assert.class_
    },
    function: {
        value: exports.assert.function_
    },
    null: {
        value: exports.assert.null_
    }
});
exports.default = is;
// For CommonJS default export support
module.exports = is;
module.exports.default = is;
module.exports.assert = exports.assert;
}(dist, dist.exports));

var asPromise$1 = {};

var getStream$3 = {exports: {}};

var once$3 = {exports: {}};

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
var wrappy_1 = wrappy$1;
function wrappy$1 (fn, cb) {
  if (fn && cb) return wrappy$1(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length-1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret
  }
}

var wrappy = wrappy_1;
once$3.exports = wrappy(once$2);
once$3.exports.strict = wrappy(onceStrict);

once$2.proto = once$2(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once$2(this)
    },
    configurable: true
  });

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  });
});

function once$2 (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f
}

var once$1 = once$3.exports;

var noop$2 = function() {};

var isRequest$1 = function(stream) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function(stream) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos$1 = function(stream, opts, callback) {
	if (typeof opts === 'function') return eos$1(stream, null, opts);
	if (!opts) opts = {};

	callback = once$1(callback || noop$2);

	var ws = stream._writableState;
	var rs = stream._readableState;
	var readable = opts.readable || (opts.readable !== false && stream.readable);
	var writable = opts.writable || (opts.writable !== false && stream.writable);
	var cancelled = false;

	var onlegacyfinish = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit = function(exitCode) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onerror = function(err) {
		callback.call(stream, err);
	};

	var onclose = function() {
		process.nextTick(onclosenexttick);
	};

	var onclosenexttick = function() {
		if (cancelled) return;
		if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
	};

	var onrequest = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest$1(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', onerror);
	stream.on('close', onclose);

	return function() {
		cancelled = true;
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', onerror);
		stream.removeListener('close', onclose);
	};
};

var endOfStream = eos$1;

var once = once$3.exports;
var eos = endOfStream;
var fs$2 = require$$0__default['default']; // we only need fs to get the ReadStream and WriteStream prototypes

var noop$1 = function () {};
var ancient = /^v?\.0/.test(process.version);

var isFn = function (fn) {
  return typeof fn === 'function'
};

var isFS = function (stream) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs$2) return false // browser
  return (stream instanceof (fs$2.ReadStream || noop$1) || stream instanceof (fs$2.WriteStream || noop$1)) && isFn(stream.close)
};

var isRequest = function (stream) {
  return stream.setHeader && isFn(stream.abort)
};

var destroyer = function (stream, reading, writing, callback) {
  callback = once(callback);

  var closed = false;
  stream.on('close', function () {
    closed = true;
  });

  eos(stream, {readable: reading, writable: writing}, function (err) {
    if (err) return callback(err)
    closed = true;
    callback();
  });

  var destroyed = false;
  return function (err) {
    if (closed) return
    if (destroyed) return
    destroyed = true;

    if (isFS(stream)) return stream.close(noop$1) // use close for fs streams to avoid fd leaks
    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'));
  }
};

var call = function (fn) {
  fn();
};

var pipe = function (from, to) {
  return from.pipe(to)
};

var pump$1 = function () {
  var streams = Array.prototype.slice.call(arguments);
  var callback = isFn(streams[streams.length - 1] || noop$1) && streams.pop() || noop$1;

  if (Array.isArray(streams[0])) streams = streams[0];
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return
      destroys.forEach(call);
      callback(error);
    })
  });

  return streams.reduce(pipe)
};

var pump_1 = pump$1;

const {PassThrough: PassThroughStream$1} = require$$0__default$1['default'];

var bufferStream$1 = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream$1({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};

const {constants: BufferConstants} = require$$0__default$2['default'];
const pump = pump_1;
const bufferStream = bufferStream$1;

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream$2(inputStream, options) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;

	let stream;
	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		stream = pump(inputStream, bufferStream(options), error => {
			if (error) {
				rejectPromise(error);
				return;
			}

			resolve();
		});

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

getStream$3.exports = getStream$2;
// TODO: Remove this for the next major release
getStream$3.exports.default = getStream$2;
getStream$3.exports.buffer = (stream, options) => getStream$2(stream, {...options, encoding: 'buffer'});
getStream$3.exports.array = (stream, options) => getStream$2(stream, {...options, array: true});
getStream$3.exports.MaxBufferError = MaxBufferError;

var pCancelable = {exports: {}};

class CancelError extends Error {
	constructor(reason) {
		super(reason || 'Promise was canceled');
		this.name = 'CancelError';
	}

	get isCanceled() {
		return true;
	}
}

class PCancelable$1 {
	static fn(userFn) {
		return (...arguments_) => {
			return new PCancelable$1((resolve, reject, onCancel) => {
				arguments_.push(onCancel);
				// eslint-disable-next-line promise/prefer-await-to-then
				userFn(...arguments_).then(resolve, reject);
			});
		};
	}

	constructor(executor) {
		this._cancelHandlers = [];
		this._isPending = true;
		this._isCanceled = false;
		this._rejectOnCancel = true;

		this._promise = new Promise((resolve, reject) => {
			this._reject = reject;

			const onResolve = value => {
				if (!this._isCanceled || !onCancel.shouldReject) {
					this._isPending = false;
					resolve(value);
				}
			};

			const onReject = error => {
				this._isPending = false;
				reject(error);
			};

			const onCancel = handler => {
				if (!this._isPending) {
					throw new Error('The `onCancel` handler was attached after the promise settled.');
				}

				this._cancelHandlers.push(handler);
			};

			Object.defineProperties(onCancel, {
				shouldReject: {
					get: () => this._rejectOnCancel,
					set: boolean => {
						this._rejectOnCancel = boolean;
					}
				}
			});

			return executor(onResolve, onReject, onCancel);
		});
	}

	then(onFulfilled, onRejected) {
		// eslint-disable-next-line promise/prefer-await-to-then
		return this._promise.then(onFulfilled, onRejected);
	}

	catch(onRejected) {
		return this._promise.catch(onRejected);
	}

	finally(onFinally) {
		return this._promise.finally(onFinally);
	}

	cancel(reason) {
		if (!this._isPending || this._isCanceled) {
			return;
		}

		this._isCanceled = true;

		if (this._cancelHandlers.length > 0) {
			try {
				for (const handler of this._cancelHandlers) {
					handler();
				}
			} catch (error) {
				this._reject(error);
				return;
			}
		}

		if (this._rejectOnCancel) {
			this._reject(new CancelError(reason));
		}
	}

	get isCanceled() {
		return this._isCanceled;
	}
}

Object.setPrototypeOf(PCancelable$1.prototype, Promise.prototype);

pCancelable.exports = PCancelable$1;
pCancelable.exports.CancelError = CancelError;

var errors$2 = {};

Object.defineProperty(errors$2, "__esModule", { value: true });
const is_1$9 = dist.exports;
class GotError$1 extends Error {
    constructor(message, error, options) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'GotError';
        if (!is_1$9.default.undefined(error.code)) {
            this.code = error.code;
        }
        Object.defineProperty(this, 'options', {
            // This fails because of TS 3.7.2 useDefineForClassFields
            // Ref: https://github.com/microsoft/TypeScript/issues/34972
            enumerable: false,
            value: options
        });
        // Recover the original stacktrace
        if (!is_1$9.default.undefined(error.stack)) {
            const indexOfMessage = this.stack.indexOf(this.message) + this.message.length;
            const thisStackTrace = this.stack.slice(indexOfMessage).split('\n').reverse();
            const errorStackTrace = error.stack.slice(error.stack.indexOf(error.message) + error.message.length).split('\n').reverse();
            // Remove duplicated traces
            while (errorStackTrace.length !== 0 && errorStackTrace[0] === thisStackTrace[0]) {
                thisStackTrace.shift();
            }
            this.stack = `${this.stack.slice(0, indexOfMessage)}${thisStackTrace.reverse().join('\n')}${errorStackTrace.reverse().join('\n')}`;
        }
    }
}
errors$2.GotError = GotError$1;
class CacheError extends GotError$1 {
    constructor(error, options) {
        super(error.message, error, options);
        this.name = 'CacheError';
    }
}
errors$2.CacheError = CacheError;
class RequestError extends GotError$1 {
    constructor(error, options) {
        super(error.message, error, options);
        this.name = 'RequestError';
    }
}
errors$2.RequestError = RequestError;
class ReadError extends GotError$1 {
    constructor(error, options) {
        super(error.message, error, options);
        this.name = 'ReadError';
    }
}
errors$2.ReadError = ReadError;
class ParseError extends GotError$1 {
    constructor(error, response, options) {
        super(`${error.message} in "${options.url.toString()}"`, error, options);
        this.name = 'ParseError';
        Object.defineProperty(this, 'response', {
            enumerable: false,
            value: response
        });
    }
}
errors$2.ParseError = ParseError;
class HTTPError extends GotError$1 {
    constructor(response, options) {
        super(`Response code ${response.statusCode} (${response.statusMessage})`, {}, options);
        this.name = 'HTTPError';
        Object.defineProperty(this, 'response', {
            enumerable: false,
            value: response
        });
    }
}
errors$2.HTTPError = HTTPError;
class MaxRedirectsError extends GotError$1 {
    constructor(response, maxRedirects, options) {
        super(`Redirected ${maxRedirects} times. Aborting.`, {}, options);
        this.name = 'MaxRedirectsError';
        Object.defineProperty(this, 'response', {
            enumerable: false,
            value: response
        });
    }
}
errors$2.MaxRedirectsError = MaxRedirectsError;
class UnsupportedProtocolError extends GotError$1 {
    constructor(options) {
        super(`Unsupported protocol "${options.url.protocol}"`, {}, options);
        this.name = 'UnsupportedProtocolError';
    }
}
errors$2.UnsupportedProtocolError = UnsupportedProtocolError;
class TimeoutError$2 extends GotError$1 {
    constructor(error, timings, options) {
        super(error.message, error, options);
        this.name = 'TimeoutError';
        this.event = error.event;
        this.timings = timings;
    }
}
errors$2.TimeoutError = TimeoutError$2;
var p_cancelable_1 = pCancelable.exports;
errors$2.CancelError = p_cancelable_1.CancelError;

var normalizeArguments = {exports: {}};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
const DATA_URL_DEFAULT_MIME_TYPE = 'text/plain';
const DATA_URL_DEFAULT_CHARSET = 'us-ascii';

const testParameter = (name, filters) => {
	return filters.some(filter => filter instanceof RegExp ? filter.test(name) : filter === name);
};

const normalizeDataURL = (urlString, {stripHash}) => {
	const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);

	if (!match) {
		throw new Error(`Invalid URL: ${urlString}`);
	}

	let {type, data, hash} = match.groups;
	const mediaType = type.split(';');
	hash = stripHash ? '' : hash;

	let isBase64 = false;
	if (mediaType[mediaType.length - 1] === 'base64') {
		mediaType.pop();
		isBase64 = true;
	}

	// Lowercase MIME type
	const mimeType = (mediaType.shift() || '').toLowerCase();
	const attributes = mediaType
		.map(attribute => {
			let [key, value = ''] = attribute.split('=').map(string => string.trim());

			// Lowercase `charset`
			if (key === 'charset') {
				value = value.toLowerCase();

				if (value === DATA_URL_DEFAULT_CHARSET) {
					return '';
				}
			}

			return `${key}${value ? `=${value}` : ''}`;
		})
		.filter(Boolean);

	const normalizedMediaType = [
		...attributes
	];

	if (isBase64) {
		normalizedMediaType.push('base64');
	}

	if (normalizedMediaType.length !== 0 || (mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE)) {
		normalizedMediaType.unshift(mimeType);
	}

	return `data:${normalizedMediaType.join(';')},${isBase64 ? data.trim() : data}${hash ? `#${hash}` : ''}`;
};

const normalizeUrl$1 = (urlString, options) => {
	options = {
		defaultProtocol: 'http:',
		normalizeProtocol: true,
		forceHttp: false,
		forceHttps: false,
		stripAuthentication: true,
		stripHash: false,
		stripTextFragment: true,
		stripWWW: true,
		removeQueryParameters: [/^utm_\w+/i],
		removeTrailingSlash: true,
		removeSingleSlash: true,
		removeDirectoryIndex: false,
		sortQueryParameters: true,
		...options
	};

	urlString = urlString.trim();

	// Data URL
	if (/^data:/i.test(urlString)) {
		return normalizeDataURL(urlString, options);
	}

	if (/^view-source:/i.test(urlString)) {
		throw new Error('`view-source:` is not supported as it is a non-standard protocol');
	}

	const hasRelativeProtocol = urlString.startsWith('//');
	const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);

	// Prepend protocol
	if (!isRelativeUrl) {
		urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
	}

	const urlObj = new URL(urlString);

	if (options.forceHttp && options.forceHttps) {
		throw new Error('The `forceHttp` and `forceHttps` options cannot be used together');
	}

	if (options.forceHttp && urlObj.protocol === 'https:') {
		urlObj.protocol = 'http:';
	}

	if (options.forceHttps && urlObj.protocol === 'http:') {
		urlObj.protocol = 'https:';
	}

	// Remove auth
	if (options.stripAuthentication) {
		urlObj.username = '';
		urlObj.password = '';
	}

	// Remove hash
	if (options.stripHash) {
		urlObj.hash = '';
	} else if (options.stripTextFragment) {
		urlObj.hash = urlObj.hash.replace(/#?:~:text.*?$/i, '');
	}

	// Remove duplicate slashes if not preceded by a protocol
	if (urlObj.pathname) {
		urlObj.pathname = urlObj.pathname.replace(/(?<!\b(?:[a-z][a-z\d+\-.]{1,50}:))\/{2,}/g, '/');
	}

	// Decode URI octets
	if (urlObj.pathname) {
		try {
			urlObj.pathname = decodeURI(urlObj.pathname);
		} catch (_) {}
	}

	// Remove directory index
	if (options.removeDirectoryIndex === true) {
		options.removeDirectoryIndex = [/^index\.[a-z]+$/];
	}

	if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
		let pathComponents = urlObj.pathname.split('/');
		const lastComponent = pathComponents[pathComponents.length - 1];

		if (testParameter(lastComponent, options.removeDirectoryIndex)) {
			pathComponents = pathComponents.slice(0, pathComponents.length - 1);
			urlObj.pathname = pathComponents.slice(1).join('/') + '/';
		}
	}

	if (urlObj.hostname) {
		// Remove trailing dot
		urlObj.hostname = urlObj.hostname.replace(/\.$/, '');

		// Remove `www.`
		if (options.stripWWW && /^www\.(?!www\.)(?:[a-z\-\d]{1,63})\.(?:[a-z.\-\d]{2,63})$/.test(urlObj.hostname)) {
			// Each label should be max 63 at length (min: 1).
			// Source: https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
			// Each TLD should be up to 63 characters long (min: 2).
			// It is technically possible to have a single character TLD, but none currently exist.
			urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
		}
	}

	// Remove query unwanted parameters
	if (Array.isArray(options.removeQueryParameters)) {
		for (const key of [...urlObj.searchParams.keys()]) {
			if (testParameter(key, options.removeQueryParameters)) {
				urlObj.searchParams.delete(key);
			}
		}
	}

	if (options.removeQueryParameters === true) {
		urlObj.search = '';
	}

	// Sort query parameters
	if (options.sortQueryParameters) {
		urlObj.searchParams.sort();
	}

	if (options.removeTrailingSlash) {
		urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
	}

	const oldUrlString = urlString;

	// Take advantage of many of the Node `url` normalizations
	urlString = urlObj.toString();

	if (!options.removeSingleSlash && urlObj.pathname === '/' && !oldUrlString.endsWith('/') && urlObj.hash === '') {
		urlString = urlString.replace(/\/$/, '');
	}

	// Remove ending `/` unless removeSingleSlash is false
	if ((options.removeTrailingSlash || urlObj.pathname === '/') && urlObj.hash === '' && options.removeSingleSlash) {
		urlString = urlString.replace(/\/$/, '');
	}

	// Restore relative protocol, if applicable
	if (hasRelativeProtocol && !options.normalizeProtocol) {
		urlString = urlString.replace(/^http:\/\//, '//');
	}

	// Remove http/https
	if (options.stripProtocol) {
		urlString = urlString.replace(/^(?:https?:)?\/\//, '');
	}

	return urlString;
};

var normalizeUrl_1 = normalizeUrl$1;

// rfc7231 6.1
const statusCodeCacheableByDefault = new Set([
    200,
    203,
    204,
    206,
    300,
    301,
    404,
    405,
    410,
    414,
    501,
]);

// This implementation does not understand partial responses (206)
const understoodStatuses = new Set([
    200,
    203,
    204,
    300,
    301,
    302,
    303,
    307,
    308,
    404,
    405,
    410,
    414,
    501,
]);

const errorStatusCodes = new Set([
    500,
    502,
    503, 
    504,
]);

const hopByHopHeaders = {
    date: true, // included, because we add Age update Date
    connection: true,
    'keep-alive': true,
    'proxy-authenticate': true,
    'proxy-authorization': true,
    te: true,
    trailer: true,
    'transfer-encoding': true,
    upgrade: true,
};

const excludedFromRevalidationUpdate = {
    // Since the old body is reused, it doesn't make sense to change properties of the body
    'content-length': true,
    'content-encoding': true,
    'transfer-encoding': true,
    'content-range': true,
};

function toNumberOrZero(s) {
    const n = parseInt(s, 10);
    return isFinite(n) ? n : 0;
}

// RFC 5861
function isErrorResponse(response) {
    // consider undefined response as faulty
    if(!response) {
        return true
    }
    return errorStatusCodes.has(response.status);
}

function parseCacheControl(header) {
    const cc = {};
    if (!header) return cc;

    // TODO: When there is more than one value present for a given directive (e.g., two Expires header fields, multiple Cache-Control: max-age directives),
    // the directive's value is considered invalid. Caches are encouraged to consider responses that have invalid freshness information to be stale
    const parts = header.trim().split(/\s*,\s*/); // TODO: lame parsing
    for (const part of parts) {
        const [k, v] = part.split(/\s*=\s*/, 2);
        cc[k] = v === undefined ? true : v.replace(/^"|"$/g, ''); // TODO: lame unquoting
    }

    return cc;
}

function formatCacheControl(cc) {
    let parts = [];
    for (const k in cc) {
        const v = cc[k];
        parts.push(v === true ? k : k + '=' + v);
    }
    if (!parts.length) {
        return undefined;
    }
    return parts.join(', ');
}

var httpCacheSemantics = class CachePolicy {
    constructor(
        req,
        res,
        {
            shared,
            cacheHeuristic,
            immutableMinTimeToLive,
            ignoreCargoCult,
            _fromObject,
        } = {}
    ) {
        if (_fromObject) {
            this._fromObject(_fromObject);
            return;
        }

        if (!res || !res.headers) {
            throw Error('Response headers missing');
        }
        this._assertRequestHasHeaders(req);

        this._responseTime = this.now();
        this._isShared = shared !== false;
        this._cacheHeuristic =
            undefined !== cacheHeuristic ? cacheHeuristic : 0.1; // 10% matches IE
        this._immutableMinTtl =
            undefined !== immutableMinTimeToLive
                ? immutableMinTimeToLive
                : 24 * 3600 * 1000;

        this._status = 'status' in res ? res.status : 200;
        this._resHeaders = res.headers;
        this._rescc = parseCacheControl(res.headers['cache-control']);
        this._method = 'method' in req ? req.method : 'GET';
        this._url = req.url;
        this._host = req.headers.host;
        this._noAuthorization = !req.headers.authorization;
        this._reqHeaders = res.headers.vary ? req.headers : null; // Don't keep all request headers if they won't be used
        this._reqcc = parseCacheControl(req.headers['cache-control']);

        // Assume that if someone uses legacy, non-standard uncecessary options they don't understand caching,
        // so there's no point stricly adhering to the blindly copy&pasted directives.
        if (
            ignoreCargoCult &&
            'pre-check' in this._rescc &&
            'post-check' in this._rescc
        ) {
            delete this._rescc['pre-check'];
            delete this._rescc['post-check'];
            delete this._rescc['no-cache'];
            delete this._rescc['no-store'];
            delete this._rescc['must-revalidate'];
            this._resHeaders = Object.assign({}, this._resHeaders, {
                'cache-control': formatCacheControl(this._rescc),
            });
            delete this._resHeaders.expires;
            delete this._resHeaders.pragma;
        }

        // When the Cache-Control header field is not present in a request, caches MUST consider the no-cache request pragma-directive
        // as having the same effect as if "Cache-Control: no-cache" were present (see Section 5.2.1).
        if (
            res.headers['cache-control'] == null &&
            /no-cache/.test(res.headers.pragma)
        ) {
            this._rescc['no-cache'] = true;
        }
    }

    now() {
        return Date.now();
    }

    storable() {
        // The "no-store" request directive indicates that a cache MUST NOT store any part of either this request or any response to it.
        return !!(
            !this._reqcc['no-store'] &&
            // A cache MUST NOT store a response to any request, unless:
            // The request method is understood by the cache and defined as being cacheable, and
            ('GET' === this._method ||
                'HEAD' === this._method ||
                ('POST' === this._method && this._hasExplicitExpiration())) &&
            // the response status code is understood by the cache, and
            understoodStatuses.has(this._status) &&
            // the "no-store" cache directive does not appear in request or response header fields, and
            !this._rescc['no-store'] &&
            // the "private" response directive does not appear in the response, if the cache is shared, and
            (!this._isShared || !this._rescc.private) &&
            // the Authorization header field does not appear in the request, if the cache is shared,
            (!this._isShared ||
                this._noAuthorization ||
                this._allowsStoringAuthenticated()) &&
            // the response either:
            // contains an Expires header field, or
            (this._resHeaders.expires ||
                // contains a max-age response directive, or
                // contains a s-maxage response directive and the cache is shared, or
                // contains a public response directive.
                this._rescc['max-age'] ||
                (this._isShared && this._rescc['s-maxage']) ||
                this._rescc.public ||
                // has a status code that is defined as cacheable by default
                statusCodeCacheableByDefault.has(this._status))
        );
    }

    _hasExplicitExpiration() {
        // 4.2.1 Calculating Freshness Lifetime
        return (
            (this._isShared && this._rescc['s-maxage']) ||
            this._rescc['max-age'] ||
            this._resHeaders.expires
        );
    }

    _assertRequestHasHeaders(req) {
        if (!req || !req.headers) {
            throw Error('Request headers missing');
        }
    }

    satisfiesWithoutRevalidation(req) {
        this._assertRequestHasHeaders(req);

        // When presented with a request, a cache MUST NOT reuse a stored response, unless:
        // the presented request does not contain the no-cache pragma (Section 5.4), nor the no-cache cache directive,
        // unless the stored response is successfully validated (Section 4.3), and
        const requestCC = parseCacheControl(req.headers['cache-control']);
        if (requestCC['no-cache'] || /no-cache/.test(req.headers.pragma)) {
            return false;
        }

        if (requestCC['max-age'] && this.age() > requestCC['max-age']) {
            return false;
        }

        if (
            requestCC['min-fresh'] &&
            this.timeToLive() < 1000 * requestCC['min-fresh']
        ) {
            return false;
        }

        // the stored response is either:
        // fresh, or allowed to be served stale
        if (this.stale()) {
            const allowsStale =
                requestCC['max-stale'] &&
                !this._rescc['must-revalidate'] &&
                (true === requestCC['max-stale'] ||
                    requestCC['max-stale'] > this.age() - this.maxAge());
            if (!allowsStale) {
                return false;
            }
        }

        return this._requestMatches(req, false);
    }

    _requestMatches(req, allowHeadMethod) {
        // The presented effective request URI and that of the stored response match, and
        return (
            (!this._url || this._url === req.url) &&
            this._host === req.headers.host &&
            // the request method associated with the stored response allows it to be used for the presented request, and
            (!req.method ||
                this._method === req.method ||
                (allowHeadMethod && 'HEAD' === req.method)) &&
            // selecting header fields nominated by the stored response (if any) match those presented, and
            this._varyMatches(req)
        );
    }

    _allowsStoringAuthenticated() {
        //  following Cache-Control response directives (Section 5.2.2) have such an effect: must-revalidate, public, and s-maxage.
        return (
            this._rescc['must-revalidate'] ||
            this._rescc.public ||
            this._rescc['s-maxage']
        );
    }

    _varyMatches(req) {
        if (!this._resHeaders.vary) {
            return true;
        }

        // A Vary header field-value of "*" always fails to match
        if (this._resHeaders.vary === '*') {
            return false;
        }

        const fields = this._resHeaders.vary
            .trim()
            .toLowerCase()
            .split(/\s*,\s*/);
        for (const name of fields) {
            if (req.headers[name] !== this._reqHeaders[name]) return false;
        }
        return true;
    }

    _copyWithoutHopByHopHeaders(inHeaders) {
        const headers = {};
        for (const name in inHeaders) {
            if (hopByHopHeaders[name]) continue;
            headers[name] = inHeaders[name];
        }
        // 9.1.  Connection
        if (inHeaders.connection) {
            const tokens = inHeaders.connection.trim().split(/\s*,\s*/);
            for (const name of tokens) {
                delete headers[name];
            }
        }
        if (headers.warning) {
            const warnings = headers.warning.split(/,/).filter(warning => {
                return !/^\s*1[0-9][0-9]/.test(warning);
            });
            if (!warnings.length) {
                delete headers.warning;
            } else {
                headers.warning = warnings.join(',').trim();
            }
        }
        return headers;
    }

    responseHeaders() {
        const headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
        const age = this.age();

        // A cache SHOULD generate 113 warning if it heuristically chose a freshness
        // lifetime greater than 24 hours and the response's age is greater than 24 hours.
        if (
            age > 3600 * 24 &&
            !this._hasExplicitExpiration() &&
            this.maxAge() > 3600 * 24
        ) {
            headers.warning =
                (headers.warning ? `${headers.warning}, ` : '') +
                '113 - "rfc7234 5.5.4"';
        }
        headers.age = `${Math.round(age)}`;
        headers.date = new Date(this.now()).toUTCString();
        return headers;
    }

    /**
     * Value of the Date response header or current time if Date was invalid
     * @return timestamp
     */
    date() {
        const serverDate = Date.parse(this._resHeaders.date);
        if (isFinite(serverDate)) {
            return serverDate;
        }
        return this._responseTime;
    }

    /**
     * Value of the Age header, in seconds, updated for the current time.
     * May be fractional.
     *
     * @return Number
     */
    age() {
        let age = this._ageValue();

        const residentTime = (this.now() - this._responseTime) / 1000;
        return age + residentTime;
    }

    _ageValue() {
        return toNumberOrZero(this._resHeaders.age);
    }

    /**
     * Value of applicable max-age (or heuristic equivalent) in seconds. This counts since response's `Date`.
     *
     * For an up-to-date value, see `timeToLive()`.
     *
     * @return Number
     */
    maxAge() {
        if (!this.storable() || this._rescc['no-cache']) {
            return 0;
        }

        // Shared responses with cookies are cacheable according to the RFC, but IMHO it'd be unwise to do so by default
        // so this implementation requires explicit opt-in via public header
        if (
            this._isShared &&
            (this._resHeaders['set-cookie'] &&
                !this._rescc.public &&
                !this._rescc.immutable)
        ) {
            return 0;
        }

        if (this._resHeaders.vary === '*') {
            return 0;
        }

        if (this._isShared) {
            if (this._rescc['proxy-revalidate']) {
                return 0;
            }
            // if a response includes the s-maxage directive, a shared cache recipient MUST ignore the Expires field.
            if (this._rescc['s-maxage']) {
                return toNumberOrZero(this._rescc['s-maxage']);
            }
        }

        // If a response includes a Cache-Control field with the max-age directive, a recipient MUST ignore the Expires field.
        if (this._rescc['max-age']) {
            return toNumberOrZero(this._rescc['max-age']);
        }

        const defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;

        const serverDate = this.date();
        if (this._resHeaders.expires) {
            const expires = Date.parse(this._resHeaders.expires);
            // A cache recipient MUST interpret invalid date formats, especially the value "0", as representing a time in the past (i.e., "already expired").
            if (Number.isNaN(expires) || expires < serverDate) {
                return 0;
            }
            return Math.max(defaultMinTtl, (expires - serverDate) / 1000);
        }

        if (this._resHeaders['last-modified']) {
            const lastModified = Date.parse(this._resHeaders['last-modified']);
            if (isFinite(lastModified) && serverDate > lastModified) {
                return Math.max(
                    defaultMinTtl,
                    ((serverDate - lastModified) / 1000) * this._cacheHeuristic
                );
            }
        }

        return defaultMinTtl;
    }

    timeToLive() {
        const age = this.maxAge() - this.age();
        const staleIfErrorAge = age + toNumberOrZero(this._rescc['stale-if-error']);
        const staleWhileRevalidateAge = age + toNumberOrZero(this._rescc['stale-while-revalidate']);
        return Math.max(0, age, staleIfErrorAge, staleWhileRevalidateAge) * 1000;
    }

    stale() {
        return this.maxAge() <= this.age();
    }

    _useStaleIfError() {
        return this.maxAge() + toNumberOrZero(this._rescc['stale-if-error']) > this.age();
    }

    useStaleWhileRevalidate() {
        return this.maxAge() + toNumberOrZero(this._rescc['stale-while-revalidate']) > this.age();
    }

    static fromObject(obj) {
        return new this(undefined, undefined, { _fromObject: obj });
    }

    _fromObject(obj) {
        if (this._responseTime) throw Error('Reinitialized');
        if (!obj || obj.v !== 1) throw Error('Invalid serialization');

        this._responseTime = obj.t;
        this._isShared = obj.sh;
        this._cacheHeuristic = obj.ch;
        this._immutableMinTtl =
            obj.imm !== undefined ? obj.imm : 24 * 3600 * 1000;
        this._status = obj.st;
        this._resHeaders = obj.resh;
        this._rescc = obj.rescc;
        this._method = obj.m;
        this._url = obj.u;
        this._host = obj.h;
        this._noAuthorization = obj.a;
        this._reqHeaders = obj.reqh;
        this._reqcc = obj.reqcc;
    }

    toObject() {
        return {
            v: 1,
            t: this._responseTime,
            sh: this._isShared,
            ch: this._cacheHeuristic,
            imm: this._immutableMinTtl,
            st: this._status,
            resh: this._resHeaders,
            rescc: this._rescc,
            m: this._method,
            u: this._url,
            h: this._host,
            a: this._noAuthorization,
            reqh: this._reqHeaders,
            reqcc: this._reqcc,
        };
    }

    /**
     * Headers for sending to the origin server to revalidate stale response.
     * Allows server to return 304 to allow reuse of the previous response.
     *
     * Hop by hop headers are always stripped.
     * Revalidation headers may be added or removed, depending on request.
     */
    revalidationHeaders(incomingReq) {
        this._assertRequestHasHeaders(incomingReq);
        const headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);

        // This implementation does not understand range requests
        delete headers['if-range'];

        if (!this._requestMatches(incomingReq, true) || !this.storable()) {
            // revalidation allowed via HEAD
            // not for the same resource, or wasn't allowed to be cached anyway
            delete headers['if-none-match'];
            delete headers['if-modified-since'];
            return headers;
        }

        /* MUST send that entity-tag in any cache validation request (using If-Match or If-None-Match) if an entity-tag has been provided by the origin server. */
        if (this._resHeaders.etag) {
            headers['if-none-match'] = headers['if-none-match']
                ? `${headers['if-none-match']}, ${this._resHeaders.etag}`
                : this._resHeaders.etag;
        }

        // Clients MAY issue simple (non-subrange) GET requests with either weak validators or strong validators. Clients MUST NOT use weak validators in other forms of request.
        const forbidsWeakValidators =
            headers['accept-ranges'] ||
            headers['if-match'] ||
            headers['if-unmodified-since'] ||
            (this._method && this._method != 'GET');

        /* SHOULD send the Last-Modified value in non-subrange cache validation requests (using If-Modified-Since) if only a Last-Modified value has been provided by the origin server.
        Note: This implementation does not understand partial responses (206) */
        if (forbidsWeakValidators) {
            delete headers['if-modified-since'];

            if (headers['if-none-match']) {
                const etags = headers['if-none-match']
                    .split(/,/)
                    .filter(etag => {
                        return !/^\s*W\//.test(etag);
                    });
                if (!etags.length) {
                    delete headers['if-none-match'];
                } else {
                    headers['if-none-match'] = etags.join(',').trim();
                }
            }
        } else if (
            this._resHeaders['last-modified'] &&
            !headers['if-modified-since']
        ) {
            headers['if-modified-since'] = this._resHeaders['last-modified'];
        }

        return headers;
    }

    /**
     * Creates new CachePolicy with information combined from the previews response,
     * and the new revalidation response.
     *
     * Returns {policy, modified} where modified is a boolean indicating
     * whether the response body has been modified, and old cached body can't be used.
     *
     * @return {Object} {policy: CachePolicy, modified: Boolean}
     */
    revalidatedPolicy(request, response) {
        this._assertRequestHasHeaders(request);
        if(this._useStaleIfError() && isErrorResponse(response)) {  // I consider the revalidation request unsuccessful
          return {
            modified: false,
            matches: false,
            policy: this,
          };
        }
        if (!response || !response.headers) {
            throw Error('Response headers missing');
        }

        // These aren't going to be supported exactly, since one CachePolicy object
        // doesn't know about all the other cached objects.
        let matches = false;
        if (response.status !== undefined && response.status != 304) {
            matches = false;
        } else if (
            response.headers.etag &&
            !/^\s*W\//.test(response.headers.etag)
        ) {
            // "All of the stored responses with the same strong validator are selected.
            // If none of the stored responses contain the same strong validator,
            // then the cache MUST NOT use the new response to update any stored responses."
            matches =
                this._resHeaders.etag &&
                this._resHeaders.etag.replace(/^\s*W\//, '') ===
                    response.headers.etag;
        } else if (this._resHeaders.etag && response.headers.etag) {
            // "If the new response contains a weak validator and that validator corresponds
            // to one of the cache's stored responses,
            // then the most recent of those matching stored responses is selected for update."
            matches =
                this._resHeaders.etag.replace(/^\s*W\//, '') ===
                response.headers.etag.replace(/^\s*W\//, '');
        } else if (this._resHeaders['last-modified']) {
            matches =
                this._resHeaders['last-modified'] ===
                response.headers['last-modified'];
        } else {
            // If the new response does not include any form of validator (such as in the case where
            // a client generates an If-Modified-Since request from a source other than the Last-Modified
            // response header field), and there is only one stored response, and that stored response also
            // lacks a validator, then that stored response is selected for update.
            if (
                !this._resHeaders.etag &&
                !this._resHeaders['last-modified'] &&
                !response.headers.etag &&
                !response.headers['last-modified']
            ) {
                matches = true;
            }
        }

        if (!matches) {
            return {
                policy: new this.constructor(request, response),
                // Client receiving 304 without body, even if it's invalid/mismatched has no option
                // but to reuse a cached body. We don't have a good way to tell clients to do
                // error recovery in such case.
                modified: response.status != 304,
                matches: false,
            };
        }

        // use other header fields provided in the 304 (Not Modified) response to replace all instances
        // of the corresponding header fields in the stored response.
        const headers = {};
        for (const k in this._resHeaders) {
            headers[k] =
                k in response.headers && !excludedFromRevalidationUpdate[k]
                    ? response.headers[k]
                    : this._resHeaders[k];
        }

        const newResponse = Object.assign({}, response, {
            status: this._status,
            method: this._method,
            headers,
        });
        return {
            policy: new this.constructor(request, newResponse, {
                shared: this._isShared,
                cacheHeuristic: this._cacheHeuristic,
                immutableMinTimeToLive: this._immutableMinTtl,
            }),
            modified: false,
            matches: true,
        };
    }
};

var lowercaseKeys$2 = object => {
	const result = {};

	for (const [key, value] of Object.entries(object)) {
		result[key.toLowerCase()] = value;
	}

	return result;
};

const Readable = require$$0__default$1['default'].Readable;
const lowercaseKeys$1 = lowercaseKeys$2;

class Response$1 extends Readable {
	constructor(statusCode, headers, body, url) {
		if (typeof statusCode !== 'number') {
			throw new TypeError('Argument `statusCode` should be a number');
		}
		if (typeof headers !== 'object') {
			throw new TypeError('Argument `headers` should be an object');
		}
		if (!(body instanceof Buffer)) {
			throw new TypeError('Argument `body` should be a buffer');
		}
		if (typeof url !== 'string') {
			throw new TypeError('Argument `url` should be a string');
		}

		super();
		this.statusCode = statusCode;
		this.headers = lowercaseKeys$1(headers);
		this.body = body;
		this.url = url;
	}

	_read() {
		this.push(this.body);
		this.push(null);
	}
}

var src$4 = Response$1;

// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage
const knownProps = [
	'destroy',
	'setTimeout',
	'socket',
	'headers',
	'trailers',
	'rawHeaders',
	'statusCode',
	'httpVersion',
	'httpVersionMinor',
	'httpVersionMajor',
	'rawTrailers',
	'statusMessage'
];

var mimicResponse$4 = (fromStream, toStream) => {
	const fromProps = new Set(Object.keys(fromStream).concat(knownProps));

	for (const prop of fromProps) {
		// Don't overwrite existing properties
		if (prop in toStream) {
			continue;
		}

		toStream[prop] = typeof fromStream[prop] === 'function' ? fromStream[prop].bind(fromStream) : fromStream[prop];
	}
};

const PassThrough = require$$0__default$1['default'].PassThrough;
const mimicResponse$3 = mimicResponse$4;

const cloneResponse$1 = response => {
	if (!(response && response.pipe)) {
		throw new TypeError('Parameter `response` must be a response stream.');
	}

	const clone = new PassThrough();
	mimicResponse$3(response, clone);

	return response.pipe(clone);
};

var src$3 = cloneResponse$1;

var jsonBuffer = {};

//TODO: handle reviver/dehydrate function like normal
//and handle indentation, like normal.
//if anyone needs this... please send pull request.

jsonBuffer.stringify = function stringify (o) {
  if('undefined' == typeof o) return o

  if(o && Buffer.isBuffer(o))
    return JSON.stringify(':base64:' + o.toString('base64'))

  if(o && o.toJSON)
    o =  o.toJSON();

  if(o && 'object' === typeof o) {
    var s = '';
    var array = Array.isArray(o);
    s = array ? '[' : '{';
    var first = true;

    for(var k in o) {
      var ignore = 'function' == typeof o[k] || (!array && 'undefined' === typeof o[k]);
      if(Object.hasOwnProperty.call(o, k) && !ignore) {
        if(!first)
          s += ',';
        first = false;
        if (array) {
          if(o[k] == undefined)
            s += 'null';
          else
            s += stringify(o[k]);
        } else if (o[k] !== void(0)) {
          s += stringify(k) + ':' + stringify(o[k]);
        }
      }
    }

    s += array ? ']' : '}';

    return s
  } else if ('string' === typeof o) {
    return JSON.stringify(/^:/.test(o) ? ':' + o : o)
  } else if ('undefined' === typeof o) {
    return 'null';
  } else
    return JSON.stringify(o)
};

jsonBuffer.parse = function (s) {
  return JSON.parse(s, function (key, value) {
    if('string' === typeof value) {
      if(/^:base64:/.test(value))
        return Buffer.from(value.substring(8), 'base64')
      else
        return /^:/.test(value) ? value.substring(1) : value 
    }
    return value
  })
};

const EventEmitter$3 = require$$0__default$3['default'];
const JSONB = jsonBuffer;

const loadStore = opts => {
	const adapters = {
		redis: '@keyv/redis',
		mongodb: '@keyv/mongo',
		mongo: '@keyv/mongo',
		sqlite: '@keyv/sqlite',
		postgresql: '@keyv/postgres',
		postgres: '@keyv/postgres',
		mysql: '@keyv/mysql'
	};
	if (opts.adapter || opts.uri) {
		const adapter = opts.adapter || /^[^:]*/.exec(opts.uri)[0];
		return new (commonjsRequire(adapters[adapter]))(opts);
	}

	return new Map();
};

class Keyv$2 extends EventEmitter$3 {
	constructor(uri, opts) {
		super();
		this.opts = Object.assign(
			{
				namespace: 'keyv',
				serialize: JSONB.stringify,
				deserialize: JSONB.parse
			},
			(typeof uri === 'string') ? { uri } : uri,
			opts
		);

		if (!this.opts.store) {
			const adapterOpts = Object.assign({}, this.opts);
			this.opts.store = loadStore(adapterOpts);
		}

		if (typeof this.opts.store.on === 'function') {
			this.opts.store.on('error', err => this.emit('error', err));
		}

		this.opts.store.namespace = this.opts.namespace;
	}

	_getKeyPrefix(key) {
		return `${this.opts.namespace}:${key}`;
	}

	get(key, opts) {
		const keyPrefixed = this._getKeyPrefix(key);
		const { store } = this.opts;
		return Promise.resolve()
			.then(() => store.get(keyPrefixed))
			.then(data => {
				return (typeof data === 'string') ? this.opts.deserialize(data) : data;
			})
			.then(data => {
				if (data === undefined) {
					return undefined;
				}

				if (typeof data.expires === 'number' && Date.now() > data.expires) {
					this.delete(key);
					return undefined;
				}

				return (opts && opts.raw) ? data : data.value;
			});
	}

	set(key, value, ttl) {
		const keyPrefixed = this._getKeyPrefix(key);
		if (typeof ttl === 'undefined') {
			ttl = this.opts.ttl;
		}

		if (ttl === 0) {
			ttl = undefined;
		}

		const { store } = this.opts;

		return Promise.resolve()
			.then(() => {
				const expires = (typeof ttl === 'number') ? (Date.now() + ttl) : null;
				value = { value, expires };
				return this.opts.serialize(value);
			})
			.then(value => store.set(keyPrefixed, value, ttl))
			.then(() => true);
	}

	delete(key) {
		const keyPrefixed = this._getKeyPrefix(key);
		const { store } = this.opts;
		return Promise.resolve()
			.then(() => store.delete(keyPrefixed));
	}

	clear() {
		const { store } = this.opts;
		return Promise.resolve()
			.then(() => store.clear());
	}
}

var src$2 = Keyv$2;

const EventEmitter$2 = require$$0__default$3['default'];
const urlLib = require$$0__default$4['default'];
const normalizeUrl = normalizeUrl_1;
const getStream$1 = getStream$3.exports;
const CachePolicy = httpCacheSemantics;
const Response = src$4;
const lowercaseKeys = lowercaseKeys$2;
const cloneResponse = src$3;
const Keyv$1 = src$2;

class CacheableRequest$1 {
	constructor(request, cacheAdapter) {
		if (typeof request !== 'function') {
			throw new TypeError('Parameter `request` must be a function');
		}

		this.cache = new Keyv$1({
			uri: typeof cacheAdapter === 'string' && cacheAdapter,
			store: typeof cacheAdapter !== 'string' && cacheAdapter,
			namespace: 'cacheable-request'
		});

		return this.createCacheableRequest(request);
	}

	createCacheableRequest(request) {
		return (opts, cb) => {
			let url;
			if (typeof opts === 'string') {
				url = normalizeUrlObject(urlLib.parse(opts));
				opts = {};
			} else if (opts instanceof urlLib.URL) {
				url = normalizeUrlObject(urlLib.parse(opts.toString()));
				opts = {};
			} else {
				const [pathname, ...searchParts] = (opts.path || '').split('?');
				const search = searchParts.length > 0 ?
					`?${searchParts.join('?')}` :
					'';
				url = normalizeUrlObject({ ...opts, pathname, search });
			}

			opts = {
				headers: {},
				method: 'GET',
				cache: true,
				strictTtl: false,
				automaticFailover: false,
				...opts,
				...urlObjectToRequestOptions(url)
			};
			opts.headers = lowercaseKeys(opts.headers);

			const ee = new EventEmitter$2();
			const normalizedUrlString = normalizeUrl(
				urlLib.format(url),
				{
					stripWWW: false,
					removeTrailingSlash: false,
					stripAuthentication: false
				}
			);
			const key = `${opts.method}:${normalizedUrlString}`;
			let revalidate = false;
			let madeRequest = false;

			const makeRequest = opts => {
				madeRequest = true;
				let requestErrored = false;
				let requestErrorCallback;

				const requestErrorPromise = new Promise(resolve => {
					requestErrorCallback = () => {
						if (!requestErrored) {
							requestErrored = true;
							resolve();
						}
					};
				});

				const handler = response => {
					if (revalidate && !opts.forceRefresh) {
						response.status = response.statusCode;
						const revalidatedPolicy = CachePolicy.fromObject(revalidate.cachePolicy).revalidatedPolicy(opts, response);
						if (!revalidatedPolicy.modified) {
							const headers = revalidatedPolicy.policy.responseHeaders();
							response = new Response(revalidate.statusCode, headers, revalidate.body, revalidate.url);
							response.cachePolicy = revalidatedPolicy.policy;
							response.fromCache = true;
						}
					}

					if (!response.fromCache) {
						response.cachePolicy = new CachePolicy(opts, response, opts);
						response.fromCache = false;
					}

					let clonedResponse;
					if (opts.cache && response.cachePolicy.storable()) {
						clonedResponse = cloneResponse(response);

						(async () => {
							try {
								const bodyPromise = getStream$1.buffer(response);

								await Promise.race([
									requestErrorPromise,
									new Promise(resolve => response.once('end', resolve))
								]);

								if (requestErrored) {
									return;
								}

								const body = await bodyPromise;

								const value = {
									cachePolicy: response.cachePolicy.toObject(),
									url: response.url,
									statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
									body
								};

								let ttl = opts.strictTtl ? response.cachePolicy.timeToLive() : undefined;
								if (opts.maxTtl) {
									ttl = ttl ? Math.min(ttl, opts.maxTtl) : opts.maxTtl;
								}

								await this.cache.set(key, value, ttl);
							} catch (error) {
								ee.emit('error', new CacheableRequest$1.CacheError(error));
							}
						})();
					} else if (opts.cache && revalidate) {
						(async () => {
							try {
								await this.cache.delete(key);
							} catch (error) {
								ee.emit('error', new CacheableRequest$1.CacheError(error));
							}
						})();
					}

					ee.emit('response', clonedResponse || response);
					if (typeof cb === 'function') {
						cb(clonedResponse || response);
					}
				};

				try {
					const req = request(opts, handler);
					req.once('error', requestErrorCallback);
					req.once('abort', requestErrorCallback);
					ee.emit('request', req);
				} catch (error) {
					ee.emit('error', new CacheableRequest$1.RequestError(error));
				}
			};

			(async () => {
				const get = async opts => {
					await Promise.resolve();

					const cacheEntry = opts.cache ? await this.cache.get(key) : undefined;
					if (typeof cacheEntry === 'undefined') {
						return makeRequest(opts);
					}

					const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
					if (policy.satisfiesWithoutRevalidation(opts) && !opts.forceRefresh) {
						const headers = policy.responseHeaders();
						const response = new Response(cacheEntry.statusCode, headers, cacheEntry.body, cacheEntry.url);
						response.cachePolicy = policy;
						response.fromCache = true;

						ee.emit('response', response);
						if (typeof cb === 'function') {
							cb(response);
						}
					} else {
						revalidate = cacheEntry;
						opts.headers = policy.revalidationHeaders(opts);
						makeRequest(opts);
					}
				};

				const errorHandler = error => ee.emit('error', new CacheableRequest$1.CacheError(error));
				this.cache.once('error', errorHandler);
				ee.on('response', () => this.cache.removeListener('error', errorHandler));

				try {
					await get(opts);
				} catch (error) {
					if (opts.automaticFailover && !madeRequest) {
						makeRequest(opts);
					}

					ee.emit('error', new CacheableRequest$1.CacheError(error));
				}
			})();

			return ee;
		};
	}
}

function urlObjectToRequestOptions(url) {
	const options = { ...url };
	options.path = `${url.pathname || '/'}${url.search || ''}`;
	delete options.pathname;
	delete options.search;
	return options;
}

function normalizeUrlObject(url) {
	// If url was parsed by url.parse or new URL:
	// - hostname will be set
	// - host will be hostname[:port]
	// - port will be set if it was explicit in the parsed string
	// Otherwise, url was from request options:
	// - hostname or host may be set
	// - host shall not have port encoded
	return {
		protocol: url.protocol,
		auth: url.auth,
		hostname: url.hostname || url.host || 'localhost',
		port: url.port,
		pathname: url.pathname,
		search: url.search
	};
}

CacheableRequest$1.RequestError = class extends Error {
	constructor(error) {
		super(error.message);
		this.name = 'RequestError';
		Object.assign(this, error);
	}
};

CacheableRequest$1.CacheError = class extends Error {
	constructor(error) {
		super(error.message);
		this.name = 'CacheError';
		Object.assign(this, error);
	}
};

var src$1 = CacheableRequest$1;

var toReadableStream$1 = {exports: {}};

const {Readable: ReadableStream} = require$$0__default$1['default'];

const toReadableStream = input => (
	new ReadableStream({
		read() {
			this.push(input);
			this.push(null);
		}
	})
);

toReadableStream$1.exports = toReadableStream;
// TODO: Remove this for the next major release
toReadableStream$1.exports.default = toReadableStream;

var cacheableLookup = {exports: {}};

const {Resolver, V4MAPPED, ADDRCONFIG} = require$$0__default$5['default'];
const {promisify} = require$$1__default['default'];
const os$2 = os__default['default'];
const Keyv = src$2;

const kCacheableLookupData = Symbol('cacheableLookupData');
const kCacheableLookupInstance = Symbol('cacheableLookupInstance');

const verifyAgent = agent => {
	if (!(agent && typeof agent.createConnection === 'function')) {
		throw new Error('Expected an Agent instance as the first argument');
	}
};

const map4to6 = entries => {
	for (const entry of entries) {
		entry.address = `::ffff:${entry.address}`;
		entry.family = 6;
	}
};

const getIfaceInfo = () => {
	let has4 = false;
	let has6 = false;

	for (const device of Object.values(os$2.networkInterfaces())) {
		for (const iface of device) {
			if (iface.internal) {
				continue;
			}

			if (iface.family === 'IPv6') {
				has6 = true;
			} else {
				has4 = true;
			}

			if (has4 && has6) {
				break;
			}
		}
	}

	return {has4, has6};
};

class CacheableLookup {
	constructor({cacheAdapter, maxTtl = Infinity, resolver} = {}) {
		this.cache = new Keyv({
			uri: typeof cacheAdapter === 'string' && cacheAdapter,
			store: typeof cacheAdapter !== 'string' && cacheAdapter,
			namespace: 'cached-lookup'
		});

		this.maxTtl = maxTtl;

		this._resolver = resolver || new Resolver();
		this._resolve4 = promisify(this._resolver.resolve4.bind(this._resolver));
		this._resolve6 = promisify(this._resolver.resolve6.bind(this._resolver));

		this._iface = getIfaceInfo();

		this.lookup = this.lookup.bind(this);
		this.lookupAsync = this.lookupAsync.bind(this);
	}

	set servers(servers) {
		this._resolver.setServers(servers);
	}

	get servers() {
		return this._resolver.getServers();
	}

	lookup(hostname, options, callback) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		// eslint-disable-next-line promise/prefer-await-to-then
		this.lookupAsync(hostname, {...options, throwNotFound: true}).then(result => {
			if (options.all) {
				callback(null, result);
			} else {
				callback(null, result.address, result.family, result.expires, result.ttl);
			}
		}).catch(callback);
	}

	async lookupAsync(hostname, options = {}) {
		let cached;
		if (!options.family && options.all) {
			const [cached4, cached6] = await Promise.all([this.lookupAsync(hostname, {all: true, family: 4}), this.lookupAsync(hostname, {all: true, family: 6})]);
			cached = [...cached4, ...cached6];
		} else {
			cached = await this.query(hostname, options.family || 4);

			if (cached.length === 0 && options.family === 6 && options.hints & V4MAPPED) {
				cached = await this.query(hostname, 4);
				map4to6(cached);
			}
		}

		if (options.hints & ADDRCONFIG) {
			const {_iface} = this;
			cached = cached.filter(entry => entry.family === 6 ? _iface.has6 : _iface.has4);
		}

		if (cached.length === 0 && options.throwNotFound) {
			const error = new Error(`ENOTFOUND ${hostname}`);
			error.code = 'ENOTFOUND';
			error.hostname = hostname;

			throw error;
		}

		const now = Date.now();
		cached = cached.filter(entry => entry.ttl === 0 || now < entry.expires);

		if (options.all) {
			return cached;
		}

		if (cached.length === 1) {
			return cached[0];
		}

		if (cached.length === 0) {
			return undefined;
		}

		return this._getEntry(cached);
	}

	async query(hostname, family) {
		let cached = await this.cache.get(`${hostname}:${family}`);
		if (!cached) {
			cached = await this.queryAndCache(hostname, family);
		}

		return cached;
	}

	async queryAndCache(hostname, family) {
		const resolve = family === 4 ? this._resolve4 : this._resolve6;
		const entries = await resolve(hostname, {ttl: true});

		if (entries === undefined) {
			return [];
		}

		const now = Date.now();

		let cacheTtl = 0;
		for (const entry of entries) {
			cacheTtl = Math.max(cacheTtl, entry.ttl);
			entry.family = family;
			entry.expires = now + (entry.ttl * 1000);
		}

		cacheTtl = Math.min(this.maxTtl, cacheTtl) * 1000;

		if (this.maxTtl !== 0 && cacheTtl !== 0) {
			await this.cache.set(`${hostname}:${family}`, entries, cacheTtl);
		}

		return entries;
	}

	_getEntry(entries) {
		return entries[Math.floor(Math.random() * entries.length)];
	}

	install(agent) {
		verifyAgent(agent);

		if (kCacheableLookupData in agent) {
			throw new Error('CacheableLookup has been already installed');
		}

		agent[kCacheableLookupData] = agent.createConnection;
		agent[kCacheableLookupInstance] = this;

		agent.createConnection = (options, callback) => {
			if (!('lookup' in options)) {
				options.lookup = this.lookup;
			}

			return agent[kCacheableLookupData](options, callback);
		};
	}

	uninstall(agent) {
		verifyAgent(agent);

		if (agent[kCacheableLookupData]) {
			if (agent[kCacheableLookupInstance] !== this) {
				throw new Error('The agent is not owned by this CacheableLookup instance');
			}

			agent.createConnection = agent[kCacheableLookupData];

			delete agent[kCacheableLookupData];
			delete agent[kCacheableLookupInstance];
		}
	}

	updateInterfaceInfo() {
		this._iface = getIfaceInfo();
	}
}

cacheableLookup.exports = CacheableLookup;
cacheableLookup.exports.default = CacheableLookup;

var knownHookEvents$1 = {};

Object.defineProperty(knownHookEvents$1, "__esModule", { value: true });
const knownHookEvents = [
    'beforeError',
    'init',
    'beforeRequest',
    'beforeRedirect',
    'beforeRetry',
    'afterResponse'
];
knownHookEvents$1.default = knownHookEvents;

var dynamicRequire = {};

/* istanbul ignore file: used for webpack */
Object.defineProperty(dynamicRequire, "__esModule", { value: true });
dynamicRequire.default = (moduleObject, moduleId) => moduleObject.require(moduleId);

var getBodySize = {};

var isFormData = {};

Object.defineProperty(isFormData, "__esModule", { value: true });
const is_1$8 = dist.exports;
isFormData.default = (body) => is_1$8.default.nodeStream(body) && is_1$8.default.function_(body.getBoundary);

Object.defineProperty(getBodySize, "__esModule", { value: true });
const fs_1$1 = require$$0__default['default'];
const util_1$2 = require$$1__default['default'];
const is_1$7 = dist.exports;
const is_form_data_1 = isFormData;
const statAsync = util_1$2.promisify(fs_1$1.stat);
getBodySize.default = async (options) => {
    const { body, headers } = options;
    if (headers && 'content-length' in headers) {
        return Number(headers['content-length']);
    }
    if (!body) {
        return 0;
    }
    if (is_1$7.default.string(body)) {
        return Buffer.byteLength(body);
    }
    if (is_1$7.default.buffer(body)) {
        return body.length;
    }
    if (is_form_data_1.default(body)) {
        return util_1$2.promisify(body.getLength.bind(body))();
    }
    if (body instanceof fs_1$1.ReadStream) {
        const { size } = await statAsync(body.path);
        return size;
    }
    return undefined;
};

var merge$2 = {};

Object.defineProperty(merge$2, "__esModule", { value: true });
const url_1$2 = require$$0__default$4['default'];
const is_1$6 = dist.exports;
function merge$1(target, ...sources) {
    for (const source of sources) {
        for (const [key, sourceValue] of Object.entries(source)) {
            const targetValue = target[key];
            if (is_1$6.default.urlInstance(targetValue) && is_1$6.default.string(sourceValue)) {
                // @ts-ignore TS doesn't recognise Target accepts string keys
                target[key] = new url_1$2.URL(sourceValue, targetValue);
            }
            else if (is_1$6.default.plainObject(sourceValue)) {
                if (is_1$6.default.plainObject(targetValue)) {
                    // @ts-ignore TS doesn't recognise Target accepts string keys
                    target[key] = merge$1({}, targetValue, sourceValue);
                }
                else {
                    // @ts-ignore TS doesn't recognise Target accepts string keys
                    target[key] = merge$1({}, sourceValue);
                }
            }
            else if (is_1$6.default.array(sourceValue)) {
                // @ts-ignore TS doesn't recognise Target accepts string keys
                target[key] = sourceValue.slice();
            }
            else {
                // @ts-ignore TS doesn't recognise Target accepts string keys
                target[key] = sourceValue;
            }
        }
    }
    return target;
}
merge$2.default = merge$1;

var optionsToUrl = {};

Object.defineProperty(optionsToUrl, "__esModule", { value: true });
const url_1$1 = require$$0__default$4['default'];
function validateSearchParams(searchParams) {
    for (const value of Object.values(searchParams)) {
        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && value !== null) {
            throw new TypeError(`The \`searchParams\` value '${String(value)}' must be a string, number, boolean or null`);
        }
    }
}
const keys = [
    'protocol',
    'username',
    'password',
    'host',
    'hostname',
    'port',
    'pathname',
    'search',
    'hash'
];
optionsToUrl.default = (options) => {
    var _a, _b;
    let origin;
    if (options.path) {
        if (options.pathname) {
            throw new TypeError('Parameters `path` and `pathname` are mutually exclusive.');
        }
        if (options.search) {
            throw new TypeError('Parameters `path` and `search` are mutually exclusive.');
        }
        if (options.searchParams) {
            throw new TypeError('Parameters `path` and `searchParams` are mutually exclusive.');
        }
    }
    if (Reflect.has(options, 'auth')) {
        throw new TypeError('Parameter `auth` is deprecated. Use `username` / `password` instead.');
    }
    if (options.search && options.searchParams) {
        throw new TypeError('Parameters `search` and `searchParams` are mutually exclusive.');
    }
    if (options.href) {
        return new url_1$1.URL(options.href);
    }
    if (options.origin) {
        origin = options.origin;
    }
    else {
        if (!options.protocol) {
            throw new TypeError('No URL protocol specified');
        }
        origin = `${options.protocol}//${_b = (_a = options.hostname, (_a !== null && _a !== void 0 ? _a : options.host)), (_b !== null && _b !== void 0 ? _b : '')}`;
    }
    const url = new url_1$1.URL(origin);
    if (options.path) {
        const searchIndex = options.path.indexOf('?');
        if (searchIndex === -1) {
            options.pathname = options.path;
        }
        else {
            options.pathname = options.path.slice(0, searchIndex);
            options.search = options.path.slice(searchIndex + 1);
        }
    }
    if (Reflect.has(options, 'path')) {
        delete options.path;
    }
    for (const key of keys) {
        if (Reflect.has(options, key)) {
            url[key] = options[key].toString();
        }
    }
    if (options.searchParams) {
        if (typeof options.searchParams !== 'string' && !(options.searchParams instanceof url_1$1.URLSearchParams)) {
            validateSearchParams(options.searchParams);
        }
        (new url_1$1.URLSearchParams(options.searchParams)).forEach((value, key) => {
            url.searchParams.append(key, value);
        });
    }
    return url;
};

var types = {};

Object.defineProperty(types, "__esModule", { value: true });
types.requestSymbol = Symbol('request');

(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require$$0__default$4['default'];
const util_1 = require$$1__default['default'];
const CacheableRequest = src$1;
const http = require$$3__default['default'];
const https = require$$4__default['default'];
const lowercaseKeys = lowercaseKeys$2;
const toReadableStream = toReadableStream$1.exports;
const is_1 = dist.exports;
const cacheable_lookup_1 = cacheableLookup.exports;
const errors_1 = errors$2;
const known_hook_events_1 = knownHookEvents$1;
const dynamic_require_1 = dynamicRequire;
const get_body_size_1 = getBodySize;
const is_form_data_1 = isFormData;
const merge_1 = merge$2;
const options_to_url_1 = optionsToUrl;
const types_1 = types;
const nonEnumerableProperties = [
    'context',
    'body',
    'json',
    'form'
];
const isAgentByProtocol = (agent) => is_1.default.object(agent);
// TODO: `preNormalizeArguments` should merge `options` & `defaults`
exports.preNormalizeArguments = (options, defaults) => {
    var _a, _b, _c, _d, _e, _f;
    // `options.headers`
    if (is_1.default.undefined(options.headers)) {
        options.headers = {};
    }
    else {
        options.headers = lowercaseKeys(options.headers);
    }
    for (const [key, value] of Object.entries(options.headers)) {
        if (is_1.default.null_(value)) {
            throw new TypeError(`Use \`undefined\` instead of \`null\` to delete the \`${key}\` header`);
        }
    }
    // `options.prefixUrl`
    if (is_1.default.urlInstance(options.prefixUrl) || is_1.default.string(options.prefixUrl)) {
        options.prefixUrl = options.prefixUrl.toString();
        if (options.prefixUrl.length !== 0 && !options.prefixUrl.endsWith('/')) {
            options.prefixUrl += '/';
        }
    }
    else {
        options.prefixUrl = defaults ? defaults.prefixUrl : '';
    }
    // `options.hooks`
    if (is_1.default.undefined(options.hooks)) {
        options.hooks = {};
    }
    if (is_1.default.object(options.hooks)) {
        for (const event of known_hook_events_1.default) {
            if (Reflect.has(options.hooks, event)) {
                if (!is_1.default.array(options.hooks[event])) {
                    throw new TypeError(`Parameter \`${event}\` must be an Array, not ${is_1.default(options.hooks[event])}`);
                }
            }
            else {
                options.hooks[event] = [];
            }
        }
    }
    else {
        throw new TypeError(`Parameter \`hooks\` must be an Object, not ${is_1.default(options.hooks)}`);
    }
    if (defaults) {
        for (const event of known_hook_events_1.default) {
            if (!(Reflect.has(options.hooks, event) && is_1.default.undefined(options.hooks[event]))) {
                // @ts-ignore Union type array is not assignable to union array type
                options.hooks[event] = [
                    ...defaults.hooks[event],
                    ...options.hooks[event]
                ];
            }
        }
    }
    // `options.timeout`
    if (is_1.default.number(options.timeout)) {
        options.timeout = { request: options.timeout };
    }
    else if (!is_1.default.object(options.timeout)) {
        options.timeout = {};
    }
    // `options.retry`
    const { retry } = options;
    if (defaults) {
        options.retry = { ...defaults.retry };
    }
    else {
        options.retry = {
            calculateDelay: retryObject => retryObject.computedValue,
            limit: 0,
            methods: [],
            statusCodes: [],
            errorCodes: [],
            maxRetryAfter: undefined
        };
    }
    if (is_1.default.object(retry)) {
        options.retry = {
            ...options.retry,
            ...retry
        };
    }
    else if (is_1.default.number(retry)) {
        options.retry.limit = retry;
    }
    if (options.retry.maxRetryAfter === undefined) {
        options.retry.maxRetryAfter = Math.min(...[options.timeout.request, options.timeout.connect].filter((n) => !is_1.default.nullOrUndefined(n)));
    }
    options.retry.methods = [...new Set(options.retry.methods.map(method => method.toUpperCase()))];
    options.retry.statusCodes = [...new Set(options.retry.statusCodes)];
    options.retry.errorCodes = [...new Set(options.retry.errorCodes)];
    // `options.dnsCache`
    if (options.dnsCache && !(options.dnsCache instanceof cacheable_lookup_1.default)) {
        options.dnsCache = new cacheable_lookup_1.default({ cacheAdapter: options.dnsCache });
    }
    // `options.method`
    if (is_1.default.string(options.method)) {
        options.method = options.method.toUpperCase();
    }
    else {
        options.method = (_b = (_a = defaults) === null || _a === void 0 ? void 0 : _a.method, (_b !== null && _b !== void 0 ? _b : 'GET'));
    }
    // Better memory management, so we don't have to generate a new object every time
    if (options.cache) {
        options.cacheableRequest = new CacheableRequest(
        // @ts-ignore Cannot properly type a function with multiple definitions yet
        (requestOptions, handler) => requestOptions[types_1.requestSymbol](requestOptions, handler), options.cache);
    }
    // `options.cookieJar`
    if (is_1.default.object(options.cookieJar)) {
        let { setCookie, getCookieString } = options.cookieJar;
        // Horrible `tough-cookie` check
        if (setCookie.length === 4 && getCookieString.length === 0) {
            if (!Reflect.has(setCookie, util_1.promisify.custom)) {
                // @ts-ignore TS is dumb - it says `setCookie` is `never`.
                setCookie = util_1.promisify(setCookie.bind(options.cookieJar));
                getCookieString = util_1.promisify(getCookieString.bind(options.cookieJar));
            }
        }
        else if (setCookie.length !== 2) {
            throw new TypeError('`options.cookieJar.setCookie` needs to be an async function with 2 arguments');
        }
        else if (getCookieString.length !== 1) {
            throw new TypeError('`options.cookieJar.getCookieString` needs to be an async function with 1 argument');
        }
        options.cookieJar = { setCookie, getCookieString };
    }
    // `options.encoding`
    if (is_1.default.null_(options.encoding)) {
        throw new TypeError('To get a Buffer, set `options.responseType` to `buffer` instead');
    }
    // `options.maxRedirects`
    if (!Reflect.has(options, 'maxRedirects') && !(defaults && Reflect.has(defaults, 'maxRedirects'))) {
        options.maxRedirects = 0;
    }
    // Merge defaults
    if (defaults) {
        options = merge_1.default({}, defaults, options);
    }
    // `options._pagination`
    if (is_1.default.object(options._pagination)) {
        const { _pagination: pagination } = options;
        if (!is_1.default.function_(pagination.transform)) {
            throw new TypeError('`options._pagination.transform` must be implemented');
        }
        if (!is_1.default.function_(pagination.shouldContinue)) {
            throw new TypeError('`options._pagination.shouldContinue` must be implemented');
        }
        if (!is_1.default.function_(pagination.filter)) {
            throw new TypeError('`options._pagination.filter` must be implemented');
        }
        if (!is_1.default.function_(pagination.paginate)) {
            throw new TypeError('`options._pagination.paginate` must be implemented');
        }
    }
    // Other values
    options.decompress = Boolean(options.decompress);
    options.isStream = Boolean(options.isStream);
    options.throwHttpErrors = Boolean(options.throwHttpErrors);
    options.ignoreInvalidCookies = Boolean(options.ignoreInvalidCookies);
    options.cache = (_c = options.cache, (_c !== null && _c !== void 0 ? _c : false));
    options.responseType = (_d = options.responseType, (_d !== null && _d !== void 0 ? _d : 'text'));
    options.resolveBodyOnly = Boolean(options.resolveBodyOnly);
    options.followRedirect = Boolean(options.followRedirect);
    options.dnsCache = (_e = options.dnsCache, (_e !== null && _e !== void 0 ? _e : false));
    options.useElectronNet = Boolean(options.useElectronNet);
    options.methodRewriting = Boolean(options.methodRewriting);
    options.allowGetBody = Boolean(options.allowGetBody);
    options.context = (_f = options.context, (_f !== null && _f !== void 0 ? _f : {}));
    return options;
};
exports.mergeOptions = (...sources) => {
    let mergedOptions = exports.preNormalizeArguments({});
    // Non enumerable properties shall not be merged
    const properties = {};
    for (const source of sources) {
        mergedOptions = exports.preNormalizeArguments(merge_1.default({}, source), mergedOptions);
        for (const name of nonEnumerableProperties) {
            if (!Reflect.has(source, name)) {
                continue;
            }
            properties[name] = {
                writable: true,
                configurable: true,
                enumerable: false,
                value: source[name]
            };
        }
    }
    Object.defineProperties(mergedOptions, properties);
    return mergedOptions;
};
exports.normalizeArguments = (url, options, defaults) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Merge options
    if (typeof url === 'undefined') {
        throw new TypeError('Missing `url` argument');
    }
    const runInitHooks = (hooks, options) => {
        if (hooks && options) {
            for (const hook of hooks) {
                const result = hook(options);
                if (is_1.default.promise(result)) {
                    throw new TypeError('The `init` hook must be a synchronous function');
                }
            }
        }
    };
    const hasUrl = is_1.default.urlInstance(url) || is_1.default.string(url);
    if (hasUrl) {
        if (options) {
            if (Reflect.has(options, 'url')) {
                throw new TypeError('The `url` option cannot be used if the input is a valid URL.');
            }
        }
        else {
            options = {};
        }
        // @ts-ignore URL is not URL
        options.url = url;
        runInitHooks((_a = defaults) === null || _a === void 0 ? void 0 : _a.options.hooks.init, options);
        runInitHooks((_b = options.hooks) === null || _b === void 0 ? void 0 : _b.init, options);
    }
    else if (Reflect.has(url, 'resolve')) {
        throw new Error('The legacy `url.Url` is deprecated. Use `URL` instead.');
    }
    else {
        runInitHooks((_c = defaults) === null || _c === void 0 ? void 0 : _c.options.hooks.init, url);
        runInitHooks((_d = url.hooks) === null || _d === void 0 ? void 0 : _d.init, url);
        if (options) {
            runInitHooks((_e = defaults) === null || _e === void 0 ? void 0 : _e.options.hooks.init, options);
            runInitHooks((_f = options.hooks) === null || _f === void 0 ? void 0 : _f.init, options);
        }
    }
    if (hasUrl) {
        options = exports.mergeOptions((_h = (_g = defaults) === null || _g === void 0 ? void 0 : _g.options, (_h !== null && _h !== void 0 ? _h : {})), (options !== null && options !== void 0 ? options : {}));
    }
    else {
        options = exports.mergeOptions((_k = (_j = defaults) === null || _j === void 0 ? void 0 : _j.options, (_k !== null && _k !== void 0 ? _k : {})), url, (options !== null && options !== void 0 ? options : {}));
    }
    // Normalize URL
    // TODO: drop `optionsToUrl` in Got 12
    if (is_1.default.string(options.url)) {
        options.url = options.prefixUrl + options.url;
        options.url = options.url.replace(/^unix:/, 'http://$&');
        if (options.searchParams || options.search) {
            options.url = options.url.split('?')[0];
        }
        // @ts-ignore URL is not URL
        options.url = options_to_url_1.default({
            origin: options.url,
            ...options
        });
    }
    else if (!is_1.default.urlInstance(options.url)) {
        // @ts-ignore URL is not URL
        options.url = options_to_url_1.default({ origin: options.prefixUrl, ...options });
    }
    const normalizedOptions = options;
    // Make it possible to change `options.prefixUrl`
    let prefixUrl = options.prefixUrl;
    Object.defineProperty(normalizedOptions, 'prefixUrl', {
        set: (value) => {
            if (!normalizedOptions.url.href.startsWith(value)) {
                throw new Error(`Cannot change \`prefixUrl\` from ${prefixUrl} to ${value}: ${normalizedOptions.url.href}`);
            }
            normalizedOptions.url = new url_1.URL(value + normalizedOptions.url.href.slice(prefixUrl.length));
            prefixUrl = value;
        },
        get: () => prefixUrl
    });
    // Make it possible to remove default headers
    for (const [key, value] of Object.entries(normalizedOptions.headers)) {
        if (is_1.default.undefined(value)) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete normalizedOptions.headers[key];
        }
    }
    return normalizedOptions;
};
const withoutBody = new Set(['HEAD']);
const withoutBodyUnlessSpecified = 'GET';
exports.normalizeRequestArguments = async (options) => {
    var _a, _b, _c;
    options = exports.mergeOptions(options);
    // Serialize body
    const { headers } = options;
    const hasNoContentType = is_1.default.undefined(headers['content-type']);
    {
        // TODO: these checks should be moved to `preNormalizeArguments`
        const isForm = !is_1.default.undefined(options.form);
        const isJson = !is_1.default.undefined(options.json);
        const isBody = !is_1.default.undefined(options.body);
        if ((isBody || isForm || isJson) && withoutBody.has(options.method)) {
            throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        }
        if (!options.allowGetBody && (isBody || isForm || isJson) && withoutBodyUnlessSpecified === options.method) {
            throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        }
        if ([isBody, isForm, isJson].filter(isTrue => isTrue).length > 1) {
            throw new TypeError('The `body`, `json` and `form` options are mutually exclusive');
        }
        if (isBody &&
            !is_1.default.nodeStream(options.body) &&
            !is_1.default.string(options.body) &&
            !is_1.default.buffer(options.body) &&
            !(is_1.default.object(options.body) && is_form_data_1.default(options.body))) {
            throw new TypeError('The `body` option must be a stream.Readable, string or Buffer');
        }
        if (isForm && !is_1.default.object(options.form)) {
            throw new TypeError('The `form` option must be an Object');
        }
    }
    if (options.body) {
        // Special case for https://github.com/form-data/form-data
        if (is_1.default.object(options.body) && is_form_data_1.default(options.body) && hasNoContentType) {
            headers['content-type'] = `multipart/form-data; boundary=${options.body.getBoundary()}`;
        }
    }
    else if (options.form) {
        if (hasNoContentType) {
            headers['content-type'] = 'application/x-www-form-urlencoded';
        }
        options.body = (new url_1.URLSearchParams(options.form)).toString();
    }
    else if (options.json) {
        if (hasNoContentType) {
            headers['content-type'] = 'application/json';
        }
        options.body = JSON.stringify(options.json);
    }
    const uploadBodySize = await get_body_size_1.default(options);
    if (!is_1.default.nodeStream(options.body)) {
        options.body = toReadableStream(options.body);
    }
    // See https://tools.ietf.org/html/rfc7230#section-3.3.2
    // A user agent SHOULD send a Content-Length in a request message when
    // no Transfer-Encoding is sent and the request method defines a meaning
    // for an enclosed payload body.  For example, a Content-Length header
    // field is normally sent in a POST request even when the value is 0
    // (indicating an empty payload body).  A user agent SHOULD NOT send a
    // Content-Length header field when the request message does not contain
    // a payload body and the method semantics do not anticipate such a
    // body.
    if (is_1.default.undefined(headers['content-length']) && is_1.default.undefined(headers['transfer-encoding'])) {
        if ((options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH' || options.method === 'DELETE' || (options.allowGetBody && options.method === 'GET')) &&
            !is_1.default.undefined(uploadBodySize)) {
            // @ts-ignore We assign if it is undefined, so this IS correct
            headers['content-length'] = String(uploadBodySize);
        }
    }
    if (!options.isStream && options.responseType === 'json' && is_1.default.undefined(headers.accept)) {
        headers.accept = 'application/json';
    }
    if (options.decompress && is_1.default.undefined(headers['accept-encoding'])) {
        headers['accept-encoding'] = 'gzip, deflate';
    }
    // Validate URL
    if (options.url.protocol !== 'http:' && options.url.protocol !== 'https:') {
        throw new errors_1.UnsupportedProtocolError(options);
    }
    decodeURI(options.url.toString());
    // Normalize request function
    if (is_1.default.function_(options.request)) {
        options[types_1.requestSymbol] = options.request;
        delete options.request;
    }
    else {
        options[types_1.requestSymbol] = options.url.protocol === 'https:' ? https.request : http.request;
    }
    // UNIX sockets
    if (options.url.hostname === 'unix') {
        const matches = /(?<socketPath>.+?):(?<path>.+)/.exec(options.url.pathname);
        if ((_a = matches) === null || _a === void 0 ? void 0 : _a.groups) {
            const { socketPath, path } = matches.groups;
            options = {
                ...options,
                socketPath,
                path,
                host: ''
            };
        }
    }
    if (isAgentByProtocol(options.agent)) {
        options.agent = (_b = options.agent[options.url.protocol.slice(0, -1)], (_b !== null && _b !== void 0 ? _b : options.agent));
    }
    if (options.dnsCache) {
        options.lookup = options.dnsCache.lookup;
    }
    /* istanbul ignore next: electron.net is broken */
    // No point in typing process.versions correctly, as
    // `process.version.electron` is used only once, right here.
    if (options.useElectronNet && process.versions.electron) {
        const electron = dynamic_require_1.default(module, 'electron'); // Trick webpack
        options.request = util_1.deprecate((_c = electron.net.request, (_c !== null && _c !== void 0 ? _c : electron.remote.net.request)), 'Electron support has been deprecated and will be removed in Got 11.\n' +
            'See https://github.com/sindresorhus/got/issues/899 for further information.', 'GOT_ELECTRON');
    }
    // Got's `timeout` is an object, http's `timeout` is a number, so they're not compatible.
    delete options.timeout;
    // Set cookies
    if (options.cookieJar) {
        const cookieString = await options.cookieJar.getCookieString(options.url.toString());
        if (is_1.default.nonEmptyString(cookieString)) {
            options.headers.cookie = cookieString;
        }
        else {
            delete options.headers.cookie;
        }
    }
    // `http-cache-semantics` checks this
    delete options.url;
    return options;
};
}(normalizeArguments, normalizeArguments.exports));

var requestAsEventEmitter = {};

var source$1 = {exports: {}};

var source = {exports: {}};

(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function isTLSSocket(socket) {
    return socket.encrypted;
}
const deferToConnect = (socket, fn) => {
    let listeners;
    if (typeof fn === 'function') {
        const connect = fn;
        listeners = { connect };
    }
    else {
        listeners = fn;
    }
    const hasConnectListener = typeof listeners.connect === 'function';
    const hasSecureConnectListener = typeof listeners.secureConnect === 'function';
    const hasCloseListener = typeof listeners.close === 'function';
    const onConnect = () => {
        if (hasConnectListener) {
            listeners.connect();
        }
        if (isTLSSocket(socket) && hasSecureConnectListener) {
            if (socket.authorized) {
                listeners.secureConnect();
            }
            else if (!socket.authorizationError) {
                socket.once('secureConnect', listeners.secureConnect);
            }
        }
        if (hasCloseListener) {
            socket.once('close', listeners.close);
        }
    };
    if (socket.writable && !socket.connecting) {
        onConnect();
    }
    else if (socket.connecting) {
        socket.once('connect', onConnect);
    }
    else if (socket.destroyed && hasCloseListener) {
        listeners.close(socket._hadError);
    }
};
exports.default = deferToConnect;
// For CommonJS default export support
module.exports = deferToConnect;
module.exports.default = deferToConnect;
}(source, source.exports));

(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
const defer_to_connect_1 = source.exports;
const nodejsMajorVersion = Number(process.versions.node.split('.')[0]);
const timer = (request) => {
    const timings = {
        start: Date.now(),
        socket: undefined,
        lookup: undefined,
        connect: undefined,
        secureConnect: undefined,
        upload: undefined,
        response: undefined,
        end: undefined,
        error: undefined,
        abort: undefined,
        phases: {
            wait: undefined,
            dns: undefined,
            tcp: undefined,
            tls: undefined,
            request: undefined,
            firstByte: undefined,
            download: undefined,
            total: undefined
        }
    };
    request.timings = timings;
    const handleError = (origin) => {
        const emit = origin.emit.bind(origin);
        origin.emit = (event, ...args) => {
            // Catches the `error` event
            if (event === 'error') {
                timings.error = Date.now();
                timings.phases.total = timings.error - timings.start;
                origin.emit = emit;
            }
            // Saves the original behavior
            return emit(event, ...args);
        };
    };
    handleError(request);
    request.prependOnceListener('abort', () => {
        timings.abort = Date.now();
        // Let the `end` response event be responsible for setting the total phase,
        // unless the Node.js major version is >= 13.
        if (!timings.response || nodejsMajorVersion >= 13) {
            timings.phases.total = Date.now() - timings.start;
        }
    });
    const onSocket = (socket) => {
        timings.socket = Date.now();
        timings.phases.wait = timings.socket - timings.start;
        const lookupListener = () => {
            timings.lookup = Date.now();
            timings.phases.dns = timings.lookup - timings.socket;
        };
        socket.prependOnceListener('lookup', lookupListener);
        defer_to_connect_1.default(socket, {
            connect: () => {
                timings.connect = Date.now();
                if (timings.lookup === undefined) {
                    socket.removeListener('lookup', lookupListener);
                    timings.lookup = timings.connect;
                    timings.phases.dns = timings.lookup - timings.socket;
                }
                timings.phases.tcp = timings.connect - timings.lookup;
                // This callback is called before flushing any data,
                // so we don't need to set `timings.phases.request` here.
            },
            secureConnect: () => {
                timings.secureConnect = Date.now();
                timings.phases.tls = timings.secureConnect - timings.connect;
            }
        });
    };
    if (request.socket) {
        onSocket(request.socket);
    }
    else {
        request.prependOnceListener('socket', onSocket);
    }
    const onUpload = () => {
        var _a;
        timings.upload = Date.now();
        timings.phases.request = timings.upload - (_a = timings.secureConnect, (_a !== null && _a !== void 0 ? _a : timings.connect));
    };
    const writableFinished = () => {
        if (typeof request.writableFinished === 'boolean') {
            return request.writableFinished;
        }
        // Node.js doesn't have `request.writableFinished` property
        return request.finished && request.outputSize === 0 && (!request.socket || request.socket.writableLength === 0);
    };
    if (writableFinished()) {
        onUpload();
    }
    else {
        request.prependOnceListener('finish', onUpload);
    }
    request.prependOnceListener('response', (response) => {
        timings.response = Date.now();
        timings.phases.firstByte = timings.response - timings.upload;
        response.timings = timings;
        handleError(response);
        response.prependOnceListener('end', () => {
            timings.end = Date.now();
            timings.phases.download = timings.end - timings.response;
            timings.phases.total = timings.end - timings.start;
        });
    });
    return timings;
};
exports.default = timer;
// For CommonJS default export support
module.exports = timer;
module.exports.default = timer;
}(source$1, source$1.exports));

var calculateRetryDelay$1 = {};

Object.defineProperty(calculateRetryDelay$1, "__esModule", { value: true });
const is_1$5 = dist.exports;
const errors_1$3 = errors$2;
const retryAfterStatusCodes = new Set([413, 429, 503]);
const isErrorWithResponse = (error) => (error instanceof errors_1$3.HTTPError || error instanceof errors_1$3.ParseError || error instanceof errors_1$3.MaxRedirectsError);
const calculateRetryDelay = ({ attemptCount, retryOptions, error }) => {
    if (attemptCount > retryOptions.limit) {
        return 0;
    }
    const hasMethod = retryOptions.methods.includes(error.options.method);
    const hasErrorCode = Reflect.has(error, 'code') && retryOptions.errorCodes.includes(error.code);
    const hasStatusCode = isErrorWithResponse(error) && retryOptions.statusCodes.includes(error.response.statusCode);
    if (!hasMethod || (!hasErrorCode && !hasStatusCode)) {
        return 0;
    }
    if (isErrorWithResponse(error)) {
        const { response } = error;
        if (response && Reflect.has(response.headers, 'retry-after') && retryAfterStatusCodes.has(response.statusCode)) {
            let after = Number(response.headers['retry-after']);
            if (is_1$5.default.nan(after)) {
                after = Date.parse(response.headers['retry-after']) - Date.now();
            }
            else {
                after *= 1000;
            }
            if (after > retryOptions.maxRetryAfter) {
                return 0;
            }
            return after;
        }
        if (response.statusCode === 413) {
            return 0;
        }
    }
    const noise = Math.random() * 100;
    return ((2 ** (attemptCount - 1)) * 1000) + noise;
};
calculateRetryDelay$1.default = calculateRetryDelay;

var getResponse = {};

// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage
const knownProperties = [
	'aborted',
	'complete',
	'destroy',
	'headers',
	'httpVersion',
	'httpVersionMinor',
	'httpVersionMajor',
	'method',
	'rawHeaders',
	'rawTrailers',
	'setTimeout',
	'socket',
	'statusCode',
	'statusMessage',
	'trailers',
	'url'
];

var mimicResponse$2 = (fromStream, toStream) => {
	const fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));

	for (const property of fromProperties) {
		// Don't overwrite existing properties.
		if (property in toStream) {
			continue;
		}

		toStream[property] = typeof fromStream[property] === 'function' ? fromStream[property].bind(fromStream) : fromStream[property];
	}

	return toStream;
};

const {
	pipeline: streamPipeline,
	PassThrough: PassThroughStream
} = require$$0__default$1['default'];
const zlib$1 = require$$0__default$6['default'];
const mimicResponse$1 = mimicResponse$2;

const decompressResponse$1 = response => {
	const contentEncoding = (response.headers['content-encoding'] || '').toLowerCase();

	if (!['gzip', 'deflate', 'br'].includes(contentEncoding)) {
		return response;
	}

	// TODO: Remove this when targeting Node.js 12.
	const isBrotli = contentEncoding === 'br';
	if (isBrotli && typeof zlib$1.createBrotliDecompress !== 'function') {
		return response;
	}

	const decompress = isBrotli ? zlib$1.createBrotliDecompress() : zlib$1.createUnzip();
	const stream = new PassThroughStream();

	decompress.on('error', error => {
		// Ignore empty response
		if (error.code === 'Z_BUF_ERROR') {
			stream.end();
			return;
		}

		stream.emit('error', error);
	});

	const finalStream = streamPipeline(response, decompress, stream, () => {});

	mimicResponse$1(response, finalStream);

	return finalStream;
};

var decompressResponse_1 = decompressResponse$1;

var progress = {};

Object.defineProperty(progress, "__esModule", { value: true });
const stream_1$1 = require$$0__default$1['default'];
const is_1$4 = dist.exports;
function createProgressStream(name, emitter, totalBytes) {
    let transformedBytes = 0;
    if (is_1$4.default.string(totalBytes)) {
        totalBytes = Number(totalBytes);
    }
    const progressStream = new stream_1$1.Transform({
        transform(chunk, _encoding, callback) {
            transformedBytes += chunk.length;
            const percent = totalBytes ? transformedBytes / totalBytes : 0;
            // Let `flush()` be responsible for emitting the last event
            if (percent < 1) {
                emitter.emit(name, {
                    percent,
                    transferred: transformedBytes,
                    total: totalBytes
                });
            }
            callback(undefined, chunk);
        },
        flush(callback) {
            emitter.emit(name, {
                percent: 1,
                transferred: transformedBytes,
                total: totalBytes
            });
            callback();
        }
    });
    emitter.emit(name, {
        percent: 0,
        transferred: 0,
        total: totalBytes
    });
    return progressStream;
}
progress.createProgressStream = createProgressStream;

Object.defineProperty(getResponse, "__esModule", { value: true });
const decompressResponse = decompressResponse_1;
const mimicResponse = mimicResponse$2;
const stream$2 = require$$0__default$1['default'];
const util_1$1 = require$$1__default['default'];
const progress_1$1 = progress;
const pipeline$1 = util_1$1.promisify(stream$2.pipeline);
getResponse.default = async (response, options, emitter) => {
    var _a;
    const downloadBodySize = Number(response.headers['content-length']) || undefined;
    const progressStream = progress_1$1.createProgressStream('downloadProgress', emitter, downloadBodySize);
    mimicResponse(response, progressStream);
    const newResponse = (options.decompress &&
        options.method !== 'HEAD' ? decompressResponse(progressStream) : progressStream);
    if (!options.decompress && ['gzip', 'deflate', 'br'].includes((_a = newResponse.headers['content-encoding'], (_a !== null && _a !== void 0 ? _a : '')))) {
        options.responseType = 'buffer';
    }
    emitter.emit('response', newResponse);
    return pipeline$1(response, progressStream).catch(error => {
        if (error.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
            throw error;
        }
    });
};

var timedOut = {};

var unhandle = {};

Object.defineProperty(unhandle, "__esModule", { value: true });
// When attaching listeners, it's very easy to forget about them.
// Especially if you do error handling and set timeouts.
// So instead of checking if it's proper to throw an error on every timeout ever,
// use this simple tool which will remove all listeners you have attached.
unhandle.default = () => {
    const handlers = [];
    return {
        once(origin, event, fn) {
            origin.once(event, fn);
            handlers.push({ origin, event, fn });
        },
        unhandleAll() {
            for (const handler of handlers) {
                const { origin, event, fn } = handler;
                origin.removeListener(event, fn);
            }
            handlers.length = 0;
        }
    };
};

Object.defineProperty(timedOut, "__esModule", { value: true });
const net = require$$0__default$7['default'];
const unhandle_1 = unhandle;
const reentry = Symbol('reentry');
const noop = () => { };
class TimeoutError$1 extends Error {
    constructor(threshold, event) {
        super(`Timeout awaiting '${event}' for ${threshold}ms`);
        this.event = event;
        this.name = 'TimeoutError';
        this.code = 'ETIMEDOUT';
    }
}
timedOut.TimeoutError = TimeoutError$1;
timedOut.default = (request, delays, options) => {
    if (Reflect.has(request, reentry)) {
        return noop;
    }
    request[reentry] = true;
    const cancelers = [];
    const { once, unhandleAll } = unhandle_1.default();
    const addTimeout = (delay, callback, event) => {
        var _a, _b;
        const timeout = setTimeout(callback, delay, delay, event);
        (_b = (_a = timeout).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        const cancel = () => {
            clearTimeout(timeout);
        };
        cancelers.push(cancel);
        return cancel;
    };
    const { host, hostname } = options;
    const timeoutHandler = (delay, event) => {
        if (request.socket) {
            // @ts-ignore We do not want the `socket hang up` error
            request.socket._hadError = true;
        }
        request.abort();
        request.emit('error', new TimeoutError$1(delay, event));
    };
    const cancelTimeouts = () => {
        for (const cancel of cancelers) {
            cancel();
        }
        unhandleAll();
    };
    request.once('error', error => {
        cancelTimeouts();
        // Save original behavior
        if (request.listenerCount('error') === 0) {
            throw error;
        }
    });
    request.once('abort', cancelTimeouts);
    once(request, 'response', (response) => {
        once(response, 'end', cancelTimeouts);
    });
    if (typeof delays.request !== 'undefined') {
        addTimeout(delays.request, timeoutHandler, 'request');
    }
    if (typeof delays.socket !== 'undefined') {
        const socketTimeoutHandler = () => {
            timeoutHandler(delays.socket, 'socket');
        };
        request.setTimeout(delays.socket, socketTimeoutHandler);
        // `request.setTimeout(0)` causes a memory leak.
        // We can just remove the listener and forget about the timer - it's unreffed.
        // See https://github.com/sindresorhus/got/issues/690
        cancelers.push(() => {
            request.removeListener('timeout', socketTimeoutHandler);
        });
    }
    once(request, 'socket', (socket) => {
        var _a;
        // @ts-ignore Node typings doesn't have this property
        const { socketPath } = request;
        /* istanbul ignore next: hard to test */
        if (socket.connecting) {
            const hasPath = Boolean((socketPath !== null && socketPath !== void 0 ? socketPath : net.isIP((_a = (hostname !== null && hostname !== void 0 ? hostname : host), (_a !== null && _a !== void 0 ? _a : ''))) !== 0));
            if (typeof delays.lookup !== 'undefined' && !hasPath && typeof socket.address().address === 'undefined') {
                const cancelTimeout = addTimeout(delays.lookup, timeoutHandler, 'lookup');
                once(socket, 'lookup', cancelTimeout);
            }
            if (typeof delays.connect !== 'undefined') {
                const timeConnect = () => addTimeout(delays.connect, timeoutHandler, 'connect');
                if (hasPath) {
                    once(socket, 'connect', timeConnect());
                }
                else {
                    once(socket, 'lookup', (error) => {
                        if (error === null) {
                            once(socket, 'connect', timeConnect());
                        }
                    });
                }
            }
            if (typeof delays.secureConnect !== 'undefined' && options.protocol === 'https:') {
                once(socket, 'connect', () => {
                    const cancelTimeout = addTimeout(delays.secureConnect, timeoutHandler, 'secureConnect');
                    once(socket, 'secureConnect', cancelTimeout);
                });
            }
        }
        if (typeof delays.send !== 'undefined') {
            const timeRequest = () => addTimeout(delays.send, timeoutHandler, 'send');
            /* istanbul ignore next: hard to test */
            if (socket.connecting) {
                once(socket, 'connect', () => {
                    once(request, 'upload-complete', timeRequest());
                });
            }
            else {
                once(request, 'upload-complete', timeRequest());
            }
        }
    });
    if (typeof delays.response !== 'undefined') {
        once(request, 'upload-complete', () => {
            const cancelTimeout = addTimeout(delays.response, timeoutHandler, 'response');
            once(request, 'response', cancelTimeout);
        });
    }
    return cancelTimeouts;
};

var urlToOptions = {};

Object.defineProperty(urlToOptions, "__esModule", { value: true });
const is_1$3 = dist.exports;
urlToOptions.default = (url) => {
    // Cast to URL
    url = url;
    const options = {
        protocol: url.protocol,
        hostname: is_1$3.default.string(url.hostname) && url.hostname.startsWith('[') ? url.hostname.slice(1, -1) : url.hostname,
        host: url.host,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        href: url.href,
        path: `${url.pathname || ''}${url.search || ''}`
    };
    if (is_1$3.default.string(url.port) && url.port.length !== 0) {
        options.port = Number(url.port);
    }
    if (url.username || url.password) {
        options.auth = `${url.username || ''}:${url.password || ''}`;
    }
    return options;
};

var pEvent$2 = {exports: {}};

var pTimeout$2 = {exports: {}};

var pFinally$1 = (promise, onFinally) => {
	onFinally = onFinally || (() => {});

	return promise.then(
		val => new Promise(resolve => {
			resolve(onFinally());
		}).then(() => val),
		err => new Promise(resolve => {
			resolve(onFinally());
		}).then(() => {
			throw err;
		})
	);
};

const pFinally = pFinally$1;

class TimeoutError extends Error {
	constructor(message) {
		super(message);
		this.name = 'TimeoutError';
	}
}

const pTimeout$1 = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
	if (typeof milliseconds !== 'number' || milliseconds < 0) {
		throw new TypeError('Expected `milliseconds` to be a positive number');
	}

	if (milliseconds === Infinity) {
		resolve(promise);
		return;
	}

	const timer = setTimeout(() => {
		if (typeof fallback === 'function') {
			try {
				resolve(fallback());
			} catch (error) {
				reject(error);
			}

			return;
		}

		const message = typeof fallback === 'string' ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
		const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);

		if (typeof promise.cancel === 'function') {
			promise.cancel();
		}

		reject(timeoutError);
	}, milliseconds);

	// TODO: Use native `finally` keyword when targeting Node.js 10
	pFinally(
		// eslint-disable-next-line promise/prefer-await-to-then
		promise.then(resolve, reject),
		() => {
			clearTimeout(timer);
		}
	);
});

pTimeout$2.exports = pTimeout$1;
// TODO: Remove this for the next major release
pTimeout$2.exports.default = pTimeout$1;

pTimeout$2.exports.TimeoutError = TimeoutError;

const pTimeout = pTimeout$2.exports;

const symbolAsyncIterator = Symbol.asyncIterator || '@@asyncIterator';

const normalizeEmitter = emitter => {
	const addListener = emitter.on || emitter.addListener || emitter.addEventListener;
	const removeListener = emitter.off || emitter.removeListener || emitter.removeEventListener;

	if (!addListener || !removeListener) {
		throw new TypeError('Emitter is not compatible');
	}

	return {
		addListener: addListener.bind(emitter),
		removeListener: removeListener.bind(emitter)
	};
};

const toArray = value => Array.isArray(value) ? value : [value];

const multiple = (emitter, event, options) => {
	let cancel;
	const ret = new Promise((resolve, reject) => {
		options = {
			rejectionEvents: ['error'],
			multiArgs: false,
			resolveImmediately: false,
			...options
		};

		if (!(options.count >= 0 && (options.count === Infinity || Number.isInteger(options.count)))) {
			throw new TypeError('The `count` option should be at least 0 or more');
		}

		// Allow multiple events
		const events = toArray(event);

		const items = [];
		const {addListener, removeListener} = normalizeEmitter(emitter);

		const onItem = (...args) => {
			const value = options.multiArgs ? args : args[0];

			if (options.filter && !options.filter(value)) {
				return;
			}

			items.push(value);

			if (options.count === items.length) {
				cancel();
				resolve(items);
			}
		};

		const rejectHandler = error => {
			cancel();
			reject(error);
		};

		cancel = () => {
			for (const event of events) {
				removeListener(event, onItem);
			}

			for (const rejectionEvent of options.rejectionEvents) {
				removeListener(rejectionEvent, rejectHandler);
			}
		};

		for (const event of events) {
			addListener(event, onItem);
		}

		for (const rejectionEvent of options.rejectionEvents) {
			addListener(rejectionEvent, rejectHandler);
		}

		if (options.resolveImmediately) {
			resolve(items);
		}
	});

	ret.cancel = cancel;

	if (typeof options.timeout === 'number') {
		const timeout = pTimeout(ret, options.timeout);
		timeout.cancel = cancel;
		return timeout;
	}

	return ret;
};

const pEvent$1 = (emitter, event, options) => {
	if (typeof options === 'function') {
		options = {filter: options};
	}

	options = {
		...options,
		count: 1,
		resolveImmediately: false
	};

	const arrayPromise = multiple(emitter, event, options);
	const promise = arrayPromise.then(array => array[0]); // eslint-disable-line promise/prefer-await-to-then
	promise.cancel = arrayPromise.cancel;

	return promise;
};

pEvent$2.exports = pEvent$1;
// TODO: Remove this for the next major release
pEvent$2.exports.default = pEvent$1;

pEvent$2.exports.multiple = multiple;

pEvent$2.exports.iterator = (emitter, event, options) => {
	if (typeof options === 'function') {
		options = {filter: options};
	}

	// Allow multiple events
	const events = toArray(event);

	options = {
		rejectionEvents: ['error'],
		resolutionEvents: [],
		limit: Infinity,
		multiArgs: false,
		...options
	};

	const {limit} = options;
	const isValidLimit = limit >= 0 && (limit === Infinity || Number.isInteger(limit));
	if (!isValidLimit) {
		throw new TypeError('The `limit` option should be a non-negative integer or Infinity');
	}

	if (limit === 0) {
		// Return an empty async iterator to avoid any further cost
		return {
			[Symbol.asyncIterator]() {
				return this;
			},
			async next() {
				return {
					done: true,
					value: undefined
				};
			}
		};
	}

	const {addListener, removeListener} = normalizeEmitter(emitter);

	let isDone = false;
	let error;
	let hasPendingError = false;
	const nextQueue = [];
	const valueQueue = [];
	let eventCount = 0;
	let isLimitReached = false;

	const valueHandler = (...args) => {
		eventCount++;
		isLimitReached = eventCount === limit;

		const value = options.multiArgs ? args : args[0];

		if (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();

			resolve({done: false, value});

			if (isLimitReached) {
				cancel();
			}

			return;
		}

		valueQueue.push(value);

		if (isLimitReached) {
			cancel();
		}
	};

	const cancel = () => {
		isDone = true;
		for (const event of events) {
			removeListener(event, valueHandler);
		}

		for (const rejectionEvent of options.rejectionEvents) {
			removeListener(rejectionEvent, rejectHandler);
		}

		for (const resolutionEvent of options.resolutionEvents) {
			removeListener(resolutionEvent, resolveHandler);
		}

		while (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();
			resolve({done: true, value: undefined});
		}
	};

	const rejectHandler = (...args) => {
		error = options.multiArgs ? args : args[0];

		if (nextQueue.length > 0) {
			const {reject} = nextQueue.shift();
			reject(error);
		} else {
			hasPendingError = true;
		}

		cancel();
	};

	const resolveHandler = (...args) => {
		const value = options.multiArgs ? args : args[0];

		if (options.filter && !options.filter(value)) {
			return;
		}

		if (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();
			resolve({done: true, value});
		} else {
			valueQueue.push(value);
		}

		cancel();
	};

	for (const event of events) {
		addListener(event, valueHandler);
	}

	for (const rejectionEvent of options.rejectionEvents) {
		addListener(rejectionEvent, rejectHandler);
	}

	for (const resolutionEvent of options.resolutionEvents) {
		addListener(resolutionEvent, resolveHandler);
	}

	return {
		[symbolAsyncIterator]() {
			return this;
		},
		async next() {
			if (valueQueue.length > 0) {
				const value = valueQueue.shift();
				return {
					done: isDone && valueQueue.length === 0 && !isLimitReached,
					value
				};
			}

			if (hasPendingError) {
				hasPendingError = false;
				throw error;
			}

			if (isDone) {
				return {
					done: true,
					value: undefined
				};
			}

			return new Promise((resolve, reject) => nextQueue.push({resolve, reject}));
		},
		async return(value) {
			cancel();
			return {
				done: isDone,
				value
			};
		}
	};
};

pEvent$2.exports.TimeoutError = pTimeout.TimeoutError;

Object.defineProperty(requestAsEventEmitter, "__esModule", { value: true });
const fs_1 = require$$0__default['default'];
const CacheableRequest = src$1;
const EventEmitter$1 = require$$0__default$3['default'];
const http$1 = require$$3__default['default'];
const stream$1 = require$$0__default$1['default'];
const url_1 = require$$0__default$4['default'];
const util_1 = require$$1__default['default'];
const is_1$2 = dist.exports;
const http_timer_1 = source$1.exports;
const calculate_retry_delay_1 = calculateRetryDelay$1;
const errors_1$2 = errors$2;
const get_response_1 = getResponse;
const normalize_arguments_1$1 = normalizeArguments.exports;
const progress_1 = progress;
const timed_out_1 = timedOut;
const types_1 = types;
const url_to_options_1 = urlToOptions;
const pEvent = pEvent$2.exports;
const setImmediateAsync = async () => new Promise(resolve => setImmediate(resolve));
const pipeline = util_1.promisify(stream$1.pipeline);
const redirectCodes = new Set([300, 301, 302, 303, 304, 307, 308]);
requestAsEventEmitter.default = (options) => {
    const emitter = new EventEmitter$1();
    const requestUrl = options.url.toString();
    const redirects = [];
    let retryCount = 0;
    let currentRequest;
    // `request.aborted` is a boolean since v11.0.0: https://github.com/nodejs/node/commit/4b00c4fafaa2ae8c41c1f78823c0feb810ae4723#diff-e3bc37430eb078ccbafe3aa3b570c91a
    const isAborted = () => typeof currentRequest.aborted === 'number' || currentRequest.aborted;
    const emitError = async (error) => {
        try {
            for (const hook of options.hooks.beforeError) {
                // eslint-disable-next-line no-await-in-loop
                error = await hook(error);
            }
            emitter.emit('error', error);
        }
        catch (error_) {
            emitter.emit('error', error_);
        }
    };
    const get = async () => {
        let httpOptions = await normalize_arguments_1$1.normalizeRequestArguments(options);
        const handleResponse = async (response) => {
            var _a;
            try {
                /* istanbul ignore next: fixes https://github.com/electron/electron/blob/cbb460d47628a7a146adf4419ed48550a98b2923/lib/browser/api/net.js#L59-L65 */
                if (options.useElectronNet) {
                    response = new Proxy(response, {
                        get: (target, name) => {
                            if (name === 'trailers' || name === 'rawTrailers') {
                                return [];
                            }
                            const value = target[name];
                            return is_1$2.default.function_(value) ? value.bind(target) : value;
                        }
                    });
                }
                const typedResponse = response;
                const { statusCode } = typedResponse;
                typedResponse.statusMessage = is_1$2.default.nonEmptyString(typedResponse.statusMessage) ? typedResponse.statusMessage : http$1.STATUS_CODES[statusCode];
                typedResponse.url = options.url.toString();
                typedResponse.requestUrl = requestUrl;
                typedResponse.retryCount = retryCount;
                typedResponse.redirectUrls = redirects;
                typedResponse.request = { options };
                typedResponse.isFromCache = (_a = typedResponse.fromCache, (_a !== null && _a !== void 0 ? _a : false));
                delete typedResponse.fromCache;
                if (!typedResponse.isFromCache) {
                    typedResponse.ip = response.socket.remoteAddress;
                }
                const rawCookies = typedResponse.headers['set-cookie'];
                if (Reflect.has(options, 'cookieJar') && rawCookies) {
                    let promises = rawCookies.map(async (rawCookie) => options.cookieJar.setCookie(rawCookie, typedResponse.url));
                    if (options.ignoreInvalidCookies) {
                        promises = promises.map(async (p) => p.catch(() => { }));
                    }
                    await Promise.all(promises);
                }
                if (options.followRedirect && Reflect.has(typedResponse.headers, 'location') && redirectCodes.has(statusCode)) {
                    typedResponse.resume(); // We're being redirected, we don't care about the response.
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                    if (statusCode === 303 || options.methodRewriting === false) {
                        if (options.method !== 'GET' && options.method !== 'HEAD') {
                            // Server responded with "see other", indicating that the resource exists at another location,
                            // and the client should request it from that location via GET or HEAD.
                            options.method = 'GET';
                        }
                        if (Reflect.has(options, 'body')) {
                            delete options.body;
                        }
                        if (Reflect.has(options, 'json')) {
                            delete options.json;
                        }
                        if (Reflect.has(options, 'form')) {
                            delete options.form;
                        }
                    }
                    if (redirects.length >= options.maxRedirects) {
                        throw new errors_1$2.MaxRedirectsError(typedResponse, options.maxRedirects, options);
                    }
                    // Handles invalid URLs. See https://github.com/sindresorhus/got/issues/604
                    const redirectBuffer = Buffer.from(typedResponse.headers.location, 'binary').toString();
                    const redirectUrl = new url_1.URL(redirectBuffer, options.url);
                    // Redirecting to a different site, clear cookies.
                    if (redirectUrl.hostname !== options.url.hostname && Reflect.has(options.headers, 'cookie')) {
                        delete options.headers.cookie;
                    }
                    redirects.push(redirectUrl.toString());
                    options.url = redirectUrl;
                    for (const hook of options.hooks.beforeRedirect) {
                        // eslint-disable-next-line no-await-in-loop
                        await hook(options, typedResponse);
                    }
                    emitter.emit('redirect', response, options);
                    await get();
                    return;
                }
                await get_response_1.default(typedResponse, options, emitter);
            }
            catch (error) {
                emitError(error);
            }
        };
        const handleRequest = async (request) => {
            let isPiped = false;
            let isFinished = false;
            // `request.finished` doesn't indicate whether this has been emitted or not
            request.once('finish', () => {
                isFinished = true;
            });
            currentRequest = request;
            const onError = (error) => {
                if (error instanceof timed_out_1.TimeoutError) {
                    error = new errors_1$2.TimeoutError(error, request.timings, options);
                }
                else {
                    error = new errors_1$2.RequestError(error, options);
                }
                if (!emitter.retry(error)) {
                    emitError(error);
                }
            };
            request.on('error', error => {
                if (isPiped) {
                    // Check if it's caught by `stream.pipeline(...)`
                    if (!isFinished) {
                        return;
                    }
                    // We need to let `TimedOutTimeoutError` through, because `stream.pipeline(…)` aborts the request automatically.
                    if (isAborted() && !(error instanceof timed_out_1.TimeoutError)) {
                        return;
                    }
                }
                onError(error);
            });
            try {
                http_timer_1.default(request);
                timed_out_1.default(request, options.timeout, options.url);
                emitter.emit('request', request);
                const uploadStream = progress_1.createProgressStream('uploadProgress', emitter, httpOptions.headers['content-length']);
                isPiped = true;
                await pipeline(httpOptions.body, uploadStream, request);
                request.emit('upload-complete');
            }
            catch (error) {
                if (isAborted() && error.message === 'Premature close') {
                    // The request was aborted on purpose
                    return;
                }
                onError(error);
            }
        };
        if (options.cache) {
            // `cacheable-request` doesn't support Node 10 API, fallback.
            httpOptions = {
                ...httpOptions,
                ...url_to_options_1.default(options.url)
            };
            // @ts-ignore `cacheable-request` has got invalid types
            const cacheRequest = options.cacheableRequest(httpOptions, handleResponse);
            cacheRequest.once('error', (error) => {
                if (error instanceof CacheableRequest.RequestError) {
                    emitError(new errors_1$2.RequestError(error, options));
                }
                else {
                    emitError(new errors_1$2.CacheError(error, options));
                }
            });
            cacheRequest.once('request', handleRequest);
        }
        else {
            // Catches errors thrown by calling `requestFn(…)`
            try {
                handleRequest(httpOptions[types_1.requestSymbol](options.url, httpOptions, handleResponse));
            }
            catch (error) {
                emitError(new errors_1$2.RequestError(error, options));
            }
        }
    };
    emitter.retry = error => {
        let backoff;
        retryCount++;
        try {
            backoff = options.retry.calculateDelay({
                attemptCount: retryCount,
                retryOptions: options.retry,
                error,
                computedValue: calculate_retry_delay_1.default({
                    attemptCount: retryCount,
                    retryOptions: options.retry,
                    error,
                    computedValue: 0
                })
            });
        }
        catch (error_) {
            emitError(error_);
            return false;
        }
        if (backoff) {
            const retry = async (options) => {
                try {
                    for (const hook of options.hooks.beforeRetry) {
                        // eslint-disable-next-line no-await-in-loop
                        await hook(options, error, retryCount);
                    }
                    await get();
                }
                catch (error_) {
                    emitError(error_);
                }
            };
            setTimeout(retry, backoff, { ...options, forceRefresh: true });
            return true;
        }
        return false;
    };
    emitter.abort = () => {
        emitter.prependListener('request', (request) => {
            request.abort();
        });
        if (currentRequest) {
            currentRequest.abort();
        }
    };
    (async () => {
        try {
            if (options.body instanceof fs_1.ReadStream) {
                await pEvent(options.body, 'open');
            }
            // Promises are executed immediately.
            // If there were no `setImmediate` here,
            // `promise.json()` would have no effect
            // as the request would be sent already.
            await setImmediateAsync();
            for (const hook of options.hooks.beforeRequest) {
                // eslint-disable-next-line no-await-in-loop
                await hook(options);
            }
            await get();
        }
        catch (error) {
            emitError(error);
        }
    })();
    return emitter;
};
requestAsEventEmitter.proxyEvents = (proxy, emitter) => {
    const events = [
        'request',
        'redirect',
        'uploadProgress',
        'downloadProgress'
    ];
    for (const event of events) {
        emitter.on(event, (...args) => {
            proxy.emit(event, ...args);
        });
    }
};

Object.defineProperty(asPromise$1, "__esModule", { value: true });
const EventEmitter = require$$0__default$3['default'];
const getStream = getStream$3.exports;
const PCancelable = pCancelable.exports;
const is_1$1 = dist.exports;
const errors_1$1 = errors$2;
const normalize_arguments_1 = normalizeArguments.exports;
const request_as_event_emitter_1$1 = requestAsEventEmitter;
const parseBody = (body, responseType, encoding) => {
    if (responseType === 'json') {
        return body.length === 0 ? '' : JSON.parse(body.toString());
    }
    if (responseType === 'buffer') {
        return Buffer.from(body);
    }
    if (responseType === 'text') {
        return body.toString(encoding);
    }
    throw new TypeError(`Unknown body type '${responseType}'`);
};
function createRejection(error) {
    const promise = Promise.reject(error);
    const returnPromise = () => promise;
    promise.json = returnPromise;
    promise.text = returnPromise;
    promise.buffer = returnPromise;
    promise.on = returnPromise;
    return promise;
}
asPromise$1.createRejection = createRejection;
function asPromise(options) {
    const proxy = new EventEmitter();
    let body;
    const promise = new PCancelable((resolve, reject, onCancel) => {
        const emitter = request_as_event_emitter_1$1.default(options);
        onCancel(emitter.abort);
        const emitError = async (error) => {
            try {
                for (const hook of options.hooks.beforeError) {
                    // eslint-disable-next-line no-await-in-loop
                    error = await hook(error);
                }
                reject(error);
            }
            catch (error_) {
                reject(error_);
            }
        };
        emitter.on('response', async (response) => {
            var _a;
            proxy.emit('response', response);
            // Download body
            try {
                body = await getStream.buffer(response, { encoding: 'binary' });
            }
            catch (error) {
                emitError(new errors_1$1.ReadError(error, options));
                return;
            }
            if ((_a = response.req) === null || _a === void 0 ? void 0 : _a.aborted) {
                // Canceled while downloading - will throw a `CancelError` or `TimeoutError` error
                return;
            }
            const isOk = () => {
                const { statusCode } = response;
                const limitStatusCode = options.followRedirect ? 299 : 399;
                return (statusCode >= 200 && statusCode <= limitStatusCode) || statusCode === 304;
            };
            // Parse body
            try {
                response.body = parseBody(body, options.responseType, options.encoding);
            }
            catch (error) {
                // Fall back to `utf8`
                response.body = body.toString();
                if (isOk()) {
                    const parseError = new errors_1$1.ParseError(error, response, options);
                    emitError(parseError);
                    return;
                }
            }
            try {
                for (const [index, hook] of options.hooks.afterResponse.entries()) {
                    // @ts-ignore TS doesn't notice that CancelableRequest is a Promise
                    // eslint-disable-next-line no-await-in-loop
                    response = await hook(response, async (updatedOptions) => {
                        const typedOptions = normalize_arguments_1.normalizeArguments(normalize_arguments_1.mergeOptions(options, {
                            ...updatedOptions,
                            retry: {
                                calculateDelay: () => 0
                            },
                            throwHttpErrors: false,
                            resolveBodyOnly: false
                        }));
                        // Remove any further hooks for that request, because we'll call them anyway.
                        // The loop continues. We don't want duplicates (asPromise recursion).
                        typedOptions.hooks.afterResponse = options.hooks.afterResponse.slice(0, index);
                        for (const hook of options.hooks.beforeRetry) {
                            // eslint-disable-next-line no-await-in-loop
                            await hook(typedOptions);
                        }
                        const promise = asPromise(typedOptions);
                        onCancel(() => {
                            promise.catch(() => { });
                            promise.cancel();
                        });
                        return promise;
                    });
                }
            }
            catch (error) {
                emitError(error);
                return;
            }
            // Check for HTTP error codes
            if (!isOk()) {
                const error = new errors_1$1.HTTPError(response, options);
                if (emitter.retry(error)) {
                    return;
                }
                if (options.throwHttpErrors) {
                    emitError(error);
                    return;
                }
            }
            resolve(options.resolveBodyOnly ? response.body : response);
        });
        emitter.once('error', reject);
        request_as_event_emitter_1$1.proxyEvents(proxy, emitter);
    });
    promise.on = (name, fn) => {
        proxy.on(name, fn);
        return promise;
    };
    const shortcut = (responseType) => {
        // eslint-disable-next-line promise/prefer-await-to-then
        const newPromise = promise.then(() => parseBody(body, responseType, options.encoding));
        Object.defineProperties(newPromise, Object.getOwnPropertyDescriptors(promise));
        return newPromise;
    };
    promise.json = () => {
        if (is_1$1.default.undefined(body) && is_1$1.default.undefined(options.headers.accept)) {
            options.headers.accept = 'application/json';
        }
        return shortcut('json');
    };
    promise.buffer = () => shortcut('buffer');
    promise.text = () => shortcut('text');
    return promise;
}
asPromise$1.default = asPromise;

var asStream$1 = {};

var duplexer3$1 = {exports: {}};

var stream = require$$0__default$1['default'];

function DuplexWrapper(options, writable, readable) {
  if (typeof readable === "undefined") {
    readable = writable;
    writable = options;
    options = null;
  }

  stream.Duplex.call(this, options);

  if (typeof readable.read !== "function") {
    readable = (new stream.Readable(options)).wrap(readable);
  }

  this._writable = writable;
  this._readable = readable;
  this._waiting = false;

  var self = this;

  writable.once("finish", function() {
    self.end();
  });

  this.once("finish", function() {
    writable.end();
  });

  readable.on("readable", function() {
    if (self._waiting) {
      self._waiting = false;
      self._read();
    }
  });

  readable.once("end", function() {
    self.push(null);
  });

  if (!options || typeof options.bubbleErrors === "undefined" || options.bubbleErrors) {
    writable.on("error", function(err) {
      self.emit("error", err);
    });

    readable.on("error", function(err) {
      self.emit("error", err);
    });
  }
}

DuplexWrapper.prototype = Object.create(stream.Duplex.prototype, {constructor: {value: DuplexWrapper}});

DuplexWrapper.prototype._write = function _write(input, encoding, done) {
  this._writable.write(input, encoding, done);
};

DuplexWrapper.prototype._read = function _read() {
  var buf;
  var reads = 0;
  while ((buf = this._readable.read()) !== null) {
    this.push(buf);
    reads++;
  }
  if (reads === 0) {
    this._waiting = true;
  }
};

duplexer3$1.exports = function duplex2(options, writable, readable) {
  return new DuplexWrapper(options, writable, readable);
};

duplexer3$1.exports.DuplexWrapper = DuplexWrapper;

Object.defineProperty(asStream$1, "__esModule", { value: true });
const duplexer3 = duplexer3$1.exports;
const http_1 = require$$3__default['default'];
const stream_1 = require$$0__default$1['default'];
const errors_1 = errors$2;
const request_as_event_emitter_1 = requestAsEventEmitter;
class ProxyStream extends stream_1.Duplex {
}
asStream$1.ProxyStream = ProxyStream;
function asStream(options) {
    const input = new stream_1.PassThrough();
    const output = new stream_1.PassThrough();
    const proxy = duplexer3(input, output);
    const piped = new Set();
    let isFinished = false;
    options.retry.calculateDelay = () => 0;
    if (options.body || options.json || options.form) {
        proxy.write = () => {
            proxy.destroy();
            throw new Error('Got\'s stream is not writable when the `body`, `json` or `form` option is used');
        };
    }
    else if (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH' || (options.allowGetBody && options.method === 'GET')) {
        options.body = input;
    }
    else {
        proxy.write = () => {
            proxy.destroy();
            throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        };
    }
    const emitter = request_as_event_emitter_1.default(options);
    const emitError = async (error) => {
        try {
            for (const hook of options.hooks.beforeError) {
                // eslint-disable-next-line no-await-in-loop
                error = await hook(error);
            }
            proxy.emit('error', error);
        }
        catch (error_) {
            proxy.emit('error', error_);
        }
    };
    // Cancels the request
    proxy._destroy = (error, callback) => {
        callback(error);
        emitter.abort();
    };
    emitter.on('response', (response) => {
        const { statusCode, isFromCache } = response;
        proxy.isFromCache = isFromCache;
        if (options.throwHttpErrors && statusCode !== 304 && (statusCode < 200 || statusCode > 299)) {
            emitError(new errors_1.HTTPError(response, options));
            return;
        }
        {
            const read = proxy._read;
            proxy._read = (...args) => {
                isFinished = true;
                proxy._read = read;
                return read.apply(proxy, args);
            };
        }
        if (options.encoding) {
            proxy.setEncoding(options.encoding);
        }
        // We cannot use `stream.pipeline(...)` here,
        // because if we did then `output` would throw
        // the original error before throwing `ReadError`.
        response.pipe(output);
        response.once('error', error => {
            emitError(new errors_1.ReadError(error, options));
        });
        for (const destination of piped) {
            if (destination.headersSent) {
                continue;
            }
            for (const [key, value] of Object.entries(response.headers)) {
                // Got gives *decompressed* data. Overriding `content-encoding` header would result in an error.
                // It's not possible to decompress already decompressed data, is it?
                const isAllowed = options.decompress ? key !== 'content-encoding' : true;
                if (isAllowed) {
                    destination.setHeader(key, value);
                }
            }
            destination.statusCode = response.statusCode;
        }
        proxy.emit('response', response);
    });
    request_as_event_emitter_1.proxyEvents(proxy, emitter);
    emitter.on('error', (error) => proxy.emit('error', error));
    const pipe = proxy.pipe.bind(proxy);
    const unpipe = proxy.unpipe.bind(proxy);
    proxy.pipe = (destination, options) => {
        if (isFinished) {
            throw new Error('Failed to pipe. The response has been emitted already.');
        }
        pipe(destination, options);
        if (destination instanceof http_1.ServerResponse) {
            piped.add(destination);
        }
        return destination;
    };
    proxy.unpipe = stream => {
        piped.delete(stream);
        return unpipe(stream);
    };
    proxy.on('pipe', source => {
        if (source instanceof http_1.IncomingMessage) {
            options.headers = {
                ...source.headers,
                ...options.headers
            };
        }
    });
    proxy.isFromCache = undefined;
    return proxy;
}
asStream$1.default = asStream;

var deepFreeze$1 = {};

Object.defineProperty(deepFreeze$1, "__esModule", { value: true });
const is_1 = dist.exports;
function deepFreeze(object) {
    for (const value of Object.values(object)) {
        if (is_1.default.plainObject(value) || is_1.default.array(value)) {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}
deepFreeze$1.default = deepFreeze;

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = dist.exports;
const as_promise_1 = asPromise$1;
const as_stream_1 = asStream$1;
const errors = errors$2;
const normalize_arguments_1 = normalizeArguments.exports;
const deep_freeze_1 = deepFreeze$1;
const getPromiseOrStream = (options) => options.isStream ? as_stream_1.default(options) : as_promise_1.default(options);
const isGotInstance = (value) => (Reflect.has(value, 'defaults') && Reflect.has(value.defaults, 'options'));
const aliases = [
    'get',
    'post',
    'put',
    'patch',
    'head',
    'delete'
];
exports.defaultHandler = (options, next) => next(options);
const create = (defaults) => {
    // Proxy properties from next handlers
    defaults._rawHandlers = defaults.handlers;
    defaults.handlers = defaults.handlers.map(fn => ((options, next) => {
        // This will be assigned by assigning result
        let root;
        const result = fn(options, newOptions => {
            root = next(newOptions);
            return root;
        });
        if (result !== root && !options.isStream && root) {
            const typedResult = result;
            const { then: promiseThen, catch: promiseCatch, finally: promiseFianlly } = typedResult;
            Object.setPrototypeOf(typedResult, Object.getPrototypeOf(root));
            Object.defineProperties(typedResult, Object.getOwnPropertyDescriptors(root));
            // These should point to the new promise
            // eslint-disable-next-line promise/prefer-await-to-then
            typedResult.then = promiseThen;
            typedResult.catch = promiseCatch;
            typedResult.finally = promiseFianlly;
        }
        return result;
    }));
    // @ts-ignore Because the for loop handles it for us, as well as the other Object.defines
    const got = (url, options) => {
        var _a;
        let iteration = 0;
        const iterateHandlers = (newOptions) => {
            return defaults.handlers[iteration++](newOptions, iteration === defaults.handlers.length ? getPromiseOrStream : iterateHandlers);
        };
        /* eslint-disable @typescript-eslint/return-await */
        try {
            return iterateHandlers(normalize_arguments_1.normalizeArguments(url, options, defaults));
        }
        catch (error) {
            if ((_a = options) === null || _a === void 0 ? void 0 : _a.isStream) {
                throw error;
            }
            else {
                // @ts-ignore It's an Error not a response, but TS thinks it's calling .resolve
                return as_promise_1.createRejection(error);
            }
        }
        /* eslint-enable @typescript-eslint/return-await */
    };
    got.extend = (...instancesOrOptions) => {
        const optionsArray = [defaults.options];
        let handlers = [...defaults._rawHandlers];
        let isMutableDefaults;
        for (const value of instancesOrOptions) {
            if (isGotInstance(value)) {
                optionsArray.push(value.defaults.options);
                handlers.push(...value.defaults._rawHandlers);
                isMutableDefaults = value.defaults.mutableDefaults;
            }
            else {
                optionsArray.push(value);
                if (Reflect.has(value, 'handlers')) {
                    handlers.push(...value.handlers);
                }
                isMutableDefaults = value.mutableDefaults;
            }
        }
        handlers = handlers.filter(handler => handler !== exports.defaultHandler);
        if (handlers.length === 0) {
            handlers.push(exports.defaultHandler);
        }
        return create({
            options: normalize_arguments_1.mergeOptions(...optionsArray),
            handlers,
            mutableDefaults: Boolean(isMutableDefaults)
        });
    };
    // @ts-ignore The missing methods because the for-loop handles it for us
    got.stream = (url, options) => got(url, { ...options, isStream: true });
    for (const method of aliases) {
        // @ts-ignore Cannot properly type a function with multiple definitions yet
        got[method] = (url, options) => got(url, { ...options, method });
        got.stream[method] = (url, options) => got.stream(url, { ...options, method });
    }
    // @ts-ignore The missing property is added below
    got.paginate = async function* (url, options) {
        let normalizedOptions = normalize_arguments_1.normalizeArguments(url, options, defaults);
        const pagination = normalizedOptions._pagination;
        if (!is_1.default.object(pagination)) {
            throw new Error('`options._pagination` must be implemented');
        }
        const all = [];
        while (true) {
            // @ts-ignore See https://github.com/sindresorhus/got/issues/954
            // eslint-disable-next-line no-await-in-loop
            const result = await got(normalizedOptions);
            // eslint-disable-next-line no-await-in-loop
            const parsed = await pagination.transform(result);
            const current = [];
            for (const item of parsed) {
                if (pagination.filter(item, all, current)) {
                    if (!pagination.shouldContinue(item, all, current)) {
                        return;
                    }
                    yield item;
                    all.push(item);
                    current.push(item);
                    if (all.length === pagination.countLimit) {
                        return;
                    }
                }
            }
            const optionsToMerge = pagination.paginate(result, all, current);
            if (optionsToMerge === false) {
                return;
            }
            if (optionsToMerge !== undefined) {
                normalizedOptions = normalize_arguments_1.normalizeArguments(normalizedOptions, optionsToMerge);
            }
        }
    };
    got.paginate.all = async (url, options) => {
        const results = [];
        for await (const item of got.paginate(url, options)) {
            results.push(item);
        }
        return results;
    };
    Object.assign(got, { ...errors, mergeOptions: normalize_arguments_1.mergeOptions });
    Object.defineProperty(got, 'defaults', {
        value: defaults.mutableDefaults ? defaults : deep_freeze_1.default(defaults),
        writable: defaults.mutableDefaults,
        configurable: defaults.mutableDefaults,
        enumerable: true
    });
    return got;
};
exports.default = create;
}(create));

(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require$$0__default$4['default'];
const create_1 = create;
const defaults = {
    options: {
        method: 'GET',
        retry: {
            limit: 2,
            methods: [
                'GET',
                'PUT',
                'HEAD',
                'DELETE',
                'OPTIONS',
                'TRACE'
            ],
            statusCodes: [
                408,
                413,
                429,
                500,
                502,
                503,
                504,
                521,
                522,
                524
            ],
            errorCodes: [
                'ETIMEDOUT',
                'ECONNRESET',
                'EADDRINUSE',
                'ECONNREFUSED',
                'EPIPE',
                'ENOTFOUND',
                'ENETUNREACH',
                'EAI_AGAIN'
            ],
            maxRetryAfter: undefined,
            calculateDelay: ({ computedValue }) => computedValue
        },
        timeout: {},
        headers: {
            'user-agent': 'got (https://github.com/sindresorhus/got)'
        },
        hooks: {
            init: [],
            beforeRequest: [],
            beforeRedirect: [],
            beforeRetry: [],
            beforeError: [],
            afterResponse: []
        },
        decompress: true,
        throwHttpErrors: true,
        followRedirect: true,
        isStream: false,
        cache: false,
        dnsCache: false,
        useElectronNet: false,
        responseType: 'text',
        resolveBodyOnly: false,
        maxRedirects: 10,
        prefixUrl: '',
        methodRewriting: true,
        allowGetBody: false,
        ignoreInvalidCookies: false,
        context: {},
        _pagination: {
            transform: (response) => {
                if (response.request.options.responseType === 'json') {
                    return response.body;
                }
                return JSON.parse(response.body);
            },
            paginate: response => {
                if (!Reflect.has(response.headers, 'link')) {
                    return false;
                }
                const items = response.headers.link.split(',');
                let next;
                for (const item of items) {
                    const parsed = item.split(';');
                    if (parsed[1].includes('next')) {
                        next = parsed[0].trimStart().trim();
                        next = next.slice(1, -1);
                        break;
                    }
                }
                if (next) {
                    const options = {
                        url: new url_1.URL(next)
                    };
                    return options;
                }
                return false;
            },
            filter: () => true,
            shouldContinue: () => true,
            countLimit: Infinity
        }
    },
    handlers: [create_1.defaultHandler],
    mutableDefaults: false
};
const got = create_1.default(defaults);
exports.default = got;
// For CommonJS default export support
module.exports = got;
module.exports.default = got;
// Export types
__export(types);
var as_stream_1 = asStream$1;
exports.ResponseStream = as_stream_1.ProxyStream;
var errors_1 = errors$2;
exports.GotError = errors_1.GotError;
exports.CacheError = errors_1.CacheError;
exports.RequestError = errors_1.RequestError;
exports.ReadError = errors_1.ReadError;
exports.ParseError = errors_1.ParseError;
exports.HTTPError = errors_1.HTTPError;
exports.MaxRedirectsError = errors_1.MaxRedirectsError;
exports.UnsupportedProtocolError = errors_1.UnsupportedProtocolError;
exports.TimeoutError = errors_1.TimeoutError;
exports.CancelError = errors_1.CancelError;
}(source$2, source$2.exports));

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { GotError } = source$2.exports;

/**
 * An error that contains the error from the Camunda REST API as also the HTTP error details like the status code
 * and status message.
 *
 * If a non 2xx status code occurs, got will throw a `got.HTTPError` that contains the error response from the engine.
 * This error isn't extendable, because it sets the error message in the constructor. Therefore we inherit from the
 * got base error type (`got.GotError`), copy the logic form the `got.HTTPError` class and extend it with our API
 * response message.
 *
 * @see https://docs.camunda.org/manual/latest/reference/rest/overview/#error-handling
 */
class EngineError$1 extends GotError {
  constructor(httpError) {
    const { response, options } = httpError;
    let error, type;

    if (response.body && response.body.message && response.body.type) {
      error = response.body.message;
      type = response.body.type;
    } else {
      error = response.body;
      type = "undefined";
    }

    super(
      `Response code ${response.statusCode} (${response.statusMessage}); Error: ${error}; Type: ${type}`,
      {},
      options
    );
    this.name = "EngineError";

    Object.defineProperty(this, "response", {
      enumerable: false,
      value: response
    });
  }
}

var EngineError_1 = EngineError$1;

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const got$1 = source$2.exports;
const EngineError = EngineError_1;

class EngineService$1 {
  constructor({ workerId, baseUrl, interceptors }) {
    this.workerId = workerId;
    this.baseUrl = `${baseUrl.replace(/\/$/, "")}`;
    this.interceptors = interceptors;

    /**
     * Bind member methods
     */
    this.request = this.request.bind(this);
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
    this.fetchAndLock = this.fetchAndLock.bind(this);
    this.complete = this.complete.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.lock = this.lock.bind(this);
  }

  async request(method, path, options) {
    const url = `${this.baseUrl}${path}`;
    let newOptions = { method, ...options };

    if (this.interceptors) {
      newOptions = this.interceptors.reduce((config, interceptor) => {
        return interceptor(config);
      }, newOptions);
    }

    try {
      const { body, headers } = await got$1(url, {
        ...newOptions,
        responseType: "buffer"
      });
      if (headers["content-type"] === "application/json") {
        return JSON.parse(body.toString("utf-8"));
      } else {
        return body;
      }
    } catch (e) {
      if (e instanceof got$1.HTTPError) {
        throw new EngineError(e);
      }

      throw e;
    }
  }

  /**
   * @throws HTTPError
   * @param path
   * @param options
   * @returns {Promise}
   */
  post(path, options) {
    return this.request("POST", path, options);
  }

  /**
   * @throws HTTPError
   * @param path
   * @param options
   * @returns {Promise}
   */
  get(path, options) {
    return this.request("GET", path, options);
  }

  /**
   * @throws HTTPError
   * @param requestBody
   * @returns {Promise}
   */
  fetchAndLock(requestBody) {
    return this.post("/external-task/fetchAndLock", {
      json: { ...requestBody, workerId: this.workerId }
    });
  }

  /**
   * @throws HTTPError
   * @param id
   * @param variables
   * @param localVariables
   * @returns {Promise}
   */
  complete({ id, variables, localVariables }) {
    return this.post(`/external-task/${id}/complete`, {
      json: { workerId: this.workerId, variables, localVariables }
    });
  }

  /**
   * @throws HTTPError
   * @param id
   * @param options
   * @returns {Promise}
   */
  handleFailure({ id }, options) {
    return this.post(`/external-task/${id}/failure`, {
      json: { ...options, workerId: this.workerId }
    });
  }

  /**
   * @throws HTTPError
   * @param id
   * @param errorCode
   * @param errorMessage
   * @param variables
   * @returns {Promise}
   */
  handleBpmnError({ id }, errorCode, errorMessage, variables) {
    return this.post(`/external-task/${id}/bpmnError`, {
      json: { errorCode, workerId: this.workerId, errorMessage, variables }
    });
  }

  /**
   * @throws HTTPError
   * @param id
   * @param lockDuration
   * @returns {Promise}
   */
  lock({ id }, lockDuration) {
    return this.post(`/external-task/${id}/lock`, {
      json: {
        lockDuration,
        workerId: this.workerId
      }
    });
  }

  /**
   * @throws HTTPError
   * @param id
   * @param newDuration
   * @returns {Promise}
   */
  extendLock({ id }, newDuration) {
    return this.post(`/external-task/${id}/extendLock`, {
      json: { newDuration, workerId: this.workerId }
    });
  }

  /**
   * @throws HTTPError
   * @param id
   * @returns {Promise}
   */
  unlock({ id }) {
    return this.post(`/external-task/${id}/unlock`, {});
  }
}

var EngineService_1 = EngineService$1;

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Client
const MISSING_BASE_URL$1 =
  "Couldn't instantiate Client, missing configuration parameter 'baseUrl'";
const WRONG_INTERCEPTOR$1 =
  "Interceptors should be a function or an array of functions";
const WRONG_MIDDLEWARES$1 =
  "Middleware(s) should be a function or an array of functions";
const ALREADY_REGISTERED$1 = "Subscription failed, already subscribed to topic";
const MISSING_HANDLER$1 = "Subscription failed, missing handler function";

// Task Service
const MISSING_TASK$1 = "Couldn't complete task, task id is missing";
const MISSING_ERROR_CODE$1 =
  "Couldn't throw BPMN Error, no error code was provided";
const MISSING_DURATION$1 = "Couldn't lock task, no duration was provided";
const MISSING_NEW_DURATION$1 =
  "Couldn't extend lock time, no new duration was provided";

// Basic Auth Interceptor
const MISSING_BASIC_AUTH_PARAMS$1 =
  "Couldn't instantiate BasicAuthInterceptor, missing configuration parameter " +
  "'username' or 'password'";

// Keycloak Auth Interceptor
const MISSING_KEYCLOAK_AUTH_PARAMS$1 =
  "Couldn't instantiate KeycloakAuthInterceptor, missing configuration parameter " +
  "'tokenEndpoint', 'clientId' or 'clientSecret'";
const UNEXPECTED_KEYCLOAK_TOKEN_RESULT$1 =
  "Couldn't get access token from Keycloak provider; got";

// FileService
const MISSING_FILE_OPTIONS$1 =
  "Couldn't create a File, make sure to provide one of the following" +
  " parameters: \n- path \ntypedValue";

var errors$1 = {
  MISSING_BASE_URL: MISSING_BASE_URL$1,
  ALREADY_REGISTERED: ALREADY_REGISTERED$1,
  MISSING_HANDLER: MISSING_HANDLER$1,
  MISSING_TASK: MISSING_TASK$1,
  WRONG_INTERCEPTOR: WRONG_INTERCEPTOR$1,
  MISSING_ERROR_CODE: MISSING_ERROR_CODE$1,
  MISSING_DURATION: MISSING_DURATION$1,
  MISSING_NEW_DURATION: MISSING_NEW_DURATION$1,
  MISSING_BASIC_AUTH_PARAMS: MISSING_BASIC_AUTH_PARAMS$1,
  MISSING_KEYCLOAK_AUTH_PARAMS: MISSING_KEYCLOAK_AUTH_PARAMS$1,
  UNEXPECTED_KEYCLOAK_TOKEN_RESULT: UNEXPECTED_KEYCLOAK_TOKEN_RESULT$1,
  WRONG_MIDDLEWARES: WRONG_MIDDLEWARES$1,
  MISSING_FILE_OPTIONS: MISSING_FILE_OPTIONS$1
};

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs$1 = require$$0__default['default'];
const util$2 = require$$1__default['default'];
const path$2 = path__default['default'];

const { MISSING_FILE_OPTIONS } = errors$1;

class File$1 {
  /**
   * @throws Error
   * @param options
   * @param options.localPath
   * @param options.remotePath
   * @param options.typedValue
   * @param options.filename
   * @param options.encoding
   * @param options.mimetype
   * @param options.engineService
   */
  constructor(options = {}) {
    this.load = this.load.bind(this);
    this.createTypedValue = this.createTypedValue.bind(this);
    this.__readFile = util$2.promisify(fs$1.readFile);

    const { localPath, remotePath, typedValue } = options;

    if (!localPath && !remotePath && !typedValue) {
      throw new Error(MISSING_FILE_OPTIONS);
    }

    Object.assign(this, options);

    if (typedValue) {
      Object.assign(this, typedValue.valueInfo);
      delete this.typedValue;
    }

    this.filename = this.filename || path$2.basename(remotePath || localPath);
    this.content = "";
  }

  /**
   * Reads file from localPath
   * @throws Error
   */
  async load() {
    // get content either locally or from remotePath
    this.content = this.remotePath
      ? await this.engineService.get(this.remotePath)
      : await this.__readFile(this.localPath);

    return this;
  }

  createTypedValue() {
    const valueInfo = { filename: this.filename };
    if (this.encoding) {
      valueInfo.encoding = this.encoding;
    }
    if (this.mimetype) {
      valueInfo.mimetype = this.mimetype;
    }
    return {
      type: "file",
      value: this.content.toString("base64"),
      valueInfo
    };
  }
}

var File_1 = File$1;

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const File = File_1;

/**
 * Checks if parameter is a function
 */
const isFunction$1 = f => typeof f === "function";

/**
 * Applies test function on each element on the array and ANDs the results
 * @param [Array] arr
 * @param [Function] test
 */
const andArrayWith = (arr, test) =>
  arr.reduce((boolean, current) => boolean && test(current), true);

/**
 * Checks if parameter is an array of functions
 */
const isArrayOfFunctions$1 = a =>
  Array.isArray(a) && a.length > 0 && andArrayWith(a, isFunction$1);

/**
 * Checks if parameter is undefined or null
 */
const isUndefinedOrNull$2 = a => typeof a === "undefined" || a === null;

const typeMatchers = {
  null: isUndefinedOrNull$2,

  /**
   * @returns {boolean} true if value is Integer
   */
  integer(a) {
    return (
      Number.isInteger(a) && a >= -Math.pow(2, 31) && a <= Math.pow(2, 31) - 1
    );
  },

  /**
   * @returns {boolean} true if value is Long
   */
  long(a) {
    return Number.isInteger(a) && !typeMatchers.integer(a);
  },

  /**
   * @returns {boolean} true if value is Double
   */
  double(a) {
    return typeof a === "number" && !Number.isInteger(a);
  },

  /**
   * @returns {boolean} true if value is Boolean
   */
  boolean(a) {
    return typeof a === "boolean";
  },

  /**
   * @returns {boolean} true if value is String
   */
  string(a) {
    return typeof a === "string";
  },

  /**
   * @returns {boolean} true if value is File
   */
  file(a) {
    return a instanceof File;
  },

  /**
   * @returns {boolean} true if value is Date.
   * */
  date(a) {
    return a instanceof Date;
  },

  /**
   * @returns {boolean} true if value is JSON
   */
  json(a) {
    return typeof a === "object";
  }
};

/**
 * @returns the type of the variable
 * @param variable: external task variable
 */
const getVariableType$1 = variable => {
  const match = Object.entries(
    typeMatchers
  ).filter(([matcherKey, matcherFunction]) => matcherFunction(variable))[0];

  return match[0];
};

/**
 * @returns object mapped by applying mapper to each of its entries
 * @param object
 * @param mapper
 */
const mapEntries$1 = (object, mapper) =>
  Object.entries(object).reduce((accumulator, [key, value]) => {
    return { ...accumulator, ...mapper({ key, value }) };
  }, {});

const deserializeVariable$1 = ({
  key,
  typedValue,
  processInstanceId,
  engineService
}) => {
  let { value, type } = { ...typedValue };

  type = type.toLowerCase();

  if (type === "json") {
    value = JSON.parse(value);
  }

  if (type === "file") {
    let remotePath = `/execution/${processInstanceId}/localVariables/${key}/data`;
    value = new File({ typedValue, remotePath, engineService });
  }

  if (type === "date") {
    value = new Date(value);
  }

  return { ...typedValue, value, type };
};

const serializeVariable$1 = ({ key, typedValue }) => {
  let { value, type } = { ...typedValue };

  type = type.toLowerCase();

  if (type === "file" && value instanceof File) {
    return value.createTypedValue();
  }

  if (type === "json" && typeof value !== "string") {
    value = JSON.stringify(value);
  }

  if (type === "date" && value instanceof Date) {
    value = value.toISOString().replace(/Z$/, "+0000");
  }

  return { ...typedValue, value, type };
};

var utils$3 = {
  isFunction: isFunction$1,
  andArrayWith,
  isArrayOfFunctions: isArrayOfFunctions$1,
  isUndefinedOrNull: isUndefinedOrNull$2,
  getVariableType: getVariableType$1,
  mapEntries: mapEntries$1,
  serializeVariable: serializeVariable$1,
  deserializeVariable: deserializeVariable$1
};

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {
  getVariableType,
  mapEntries,
  serializeVariable,
  deserializeVariable
} = utils$3;

function Variables$2(initialVariables = {}, options = {}) {
  const { readOnly, processInstanceId, engineService } = options;

  let dirtyVariables = {};

  /**
   * @returns the typedValue corresponding to variableName
   * @param variableName
   */
  this.getTyped = variableName => {
    let typedValue = initialVariables[variableName];

    if (!typedValue) {
      return null;
    }

    return deserializeVariable({
      key: variableName,
      typedValue,
      processInstanceId,
      engineService
    });
  };

  /**
   * @returns the value corresponding to variableName
   * @param variableName
   */
  this.get = variableName => {
    const { value } = { ...this.getTyped(variableName) };
    return value;
  };

  /**
   * @returns the values of all variables
   */
  this.getAll = () =>
    mapEntries(initialVariables, ({ key }) => ({ [key]: this.get(key) }));

  /**
   * @returns the typed values of all variables
   */
  this.getAllTyped = () =>
    mapEntries(initialVariables, ({ key }) => ({ [key]: this.getTyped(key) }));

  /**
   * @returns the dirty variables
   */
  this.getDirtyVariables = () => {
    return dirtyVariables;
  };

  if (!readOnly) {
    /**
     * Sets typed value for variable corresponding to variableName
     * @param variableName
     * @param typedValue
     */
    this.setTyped = (variableName, typedValue) => {
      initialVariables[variableName] = dirtyVariables[
        variableName
      ] = serializeVariable({
        key: variableName,
        typedValue
      });
      return this;
    };

    /**
     * Sets value for variable corresponding to variableName
     * The type is determined automatically
     * @param variableName
     * @param value
     */
    this.set = (variableName, value) => {
      const type = getVariableType(value);
      return this.setTyped(variableName, { type, value, valueInfo: {} });
    };

    /**
     * Sets the values of multiple variables at once
     * The new values are merged with existing ones
     * @param values
     */
    this.setAll = values => {
      const self = this;
      Object.entries(values).forEach(([key, value]) => {
        self.set(key, value);
      });
      return self;
    };

    /**
     * Sets the typed values of multiple variables at once
     * The new typedValues are merged with existing ones
     * @param typedValues
     */
    this.setAllTyped = typedValues => {
      const self = this;
      Object.entries(typedValues).forEach(([key, typedValue]) => {
        self.setTyped(key, typedValue);
      });
      return self;
    };
  }
}

var Variables_1 = Variables$2;

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {
  MISSING_TASK,
  MISSING_ERROR_CODE,
  MISSING_DURATION,
  MISSING_NEW_DURATION
} = errors$1;
const { isUndefinedOrNull: isUndefinedOrNull$1 } = utils$3;
const Variables$1 = Variables_1;

class TaskService$1 {
  constructor(events, api) {
    this.events = events;
    this.api = api;

    this.sanitizeTask = this.sanitizeTask.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.complete = this.complete.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.handleBpmnError = this.handleBpmnError.bind(this);
    this.lock = this.lock.bind(this);
    this.extendLock = this.extendLock.bind(this);
  }

  sanitizeTask(task) {
    if (typeof task === "object") {
      return { id: task.id };
    } else {
      return { id: task };
    }
  }

  success(event, ...args) {
    this.events.emit(`${event}:success`, ...args);
  }

  error(event, ...args) {
    this.events.emit(`${event}:error`, ...args);
  }

  /**
   * @throws Error
   * @param task
   * @returns {Promise<void>}
   */
  async complete(task, variables, localVariables) {
    if (isUndefinedOrNull$1(task)) {
      throw new Error(MISSING_TASK);
    }

    const sanitizedTask = this.sanitizeTask(task);
    try {
      const requestBody = { ...sanitizedTask };
      if (variables instanceof Variables$1) {
        requestBody.variables = variables.getDirtyVariables();
      }
      if (localVariables instanceof Variables$1) {
        requestBody.localVariables = localVariables.getDirtyVariables();
      }
      await this.api.complete(requestBody);
      this.success("complete", task);
    } catch (e) {
      this.error("complete", task, e);
    }
  }

  /**
   * @throws Error
   * @param task
   * @param options
   * @returns {Promise<void>}
   */
  async handleFailure(task, options) {
    if (isUndefinedOrNull$1(task)) {
      throw new Error(MISSING_TASK);
    }

    const sanitizedTask = this.sanitizeTask(task);
    try {
      await this.api.handleFailure(sanitizedTask, options);
      this.success("handleFailure", task);
    } catch (e) {
      this.error("handleFailure", task, e);
    }
  }

  /**
   * @throws Error
   * @param task
   * @param errorCode
   * @param errorMessage
   * @param variables
   * @returns {Promise<void>}
   */
  async handleBpmnError(task, errorCode, errorMessage, variables) {
    if (isUndefinedOrNull$1(task)) {
      throw new Error(MISSING_TASK);
    }
    if (!errorCode) {
      throw new Error(MISSING_ERROR_CODE);
    }

    const sanitizedTask = this.sanitizeTask(task);

    try {
      await this.api.handleBpmnError(
        sanitizedTask,
        errorCode,
        errorMessage,
        variables instanceof Variables$1
          ? variables.getDirtyVariables()
          : undefined
      );
      this.success("handleBpmnError", task);
    } catch (e) {
      this.error("handleBpmnError", task, e);
    }
  }

  /**
   * @throws Error
   * @param task
   * @param duration
   * @returns {Promise<void>}
   */
  async lock(task, duration) {
    if (isUndefinedOrNull$1(task)) {
      throw new Error(MISSING_TASK);
    }
    if (!duration) {
      throw new Error(MISSING_DURATION);
    }

    const sanitizedTask = this.sanitizeTask(task);
    try {
      await this.api.lock(sanitizedTask, duration);
      this.success("lock", task);
    } catch (e) {
      this.error("lock", task, e);
    }
  }

  /**
   * @throws Error
   * @param task
   * @param newDuration
   * @returns {Promise<void>}
   */
  async extendLock(task, newDuration) {
    if (isUndefinedOrNull$1(task)) {
      throw new Error(MISSING_TASK);
    }
    if (!newDuration) {
      throw new Error(MISSING_NEW_DURATION);
    }

    const sanitizedTask = this.sanitizeTask(task);
    try {
      await this.api.extendLock(sanitizedTask, newDuration);
      this.success("extendLock", task);
    } catch (e) {
      this.error("extendLock", task, e);
    }
  }

  /**
   * @throws Error
   * @param task
   * @returns {Promise<void>}
   */
  async unlock(task) {
    if (isUndefinedOrNull$1(task)) {
      throw new Error(MISSING_TASK);
    }

    const sanitizedTask = this.sanitizeTask(task);
    try {
      await this.api.unlock(sanitizedTask);
      this.success("unlock", task);
    } catch (e) {
      this.error("unlock", task, e);
    }
  }
}

var TaskService_1 = TaskService$1;

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const events$1 = require$$0__default$3['default'];

const EngineService = EngineService_1;
const TaskService = TaskService_1;
const Variables = Variables_1;

const {
  MISSING_BASE_URL,
  ALREADY_REGISTERED,
  MISSING_HANDLER,
  WRONG_INTERCEPTOR,
  WRONG_MIDDLEWARES
} = errors$1;

const {
  isFunction,
  isArrayOfFunctions,
  isUndefinedOrNull
} = utils$3;

const defaultOptions = {
  workerId: "some-random-id",
  maxTasks: 10,
  usePriority: true,
  interval: 300,
  lockDuration: 50000,
  autoPoll: true
};

/**
 * @throws Error
 * @param customOptions
 * @param customOptions.baseUrl: baseUrl to api | REQUIRED
 * @param customOptions.workerId
 * @param customOptions.maxTasks
 * @param customOptions.interval
 * @param customOptions.lockDuration
 * @param customOptions.autoPoll
 * @param customOptions.asyncResponseTimeout
 * @param customOptions.interceptors
 * @param customOptions.use
 * @param customOptions.maxParallelExecutions
 * @constructor
 */
class Client extends events$1 {
  constructor(customOptions) {
    super();

    /**
     * Bind member methods
     */
    this.sanitizeOptions = this.sanitizeOptions.bind(this);
    this.start = this.start.bind(this);
    this.poll = this.poll.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.executeTask = this.executeTask.bind(this);
    this.stop = this.stop.bind(this);

    /**
     *  Initialize data
     */
    this.activeTasksCount = 0;
    this.sanitizeOptions(customOptions);
    this.topicSubscriptions = {}; // Map which contains all subscribed topics
    this.engineService = new EngineService(this.options);
    this.taskService = new TaskService(this, this.engineService);

    if (this.options.use) {
      this.options.use.forEach(f => f(this));
    }

    if (this.options.autoPoll) {
      this.start();
    }
  }

  /**
   * @throws Error
   * @param customOptions
   */
  sanitizeOptions(customOptions) {
    this.options = { ...defaultOptions, ...customOptions };

    if (
      !customOptions ||
      !customOptions.baseUrl ||
      !customOptions.baseUrl.length
    ) {
      throw new Error(MISSING_BASE_URL);
    }

    const { interceptors, use } = customOptions;

    // sanitize request interceptors
    if (
      interceptors &&
      !isFunction(interceptors) &&
      !isArrayOfFunctions(interceptors)
    ) {
      throw new Error(WRONG_INTERCEPTOR);
    }

    if (isFunction(interceptors)) {
      this.options.interceptors = [interceptors];
    }

    // sanitize middlewares
    if (use && !isFunction(use) && !isArrayOfFunctions(use)) {
      throw new Error(WRONG_MIDDLEWARES);
    }

    if (isFunction(use)) {
      this.options.use = [use];
    }
  }

  /**
   * Starts polling
   */
  start() {
    this._isPollAllowed = true;
    this.poll();
  }

  /**
   * Polls tasks from engine and executes them
   */
  async poll() {
    if (!this._isPollAllowed) {
      return;
    }

    this.emit("poll:start");

    const { topicSubscriptions, engineService, executeTask, poll } = this;
    const {
      maxTasks,
      usePriority,
      interval,
      asyncResponseTimeout,
      maxParallelExecutions
    } = this.options;

    const requiredTasksCount = isUndefinedOrNull(maxParallelExecutions)
      ? maxTasks
      : Math.min(maxTasks, maxParallelExecutions - this.activeTasksCount);
    // If all previously received tasks are running now, reschedule polling
    if (requiredTasksCount <= 0) {
      return setTimeout(poll, interval);
    }

    // setup polling options
    let pollingOptions = {
      maxTasks: requiredTasksCount,
      usePriority: usePriority
    };
    if (asyncResponseTimeout) {
      pollingOptions = { ...pollingOptions, asyncResponseTimeout };
    }

    // if there are no topic subscriptions, reschedule polling
    if (!Object.keys(topicSubscriptions).length) {
      return setTimeout(poll, interval);
    }

    // collect topics that have subscriptions
    const topics = Object.entries(topicSubscriptions).map(
      ([
        topicName,
        {
          businessKey,
          lockDuration,
          variables,
          processDefinitionId,
          processDefinitionIdIn,
          processDefinitionKey,
          processDefinitionKeyIn,
          processDefinitionVersionTag,
          processVariables,
          tenantIdIn,
          withoutTenantId,
          localVariables
        }
      ]) => {
        let topic = { topicName, lockDuration };

        if (!isUndefinedOrNull(variables)) {
          topic.variables = variables;
        }

        if (!isUndefinedOrNull(businessKey)) {
          topic.businessKey = businessKey;
        }

        if (!isUndefinedOrNull(processDefinitionId)) {
          topic.processDefinitionId = processDefinitionId;
        }

        if (!isUndefinedOrNull(processDefinitionIdIn)) {
          topic.processDefinitionIdIn = processDefinitionIdIn;
        }

        if (!isUndefinedOrNull(processDefinitionKey)) {
          topic.processDefinitionKey = processDefinitionKey;
        }

        if (!isUndefinedOrNull(processDefinitionKeyIn)) {
          topic.processDefinitionKeyIn = processDefinitionKeyIn;
        }

        if (!isUndefinedOrNull(processDefinitionVersionTag)) {
          topic.processDefinitionVersionTag = processDefinitionVersionTag;
        }

        if (!isUndefinedOrNull(processVariables)) {
          topic.processVariables = processVariables;
        }

        if (!isUndefinedOrNull(tenantIdIn)) {
          topic.tenantIdIn = tenantIdIn;
        }

        if (!isUndefinedOrNull(withoutTenantId)) {
          topic.withoutTenantId = withoutTenantId;
        }

        if (!isUndefinedOrNull(localVariables)) {
          topic.localVariables = localVariables;
        }

        return topic;
      }
    );

    const requestBody = { ...pollingOptions, topics };

    try {
      const tasks = await engineService.fetchAndLock(requestBody);
      this.emit("poll:success", tasks);
      tasks.forEach(executeTask);
    } catch (e) {
      this.emit("poll:error", e);
    }
    setTimeout(poll, interval);
  }

  /**
   * Subscribes a handler by adding a topic subscription
   * @param topic
   * @param customOptions
   * @param customOptions.lockDuration
   * @param handler
   */
  subscribe(topic, customOptions, handler) {
    const topicSubscriptions = this.topicSubscriptions;
    const options = this.options;
    const lockDuration = options.lockDuration;

    if (topicSubscriptions[topic]) {
      throw new Error(ALREADY_REGISTERED);
    }

    //handles the case if there is no options being
    if (typeof customOptions === "function") {
      handler = customOptions;
      customOptions = null;
    }

    if (!handler) {
      throw new Error(MISSING_HANDLER);
    }
    const unsubscribe = () => {
      delete topicSubscriptions[topic];
      this.emit("unsubscribe");
    };

    const topicSubscription = {
      handler,
      unsubscribe,
      lockDuration,
      ...customOptions
    };
    topicSubscriptions[topic] = topicSubscription;
    this.emit("subscribe", topic, topicSubscription);

    return topicSubscription;
  }

  /**
   * Executes task using the worker registered to its topic
   */
  async executeTask(task) {
    const taskService = this.taskService;
    const topicSubscription = this.topicSubscriptions[task.topicName];
    const variables = new Variables(task.variables, {
      readOnly: true,
      processInstanceId: task.processInstanceId,
      engineService: this.engineService
    });

    this.activeTasksCount++;
    const newTask = { ...task, variables };
    try {
      await topicSubscription.handler({ task: newTask, taskService });
      this.emit("handler:success", task);
    } catch (e) {
      this.emit("handler:error", e);
    } finally {
      this.activeTasksCount--;
    }
  }

  /**
   * Stops polling
   */
  stop() {
    this._isPollAllowed = false;
    this.emit("poll:stop");
  }
}

var Client_1 = Client;

var chalk = {exports: {}};

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

var escapeStringRegexp = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

var ansiStyles = {exports: {}};

var conversions$2 = {exports: {}};

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

/* MIT license */

var cssKeywords = colorName;

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert$1 = conversions$2.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert$1) {
	if (convert$1.hasOwnProperty(model)) {
		if (!('channels' in convert$1[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert$1[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert$1[model].labels.length !== convert$1[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert$1[model].channels;
		var labels = convert$1[model].labels;
		delete convert$1[model].channels;
		delete convert$1[model].labels;
		Object.defineProperty(convert$1[model], 'channels', {value: channels});
		Object.defineProperty(convert$1[model], 'labels', {value: labels});
	}
}

convert$1.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert$1.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert$1.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert$1.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert$1.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert$1.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert$1.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert$1.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert$1.rgb.lab = function (rgb) {
	var xyz = convert$1.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert$1.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert$1.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert$1.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert$1.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert$1.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert$1.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert$1.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert$1.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert$1.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert$1.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert$1.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert$1.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert$1.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert$1.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert$1.rgb.ansi16(convert$1.hsv.rgb(args), args[2]);
};

convert$1.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert$1.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert$1.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert$1.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert$1.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert$1.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert$1.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert$1.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert$1.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert$1.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert$1.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert$1.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert$1.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert$1.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert$1.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert$1.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert$1.gray.hsl = convert$1.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert$1.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert$1.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert$1.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert$1.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert$1.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};

var conversions$1 = conversions$2.exports;

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions$1);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions$1[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions$1[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions$1[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

var route$1 = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};

var conversions = conversions$2.exports;
var route = route$1;

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

var colorConvert = convert;

(function (module) {
const colorConvert$1 = colorConvert;

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert$1, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert$1, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert$1, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert$1)) {
		if (typeof colorConvert$1[key] !== 'object') {
			continue;
		}

		const suite = colorConvert$1[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});
}(ansiStyles));

var hasFlag$1 = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

const os$1 = os__default['default'];
const hasFlag = hasFlag$1;

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os$1.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

var supportsColor_1 = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};

const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape$1(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape$1(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

var templates = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape$1(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};

(function (module) {
const escapeStringRegexp$1 = escapeStringRegexp;
const ansiStyles$1 = ansiStyles.exports;
const stdoutColor = supportsColor_1.stdout;

const template = templates;

const isSimpleWindowsTerm = process.platform === 'win32' && !(process.env.TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles$1.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles$1)) {
	ansiStyles$1[key].closeRe = new RegExp(escapeStringRegexp$1(ansiStyles$1[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles$1[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles$1.color.closeRe = new RegExp(escapeStringRegexp$1(ansiStyles$1.color.close), 'g');
for (const model of Object.keys(ansiStyles$1.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles$1.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles$1.color.close,
					closeRe: ansiStyles$1.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles$1.bgColor.closeRe = new RegExp(escapeStringRegexp$1(ansiStyles$1.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles$1.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles$1.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles$1.bgColor.close,
					closeRe: ansiStyles$1.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles$1.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles$1.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles$1.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports.default = module.exports; // For TypeScript
}(chalk));

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { red, green } = chalk.exports;

/**
 * @returns a formatted success message
 */
const success = message => `${green("✓")} ${green(message)}`;

/**
 * @returns a formatted error message
 */
const error = message => `${red("✖")} ${red(message)}`;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

/**
 * logs various events from client
 * @param client
 */
const logger = (client, clientLogLevel) => {
  const log = (messageLogLevel, message) => {
    if (!message) {
      console.log(messageLogLevel);
      return;
    }

    if (levels[messageLogLevel] <= clientLogLevel) {
      console.log(message);
    }
  };

  switch (typeof clientLogLevel) {
    case "string":
      clientLogLevel = levels[clientLogLevel];
      break;
    case "number":
      break;
    default:
      clientLogLevel = levels["info"];
      break;
  }

  client.on("subscribe", topic => {
    log("info", success(`subscribed to topic ${topic}`));
  });

  client.on("unsubscribe", topic => {
    log("info", success(`unsubscribed from topic ${topic}`));
  });

  client.on("poll:start", () => {
    log("debug", "polling");
  });

  client.on("poll:stop", () => {
    log("debug", error("polling stopped"));
  });

  client.on("poll:success", tasks => {
    const output = success(`polled ${tasks.length} tasks`);
    log("debug", output);
  });

  client.on("poll:error", e => {
    const output = error(`polling failed with ${e}`);
    log("error", output);
  });

  client.on("complete:success", ({ id }) => {
    log("info", success(`completed task ${id}`));
  });

  client.on("complete:error", ({ id }, e) => {
    log("error", error(`couldn't complete task ${id}, ${e}`));
  });

  client.on("handleFailure:success", ({ id }) => {
    log("info", success(`handled failure of task ${id}`));
  });

  client.on("handleFailure:error", ({ id }, e) => {
    log("error", error(`couldn't handle failure of task ${id}, ${e}`));
  });

  client.on("handleBpmnError:success", ({ id }) => {
    log("info", success(`handled BPMN error of task ${id}`));
  });

  client.on("handleBpmnError:error", ({ id }, e) => {
    log("error", error(`couldn't handle BPMN error of task ${id}, ${e}`));
  });

  client.on("extendLock:success", ({ id }) => {
    log("info", success(`handled extend lock of task ${id}`));
  });

  client.on("extendLock:error", ({ id }, e) => {
    log("error", error(`couldn't handle extend lock of task ${id}, ${e}`));
  });

  client.on("unlock:success", ({ id }) => {
    log("info", success(`unlocked task ${id}`));
  });

  client.on("unlock:error", ({ id }, e) => {
    log("error", error(`couldn't unlock task ${id}, ${e}`));
  });

  client.on("lock:success", ({ id }) => {
    log("info", success(`locked task ${id}`));
  });

  client.on("lock:error", ({ id }, e) => {
    log("error", error(`couldn't lock task ${id}, ${e}`));
  });
};

/**
 * Returns Logger with configured log-level
 * @param level
 */
const level = level => {
  return function(client) {
    logger(client, level);
  };
};

// export logger & attach to it success and error methods
var logger_1 = Object.assign(logger, { success, error, level });

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { MISSING_BASIC_AUTH_PARAMS } = errors$1;

class BasicAuthInterceptor {
  /**
   * @throws Error
   */
  constructor(options) {
    if (!options || !options.username || !options.password) {
      throw new Error(MISSING_BASIC_AUTH_PARAMS);
    }

    /**
     * Bind member methods
     */
    this.getHeader = this.getHeader.bind(this);
    this.interceptor = this.interceptor.bind(this);

    this.header = this.getHeader(options);

    return this.interceptor;
  }

  getHeader({ username, password }) {
    const encoded = Buffer.from(`${username}:${password}`).toString("base64");
    return { Authorization: `Basic ${encoded}` };
  }

  interceptor(config) {
    return { ...config, headers: { ...config.headers, ...this.header } };
  }
}

var BasicAuthInterceptor_1 = BasicAuthInterceptor;

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const got = source$2.exports;
const {
  MISSING_KEYCLOAK_AUTH_PARAMS,
  UNEXPECTED_KEYCLOAK_TOKEN_RESULT
} = errors$1;

/**
 * A KeycloakAuthInterceptor instance is an interceptor that adds a Bearer token header, containing
 * a access token, to all requests. This interceptor can be used if the Camunda REST API is protected with
 * Keycloak Gatekeeper.
 */
class KeycloakAuthInterceptor {
  /**
   * The class constructor.
   *
   * @param options The Keycloak auth interceptor options.
   * @returns function(*): {hooks: {beforeRequest: [function(*): Promise<void>]}} The interceptor function.
   * @throws Error if the required options are not set.
   */
  constructor(options) {
    if (
      !options ||
      !options.tokenEndpoint ||
      !options.clientId ||
      !options.clientSecret
    ) {
      throw new Error(MISSING_KEYCLOAK_AUTH_PARAMS);
    }

    /**
     * Bind member methods
     */
    this.getAccessToken = this.getAccessToken.bind(this);
    this.cacheToken = this.cacheToken.bind(this);
    this.interceptor = this.interceptor.bind(this);

    this.cacheOffset =
      options.cacheOffset !== undefined ? options.cacheOffset : 10;
    this.tokenEndpoint = options.tokenEndpoint;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;

    return this.interceptor;
  }

  /**
   * Requests a new access token from the Keycloak endpoint.
   *
   * @param tokenEndpoint The URL to the Keycloak token endpoint.
   * @param clientID      The Keycloak client ID.
   * @param clientSecret  The Keycloak client secret.
   * @returns {Promise<{access_token: String, expires_in: Number}>} The token response, containing the access token and
   * it's expiry in seconds.
   * @throws Error if an error occurred during the request.
   */
  async getAccessToken(tokenEndpoint, clientID, clientSecret) {
    const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString(
      "base64"
    );

    try {
      return await got(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic: ${credentials}`
        },
        body: "grant_type=client_credentials"
      }).json();
    } catch (e) {
      throw new Error(
        `${UNEXPECTED_KEYCLOAK_TOKEN_RESULT} status: ${e.response.statusCode}; body: ${e.response.body}`
      );
    }
  }

  /**
   * The Keycloak access token has an expiry defined. To reduce the requests to the token endpoint, we
   * cache the token response as long it is valid.
   *
   * To poll the API always with a valid token, we subtract the `cacheOffset` from the validity. If the token is 60
   * seconds valid and we poll the API every 5 seconds, there could be the case that we poll the API exactly at the
   * time the token expires. The default `cacheOffset` from 10 seconds is a good balance between the token validity
   * and the average request duration.
   *
   * If the `expires_in` property wasn't set or if the validity is less than or equal the `cacheOffset`, we don't
   * cache the token.
   *
   * @param {{access_token: String, expires_in: Number}} token The token response.
   */
  cacheToken(token) {
    const expiresIn = token.expires_in || 0;

    if (expiresIn > this.cacheOffset) {
      this.tokenCache = token;
      const tokenCleaner = () => {
        this.tokenCache = null;
      };
      setTimeout(
        tokenCleaner.bind(this),
        (expiresIn - this.cacheOffset) * 1000
      );
    }
  }

  /**
   * The interceptor function that enriches the `got` request with the access token hook.
   *
   * @param config The `got` request config.
   * @returns {{hooks: {beforeRequest: [function(*): Promise<void>]}}} The `got` config containing the access
   * token hook.
   */
  interceptor(config) {
    // https://www.npmjs.com/package/got#hooksbeforerequest
    const hooks = {
      beforeRequest: [
        async options => {
          let token = this.tokenCache;
          if (!token) {
            token = await this.getAccessToken(
              this.tokenEndpoint,
              this.clientId,
              this.clientSecret
            );
            this.cacheToken(token);
          }

          if (token && token.access_token) {
            const defaultHeaders = options.headers || {};
            const headers = {
              Authorization: `Bearer ${token.access_token}`
            };

            options.headers = { ...defaultHeaders, ...headers };
          } else {
            throw new Error(
              `${UNEXPECTED_KEYCLOAK_TOKEN_RESULT} token without access_token property: ${JSON.stringify(
                token
              )}`
            );
          }
        }
      ]
    };

    return { ...config, hooks: { ...config.hooks, ...hooks } };
  }
}

var KeycloakAuthInterceptor_1 = KeycloakAuthInterceptor;

/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var camundaExternalTaskClientJs = {
  Client: Client_1,
  logger: logger_1,
  BasicAuthInterceptor: BasicAuthInterceptor_1,
  KeycloakAuthInterceptor: KeycloakAuthInterceptor_1,
  Variables: Variables_1,
  File: File_1
};

var main = {};

/* @flow */

/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = require$$0__default['default'];
const path$1 = path__default['default'];
const os = os__default['default'];

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`);
}

const NEWLINE = '\n';
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const RE_NEWLINES = /\\n/g;
const NEWLINES_MATCH = /\r\n|\n|\r/;

// Parses src into an Object
function parse$2 (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug);
  const obj = {};

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL);
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1];
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '');
      const end = val.length - 1;
      const isDoubleQuoted = val[0] === '"' && val[end] === '"';
      const isSingleQuoted = val[0] === "'" && val[end] === "'";

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end);

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE);
        }
      } else {
        // remove surrounding whitespace
        val = val.trim();
      }

      obj[key] = val;
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
    }
  });

  return obj
}

function resolveHome (envPath) {
  return envPath[0] === '~' ? path$1.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path$1.resolve(process.cwd(), '.env');
  let encoding /*: string */ = 'utf8';
  let debug = false;

  if (options) {
    if (options.path != null) {
      dotenvPath = resolveHome(options.path);
    }
    if (options.encoding != null) {
      encoding = options.encoding;
    }
    if (options.debug != null) {
      debug = true;
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse$2(fs.readFileSync(dotenvPath, { encoding }), { debug });

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key];
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
      }
    });

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

main.config = config;
main.parse = parse$2;

main.config();
const CAMUNDA_API_BASE_URL$1 = process.env.CAMUNDA_API_BASE_URL;
const CAMUNDA_API_AUTHORIZATION$1 = process.env.CAMUNDA_API_AUTHORIZATION;
const ROBOT_EXECUTABLE = process.env.ROBOT_EXECUTABLE || "robot";
const ROBOT_SUITE = process.env.ROBOT_SUITE;
const ROBOT_TASK = process.env.ROBOT_TASK || undefined;
const ROBOT_LOG_LEVEL$2 = process.env.ROBOT_LOG_LEVEL || "info";
const toAbsolute = (p) => require$$0__default['default'].existsSync(p) && !path__default['default'].isAbsolute(p) ? path__default['default'].join(process.cwd(), p) : p;
const execute$1 = async (task) => {
    if (!ROBOT_SUITE) {
        console.log("Environment variable ROBOT_SUITE must be set.");
        process.exit(1);
    }
    if (!require$$0__default['default'].existsSync(ROBOT_SUITE)) {
        console.log(`Suite ${ROBOT_SUITE} does not exist.`);
        process.exit(1);
    }
    await new Promise(async (resolve, reject) => {
        if (ROBOT_LOG_LEVEL$2 === "debug") {
            console.log("Local executor", task.topicName, task.id);
        }
        const tmpdir = await require$$0__default['default'].mkdtempSync(path__default['default'].join(os__default['default'].tmpdir(), "robot-"));
        // Execute robot for task
        const exec = child_process.spawn(ROBOT_EXECUTABLE, [
            "--rpa",
            "--loglevel",
            ROBOT_LOG_LEVEL$2,
            "--nostatusrc",
            "--log",
            "NONE",
            "--report",
            "NONE",
            "--listener",
            "CamundaListener",
            "--variable",
            `CAMUNDA_TASK_ID:${task.id}`,
            "--variable",
            `CAMUNDA_TASK_RETRIES:${Math.max(task.retries ? (task.retries || 1) - 1 : 0, 0)}`,
            "--variable",
            `CAMUNDA_TASK_WORKER_ID:${task.workerId}`,
            "--variable",
            `CAMUNDA_TASK_PROCESS_INSTANCE_ID:${task.processInstanceId}`,
            "--variable",
            `CAMUNDA_TASK_EXECUTION_ID:${task.executionId}`,
        ].concat(ROBOT_TASK === undefined
            ? ["--task", task.topicName, toAbsolute(ROBOT_SUITE)]
            : ROBOT_TASK !== ""
                ? ["--task", ROBOT_TASK, toAbsolute(ROBOT_SUITE)]
                : [toAbsolute(ROBOT_SUITE)]), {
            cwd: tmpdir,
            env: {
                CAMUNDA_API_BASE_URL: CAMUNDA_API_BASE_URL$1,
                CAMUNDA_API_AUTHORIZATION: CAMUNDA_API_AUTHORIZATION$1,
                PATH: process.env.PATH,
            },
        });
        // Collect stdout
        let stdout = "";
        exec.stdout.on("data", (data) => {
            stdout += data;
        });
        // Collect stderr
        let stderr = "";
        exec.stderr.on("data", (data) => {
            stderr += data;
        });
        // handle exit
        exec.on("close", async (code) => {
            // Remove temporary task work directory
            require$$0__default['default'].rmdirSync(tmpdir, { recursive: true });
            // fail task if execution fail unexpectedly
            if (code !== 0) {
                reject(stdout || stderr);
            }
            else {
                resolve();
            }
            if (ROBOT_LOG_LEVEL$2 === "debug") {
                console.log(stdout + stderr);
            }
        });
    });
};

var RestClient$1 = {};

var HttpClient = {};

var Util = {};

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = shams;

var hasSymbols$1 = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr$1 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$1 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$1.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var implementation = implementation$1;

var functionBind = Function.prototype.bind || implementation;

var bind$1 = functionBind;

var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$1 = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError$1();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = hasSymbols$1();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined$1,
	'%Symbol%': hasSymbols ? Symbol : undefined$1,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError$1,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = functionBind;
var hasOwn$1 = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn$1(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError$1('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError$1('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined$1;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn$1(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

var callBind$1 = {exports: {}};

(function (module) {

var bind = functionBind;
var GetIntrinsic = getIntrinsic;

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}
}(callBind$1));

var GetIntrinsic$1 = getIntrinsic;

var callBind = callBind$1.exports;

var $indexOf = callBind(GetIntrinsic$1('String.prototype.indexOf'));

var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic$1(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

var util_inspect = require$$1__default['default'].inspect;

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

var inspectCustom = util_inspect.custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
var toStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag !== 'undefined' ? Symbol.toStringTag : null;

var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has$3(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has$3(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has$3(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean') {
        throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
    }

    if (
        has$3(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') {
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray$3(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has$3(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray$3(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp$1(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + [].concat(stringTag || [], protoTag || []).join(': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + ys.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray$3(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp$1(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has$3(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray$3(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has$3(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has$3(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}

var GetIntrinsic = getIntrinsic;
var callBound = callBound$1;
var inspect = objectInspect;

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

var sideChannel = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

var formats$3 = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};

var formats$2 = formats$3;

var has$2 = Object.prototype.hasOwnProperty;
var isArray$2 = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray$2(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray$2(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has$2.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray$2(target) && !isArray$2(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray$2(target) && isArray$2(source)) {
        source.forEach(function (item, i) {
            if (has$2.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has$2.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats$2.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray$2(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

var utils$2 = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};

var getSideChannel = sideChannel;
var utils$1 = utils$2;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray$1 = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats$1['default'];
var defaults$1 = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils$1.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats$1.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify$1 = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    if (sideChannel.has(object)) {
        throw new RangeError('Cyclic object value');
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        obj = utils$1.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, 'key', format);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
    } else if (isArray$1(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray$1(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        sideChannel.set(object, true);
        var valueSideChannel = getSideChannel();
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults$1;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults$1.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats$1['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has$1.call(formats$1.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats$1.formatters[format];

    var filter = defaults$1.filter;
    if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults$1.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$1.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$1.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$1.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$1.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
    };
};

var stringify_1 = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray$1(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel = getSideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify$1(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};

var utils = utils$2;

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

var parse$1 = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};

var stringify = stringify_1;
var parse = parse$1;
var formats = formats$3;

var lib = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(Util, "__esModule", { value: true });
const qs = lib;
const url = require$$0__default$4['default'];
const path = path__default['default'];
const zlib = require$$0__default$6['default'];
/**
 * creates an url from a request url and optional base url (http://server:8080)
 * @param {string} resource - a fully qualified url or relative path
 * @param {string} baseUrl - an optional baseUrl (http://server:8080)
 * @param {IRequestOptions} options - an optional options object, could include QueryParameters e.g.
 * @return {string} - resultant url
 */
function getUrl(resource, baseUrl, queryParams) {
    const pathApi = path.posix || path;
    let requestUrl = '';
    if (!baseUrl) {
        requestUrl = resource;
    }
    else if (!resource) {
        requestUrl = baseUrl;
    }
    else {
        const base = url.parse(baseUrl);
        const resultantUrl = url.parse(resource);
        // resource (specific per request) elements take priority
        resultantUrl.protocol = resultantUrl.protocol || base.protocol;
        resultantUrl.auth = resultantUrl.auth || base.auth;
        resultantUrl.host = resultantUrl.host || base.host;
        resultantUrl.pathname = pathApi.resolve(base.pathname, resultantUrl.pathname);
        if (!resultantUrl.pathname.endsWith('/') && resource.endsWith('/')) {
            resultantUrl.pathname += '/';
        }
        requestUrl = url.format(resultantUrl);
    }
    return queryParams ?
        getUrlWithParsedQueryParams(requestUrl, queryParams) :
        requestUrl;
}
Util.getUrl = getUrl;
/**
 *
 * @param {string} requestUrl
 * @param {IRequestQueryParams} queryParams
 * @return {string} - Request's URL with Query Parameters appended/parsed.
 */
function getUrlWithParsedQueryParams(requestUrl, queryParams) {
    const url = requestUrl.replace(/\?$/g, ''); // Clean any extra end-of-string "?" character
    const parsedQueryParams = qs.stringify(queryParams.params, buildParamsStringifyOptions(queryParams));
    return `${url}${parsedQueryParams}`;
}
/**
 * Build options for QueryParams Stringifying.
 *
 * @param {IRequestQueryParams} queryParams
 * @return {object}
 */
function buildParamsStringifyOptions(queryParams) {
    let options = {
        addQueryPrefix: true,
        delimiter: (queryParams.options || {}).separator || '&',
        allowDots: (queryParams.options || {}).shouldAllowDots || false,
        arrayFormat: (queryParams.options || {}).arrayFormat || 'repeat',
        encodeValuesOnly: (queryParams.options || {}).shouldOnlyEncodeValues || true
    };
    return options;
}
/**
 * Decompress/Decode gzip encoded JSON
 * Using Node.js built-in zlib module
 *
 * @param {Buffer} buffer
 * @param {string} charset? - optional; defaults to 'utf-8'
 * @return {Promise<string>}
 */
function decompressGzippedContent(buffer, charset) {
    return __awaiter$1(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter$1(this, void 0, void 0, function* () {
            zlib.gunzip(buffer, function (error, buffer) {
                if (error) {
                    reject(error);
                }
                resolve(buffer.toString(charset || 'utf-8'));
            });
        }));
    });
}
Util.decompressGzippedContent = decompressGzippedContent;
/**
 * Builds a RegExp to test urls against for deciding
 * wether to bypass proxy from an entry of the
 * environment variable setting NO_PROXY
 *
 * @param {string} bypass
 * @return {RegExp}
 */
function buildProxyBypassRegexFromEnv(bypass) {
    try {
        // We need to keep this around for back-compat purposes
        return new RegExp(bypass, 'i');
    }
    catch (err) {
        if (err instanceof SyntaxError && (bypass || "").startsWith("*")) {
            let wildcardEscaped = bypass.replace('*', '(.*)');
            return new RegExp(wildcardEscaped, 'i');
        }
        throw err;
    }
}
Util.buildProxyBypassRegexFromEnv = buildProxyBypassRegexFromEnv;
/**
 * Obtain Response's Content Charset.
 * Through inspecting `content-type` response header.
 * It Returns 'utf-8' if NO charset specified/matched.
 *
 * @param {IHttpClientResponse} response
 * @return {string} - Content Encoding Charset; Default=utf-8
 */
function obtainContentCharset(response) {
    // Find the charset, if specified.
    // Search for the `charset=CHARSET` string, not including `;,\r\n`
    // Example: content-type: 'application/json;charset=utf-8'
    // |__ matches would be ['charset=utf-8', 'utf-8', index: 18, input: 'application/json; charset=utf-8']
    // |_____ matches[1] would have the charset :tada: , in our example it's utf-8
    // However, if the matches Array was empty or no charset found, 'utf-8' would be returned by default.
    const nodeSupportedEncodings = ['ascii', 'utf8', 'utf16le', 'ucs2', 'base64', 'binary', 'hex'];
    const contentType = response.message.headers['content-type'] || '';
    const matches = contentType.match(/charset=([^;,\r\n]+)/i);
    return (matches && matches[1] && nodeSupportedEncodings.indexOf(matches[1]) != -1) ? matches[1] : 'utf-8';
}
Util.obtainContentCharset = obtainContentCharset;

var tunnel$1 = {};

var tls = require$$1__default$1['default'];
var http = require$$3__default['default'];
var https = require$$4__default['default'];
var events = require$$0__default$3['default'];
var util$1 = require$$1__default['default'];


tunnel$1.httpOverHttp = httpOverHttp;
tunnel$1.httpsOverHttp = httpsOverHttp;
tunnel$1.httpOverHttps = httpOverHttps;
tunnel$1.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util$1.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket);
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  };
} else {
  debug = function() {};
}
tunnel$1.debug = debug; // for test

var tunnel = tunnel$1;

(function (exports) {
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = require$$0__default$4['default'];
const http = require$$3__default['default'];
const https = require$$4__default['default'];
const util = Util;
let fs;
let tunnel$1;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
const NetworkRetryErrors = ['ECONNRESET', 'ENOTFOUND', 'ESOCKETTIMEDOUT', 'ETIMEDOUT', 'ECONNREFUSED'];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let buffer = Buffer.alloc(0);
            const encodingCharset = util.obtainContentCharset(this);
            // Extract Encoding from header: 'content-encoding'
            // Match `gzip`, `gzip, deflate` variations of GZIP encoding
            const contentEncoding = this.message.headers['content-encoding'] || '';
            const isGzippedEncoded = new RegExp('(gzip$)|(gzip, *deflate)').test(contentEncoding);
            this.message.on('data', function (data) {
                const chunk = (typeof data === 'string') ? Buffer.from(data, encodingCharset) : data;
                buffer = Buffer.concat([buffer, chunk]);
            }).on('end', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (isGzippedEncoded) { // Process GZipped Response Body HERE
                        const gunzippedBody = yield util.decompressGzippedContent(buffer, encodingCharset);
                        resolve(gunzippedBody);
                    }
                    else {
                        resolve(buffer.toString(encodingCharset));
                    }
                });
            }).on('error', function (err) {
                reject(err);
            });
        }));
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = url.parse(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
var EnvironmentVariables;
(function (EnvironmentVariables) {
    EnvironmentVariables["HTTP_PROXY"] = "HTTP_PROXY";
    EnvironmentVariables["HTTPS_PROXY"] = "HTTPS_PROXY";
    EnvironmentVariables["NO_PROXY"] = "NO_PROXY";
})(EnvironmentVariables || (EnvironmentVariables = {}));
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        let no_proxy = process.env[EnvironmentVariables.NO_PROXY];
        if (no_proxy) {
            this._httpProxyBypassHosts = [];
            no_proxy.split(',').forEach(bypass => {
                this._httpProxyBypassHosts.push(util.buildProxyBypassRegexFromEnv(bypass));
            });
        }
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            this._httpProxy = requestOptions.proxy;
            if (requestOptions.proxy && requestOptions.proxy.proxyBypassHosts) {
                this._httpProxyBypassHosts = [];
                requestOptions.proxy.proxyBypassHosts.forEach(bypass => {
                    this._httpProxyBypassHosts.push(new RegExp(bypass, 'i'));
                });
            }
            this._certConfig = requestOptions.cert;
            if (this._certConfig) {
                // If using cert, need fs
                fs = require$$0__default['default'];
                // cache the cert content into memory, so we don't have to read it from disk every time
                if (this._certConfig.caFile && fs.existsSync(this._certConfig.caFile)) {
                    this._ca = fs.readFileSync(this._certConfig.caFile, 'utf8');
                }
                if (this._certConfig.certFile && fs.existsSync(this._certConfig.certFile)) {
                    this._cert = fs.readFileSync(this._certConfig.certFile, 'utf8');
                }
                if (this._certConfig.keyFile && fs.existsSync(this._certConfig.keyFile)) {
                    this._key = fs.readFileSync(this._certConfig.keyFile, 'utf8');
                }
            }
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error("Client has already been disposed.");
            }
            let parsedUrl = url.parse(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            let maxTries = (this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1) ? this._maxRetries + 1 : 1;
            let numTries = 0;
            let response;
            while (numTries < maxTries) {
                try {
                    response = yield this.requestRaw(info, data);
                }
                catch (err) {
                    numTries++;
                    if (err && err.code && NetworkRetryErrors.indexOf(err.code) > -1 && numTries < maxTries) {
                        yield this._performExponentialBackoff(numTries);
                        continue;
                    }
                    throw err;
                }
                // Check if it's an authentication challenge
                if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (let i = 0; i < this.handlers.length; i++) {
                        if (this.handlers[i].canHandleAuthentication(response)) {
                            authenticationHandler = this.handlers[i];
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1
                    && this._allowRedirects
                    && redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers["location"];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    let parsedRedirectUrl = url.parse(redirectUrl);
                    if (parsedUrl.protocol == 'https:' && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                        throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            }
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof (data) === 'string') {
            info.options.headers["Content-Length"] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', (sock) => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.destroy();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof (data) === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof (data) !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.timeout = (this.requestOptions && this.requestOptions.socketTimeout) || this._socketTimeout;
        this._socketTimeout = info.options.timeout;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers && !this._isPresigned(url.format(requestUrl))) {
            this.handlers.forEach((handler) => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _isPresigned(requestUrl) {
        if (this.requestOptions && this.requestOptions.presignedUrlPatterns) {
            const patterns = this.requestOptions.presignedUrlPatterns;
            for (let i = 0; i < patterns.length; i++) {
                if (requestUrl.match(patterns[i])) {
                    return true;
                }
            }
        }
        return false;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxy = this._getProxy(parsedUrl);
        let useProxy = proxy.proxyUrl && proxy.proxyUrl.hostname && !this._isMatchInBypassProxyList(parsedUrl);
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel$1) {
                tunnel$1 = tunnel;
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    proxyAuth: proxy.proxyAuth,
                    host: proxy.proxyUrl.hostname,
                    port: proxy.proxyUrl.port
                },
            };
            let tunnelAgent;
            const overHttps = proxy.proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel$1.httpsOverHttps : tunnel$1.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel$1.httpOverHttps : tunnel$1.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, { rejectUnauthorized: false });
        }
        if (usingSsl && this._certConfig) {
            agent.options = Object.assign(agent.options || {}, { ca: this._ca, cert: this._cert, key: this._key, passphrase: this._certConfig.passphrase });
        }
        return agent;
    }
    _getProxy(parsedUrl) {
        let usingSsl = parsedUrl.protocol === 'https:';
        let proxyConfig = this._httpProxy;
        // fallback to http_proxy and https_proxy env
        let https_proxy = process.env[EnvironmentVariables.HTTPS_PROXY];
        let http_proxy = process.env[EnvironmentVariables.HTTP_PROXY];
        if (!proxyConfig) {
            if (https_proxy && usingSsl) {
                proxyConfig = {
                    proxyUrl: https_proxy
                };
            }
            else if (http_proxy) {
                proxyConfig = {
                    proxyUrl: http_proxy
                };
            }
        }
        let proxyUrl;
        let proxyAuth;
        if (proxyConfig) {
            if (proxyConfig.proxyUrl.length > 0) {
                proxyUrl = url.parse(proxyConfig.proxyUrl);
            }
            if (proxyConfig.proxyUsername || proxyConfig.proxyPassword) {
                proxyAuth = proxyConfig.proxyUsername + ":" + proxyConfig.proxyPassword;
            }
        }
        return { proxyUrl: proxyUrl, proxyAuth: proxyAuth };
    }
    _isMatchInBypassProxyList(parsedUrl) {
        if (!this._httpProxyBypassHosts) {
            return false;
        }
        let bypass = false;
        this._httpProxyBypassHosts.forEach(bypassHost => {
            if (bypassHost.test(parsedUrl.href)) {
                bypass = true;
            }
        });
        return bypass;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
}
exports.HttpClient = HttpClient;
}(HttpClient));

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(RestClient$1, "__esModule", { value: true });
const httpm = HttpClient;
const util = Util;
class RestClient {
    /**
     * Creates an instance of the RestClient
     * @constructor
     * @param {string} userAgent - userAgent for requests
     * @param {string} baseUrl - (Optional) If not specified, use full urls per request.  If supplied and a function passes a relative url, it will be appended to this
     * @param {ifm.IRequestHandler[]} handlers - handlers are typically auth handlers (basic, bearer, ntlm supplied)
     * @param {ifm.IRequestOptions} requestOptions - options for each http requests (http proxy setting, socket timeout)
     */
    constructor(userAgent, baseUrl, handlers, requestOptions) {
        this.client = new httpm.HttpClient(userAgent, handlers, requestOptions);
        if (baseUrl) {
            this._baseUrl = baseUrl;
        }
    }
    /**
     * Gets a resource from an endpoint
     * Be aware that not found returns a null.  Other error conditions reject the promise
     * @param {string} requestUrl - fully qualified or relative url
     * @param {IRequestOptions} requestOptions - (optional) requestOptions object
     */
    options(requestUrl, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = util.getUrl(requestUrl, this._baseUrl);
            let res = yield this.client.options(url, this._headersFromOptions(options));
            return this.processResponse(res, options);
        });
    }
    /**
     * Gets a resource from an endpoint
     * Be aware that not found returns a null.  Other error conditions reject the promise
     * @param {string} resource - fully qualified url or relative path
     * @param {IRequestOptions} requestOptions - (optional) requestOptions object
     */
    get(resource, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = util.getUrl(resource, this._baseUrl, (options || {}).queryParameters);
            let res = yield this.client.get(url, this._headersFromOptions(options));
            return this.processResponse(res, options);
        });
    }
    /**
     * Deletes a resource from an endpoint
     * Be aware that not found returns a null.  Other error conditions reject the promise
     * @param {string} resource - fully qualified or relative url
     * @param {IRequestOptions} requestOptions - (optional) requestOptions object
     */
    del(resource, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = util.getUrl(resource, this._baseUrl, (options || {}).queryParameters);
            let res = yield this.client.del(url, this._headersFromOptions(options));
            return this.processResponse(res, options);
        });
    }
    /**
     * Creates resource(s) from an endpoint
     * T type of object returned.
     * Be aware that not found returns a null.  Other error conditions reject the promise
     * @param {string} resource - fully qualified or relative url
     * @param {IRequestOptions} requestOptions - (optional) requestOptions object
     */
    create(resource, resources, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = util.getUrl(resource, this._baseUrl);
            let headers = this._headersFromOptions(options, true);
            let data = JSON.stringify(resources, null, 2);
            let res = yield this.client.post(url, data, headers);
            return this.processResponse(res, options);
        });
    }
    /**
     * Updates resource(s) from an endpoint
     * T type of object returned.
     * Be aware that not found returns a null.  Other error conditions reject the promise
     * @param {string} resource - fully qualified or relative url
     * @param {IRequestOptions} requestOptions - (optional) requestOptions object
     */
    update(resource, resources, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = util.getUrl(resource, this._baseUrl);
            let headers = this._headersFromOptions(options, true);
            let data = JSON.stringify(resources, null, 2);
            let res = yield this.client.patch(url, data, headers);
            return this.processResponse(res, options);
        });
    }
    /**
     * Replaces resource(s) from an endpoint
     * T type of object returned.
     * Be aware that not found returns a null.  Other error conditions reject the promise
     * @param {string} resource - fully qualified or relative url
     * @param {IRequestOptions} requestOptions - (optional) requestOptions object
     */
    replace(resource, resources, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = util.getUrl(resource, this._baseUrl);
            let headers = this._headersFromOptions(options, true);
            let data = JSON.stringify(resources, null, 2);
            let res = yield this.client.put(url, data, headers);
            return this.processResponse(res, options);
        });
    }
    uploadStream(verb, requestUrl, stream, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = util.getUrl(requestUrl, this._baseUrl);
            let headers = this._headersFromOptions(options, true);
            let res = yield this.client.sendStream(verb, url, stream, headers);
            return this.processResponse(res, options);
        });
    }
    _headersFromOptions(options, contentType) {
        options = options || {};
        let headers = options.additionalHeaders || {};
        headers["Accept"] = options.acceptHeader || "application/json";
        if (contentType) {
            let found = false;
            for (let header in headers) {
                if (header.toLowerCase() == "content-type") {
                    found = true;
                }
            }
            if (!found) {
                headers["Content-Type"] = 'application/json; charset=utf-8';
            }
        }
        return headers;
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode;
                const response = {
                    statusCode: statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode == httpm.HttpCodes.NotFound) {
                    resolve(response);
                }
                let obj;
                let contents;
                // get the result from the body
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, RestClient.dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        if (options && options.responseProcessor) {
                            response.result = options.responseProcessor(obj);
                        }
                        else {
                            response.result = obj;
                        }
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = "Failed request: (" + statusCode + ")";
                    }
                    let err = new Error(msg);
                    // attach statusCode and body obj (if available) to the error object
                    err['statusCode'] = statusCode;
                    if (response.result) {
                        err['result'] = response.result;
                    }
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
var RestClient_2 = RestClient$1.RestClient = RestClient;

main.config();
const ROBOT_LOG_LEVEL$1 = process.env.ROBOT_LOG_LEVEL || "info";
const ROBOCLOUD_WORKSPACE_ID = process.env.ROBOCLOUD_WORKSPACE_ID;
const ROBOCLOUD_PROCESS_ID = process.env.ROBOCLOUD_PROCESS_ID;
const ROBOCLOUD_API_KEY = process.env.ROBOCLOUD_API_KEY;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const execute = async (task) => {
    if (ROBOT_LOG_LEVEL$1 === "debug") {
        console.log("Robocloud", "received", task.topicName, task.id);
    }
    if (!ROBOCLOUD_WORKSPACE_ID) {
        console.log("Environment variable ROBOCLOUD_WORKSPACE_ID must be set.");
        process.exit(1);
    }
    if (!ROBOCLOUD_PROCESS_ID) {
        console.log("Environment variable ROBOCLOUD_PROCESS_ID must be set.");
        process.exit(1);
    }
    if (!ROBOCLOUD_API_KEY) {
        console.log("Environment variable ROBOCLOUD_API_KEY must be set.");
        process.exit(1);
    }
    const workItem = {
        variables: {
            CAMUNDA_TASK_ID: task.id,
            CAMUNDA_TASK_RETRIES: Math.max(task.retries ? (task.retries || 1) - 1 : 0, 0),
            CAMUNDA_TASK_WORKER_ID: task.workerId,
            CAMUNDA_TASK_PROCESS_INSTANCE_ID: task.processInstanceId,
            CAMUNDA_TASK_EXECUTION_ID: task.executionId,
        },
    };
    const options = {
        additionalHeaders: {
            Authorization: `RC-WSKEY ${ROBOCLOUD_API_KEY}`,
        },
    };
    const client = new RestClient_2("carrot-executor", "https://api.eu1.robocorp.com/process-v1/", []);
    const run = await client.create(`workspaces/${ROBOCLOUD_WORKSPACE_ID}/processes/${ROBOCLOUD_PROCESS_ID}/runs`, workItem, options);
    const id = run.result.id;
    if (ROBOT_LOG_LEVEL$1 === "debug") {
        console.log("Robocloud", "scheduled", task.topicName, task.id, id);
    }
    let state = null;
    while (state !== "COMPL") {
        await sleep(5000);
        try {
            const status = await client.get(`workspaces/${ROBOCLOUD_WORKSPACE_ID}/processes/${ROBOCLOUD_PROCESS_ID}/runs/${id}`, options);
            state = status.result.state;
            if (ROBOT_LOG_LEVEL$1 === "debug") {
                console.log("Robocloud", "state", task.topicName, task.id, id, state);
            }
        }
        catch (e) {
            console.error(e.toString(), e.stack, JSON.stringify(e));
        }
    }
};

main.config();
const CAMUNDA_API_BASE_URL = process.env.CAMUNDA_API_BASE_URL || "http://localhost:8080/engine-rest";
const CAMUNDA_API_AUTHORIZATION = process.env.CAMUNDA_API_AUTHORIZATION;
const CAMUNDA_TOPIC = (process.env.CAMUNDA_TOPIC || "")
    .split(",")
    .map((topic) => topic.trim())
    .filter((topic) => topic);
const CLIENT_LOG_LEVEL = process.env.CLIENT_LOG_LEVEL || "debug";
const CLIENT_MAX_TASKS = Math.max(parseInt(process.env.CLIENT_MAX_TASKS || `${os__default['default'].cpus().length}`, 10) ||
    os__default['default'].cpus().length, 0);
const CLIENT_POLL_INTERVAL = parseInt(process.env.CLIENT_POLL_INTERVAL || "10000", 10) || 10000;
const CLIENT_WORKER_ID = process.env.CLIENT_WORKER_ID || "carrot-executor";
const ROBOT_EXECUTOR = process.env.ROBOT_EXECUTOR || "local";
const ROBOT_LOG_LEVEL = process.env.ROBOT_LOG_LEVEL || "info";
if (!CAMUNDA_API_BASE_URL) {
    console.log("Environment variable CAMUNDA_API_BASE_URL must be set.", "error");
    process.exit(1);
}
if (!CAMUNDA_TOPIC.length) {
    console.log("Environment variable CAMUNDA_TOPIC must be set.");
    process.exit(1);
}
const AuthorizationHeaderInterceptor = (config) => {
    return CAMUNDA_API_AUTHORIZATION
        ? {
            ...config,
            headers: {
                ...config.headers,
                Authorization: CAMUNDA_API_AUTHORIZATION,
            },
        }
        : config;
};
const client = new camundaExternalTaskClientJs.Client({
    baseUrl: CAMUNDA_API_BASE_URL,
    workerId: CLIENT_WORKER_ID,
    maxTasks: CLIENT_MAX_TASKS,
    maxParallelExecutions: CLIENT_MAX_TASKS,
    interval: CLIENT_POLL_INTERVAL,
    lockDuration: CLIENT_POLL_INTERVAL,
    autoPoll: true,
    interceptors: [AuthorizationHeaderInterceptor],
    asyncResponseTimeout: CLIENT_POLL_INTERVAL,
    use: camundaExternalTaskClientJs.logger.level(CLIENT_LOG_LEVEL),
});
const errors = new Map();
client.on("extendLock:error", ({ id }, e) => {
    if (id) {
        errors.set(id, `${e}`);
    }
});
for (const topic of CAMUNDA_TOPIC) {
    client.subscribe(topic, async ({ task, taskService }) => {
        if (ROBOT_LOG_LEVEL === "debug") {
            console.log("Received task", task.topicName, task.id);
        }
        // Resolve lock expiration
        const lockExpiration = new Date(task.lockExpirationTime).getTime() -
            new Date().getTime();
        // Extend lock expiration
        const extendLock = async () => {
            await taskService.extendLock(task, lockExpiration);
            // On error, stop extending lock expiration
            if (task.id && !errors.has(task.id)) {
                extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);
            }
            else if (task.id) {
                errors.delete(task.id);
            }
        };
        // Schedule initial lock expiration
        let extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);
        // Delegate to executor
        try {
            await (ROBOT_EXECUTOR === "robocloud" ? execute(task) : execute$1(task));
        }
        catch (e) {
            const error = {
                errorMessage: `${e}`,
                errorDetails: [`${e}`, e.stack, JSON.stringify(e)].join("\n"),
            };
            // Handle executor failing to start robot
            if (ROBOT_LOG_LEVEL === "debug") {
                console.log("Fail task for", task.topicName, task.id);
                console.log(error);
            }
            await taskService.handleFailure(task, error);
            if (ROBOT_LOG_LEVEL === "debug") {
                console.log("Failed task", task.topicName, task.id);
            }
        }
        finally {
            // Stop extending expiration timeout
            clearTimeout(extendLockTimeout);
            if (task.id && errors.has(task.id)) {
                errors.delete(task.id);
            }
            if (ROBOT_LOG_LEVEL === "debug") {
                console.log("Completed task", task.topicName, task.id);
            }
        }
    });
}
