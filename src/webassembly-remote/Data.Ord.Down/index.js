// Generated by purs version 0.12.3
"use strict";
var Data_Bounded = require("../Data.Bounded/index.js");
var Data_Eq = require("../Data.Eq/index.js");
var Data_Newtype = require("../Data.Newtype/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Ordering = require("../Data.Ordering/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Show = require("../Data.Show/index.js");
var Prelude = require("../Prelude/index.js");
var Down = function (x) {
    return x;
};
var showDown = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Down " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var newtypeDown = new Data_Newtype.Newtype(function (n) {
    return n;
}, Down);
var eqDown = function (dictEq) {
    return dictEq;
};
var ordDown = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqDown(dictOrd.Eq0());
    }, function (v) {
        return function (v1) {
            return Data_Ordering.invert(Data_Ord.compare(dictOrd)(v)(v1));
        };
    });
};
var boundedDown = function (dictBounded) {
    return new Data_Bounded.Bounded(function () {
        return ordDown(dictBounded.Ord0());
    }, Data_Bounded.top(dictBounded), Data_Bounded.bottom(dictBounded));
};
module.exports = {
    Down: Down,
    newtypeDown: newtypeDown,
    eqDown: eqDown,
    ordDown: ordDown,
    boundedDown: boundedDown,
    showDown: showDown
};
