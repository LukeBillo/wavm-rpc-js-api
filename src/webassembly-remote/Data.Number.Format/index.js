// Generated by purs version 0.12.3
"use strict";
var $foreign = require("./foreign.js");
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Prelude = require("../Prelude/index.js");
var Precision = (function () {
    function Precision(value0) {
        this.value0 = value0;
    };
    Precision.create = function (value0) {
        return new Precision(value0);
    };
    return Precision;
})();
var Fixed = (function () {
    function Fixed(value0) {
        this.value0 = value0;
    };
    Fixed.create = function (value0) {
        return new Fixed(value0);
    };
    return Fixed;
})();
var Exponential = (function () {
    function Exponential(value0) {
        this.value0 = value0;
    };
    Exponential.create = function (value0) {
        return new Exponential(value0);
    };
    return Exponential;
})();
var toStringWith = function (v) {
    if (v instanceof Precision) {
        return $foreign.toPrecisionNative(v.value0);
    };
    if (v instanceof Fixed) {
        return $foreign.toFixedNative(v.value0);
    };
    if (v instanceof Exponential) {
        return $foreign.toExponentialNative(v.value0);
    };
    throw new Error("Failed pattern match at Data.Number.Format (line 59, column 1 - line 59, column 40): " + [ v.constructor.name ]);
};
var precision = function ($5) {
    return Precision.create(Data_Ord.clamp(Data_Ord.ordInt)(1)(21)($5));
};
var fixed = function ($6) {
    return Fixed.create(Data_Ord.clamp(Data_Ord.ordInt)(0)(20)($6));
};
var exponential = function ($7) {
    return Exponential.create(Data_Ord.clamp(Data_Ord.ordInt)(0)(20)($7));
};
module.exports = {
    precision: precision,
    fixed: fixed,
    exponential: exponential,
    toStringWith: toStringWith,
    toString: $foreign.toString
};
