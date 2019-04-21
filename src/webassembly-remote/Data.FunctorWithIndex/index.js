// Generated by purs version 0.12.3
"use strict";
var $foreign = require("./foreign.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Maybe_First = require("../Data.Maybe.First/index.js");
var Data_Maybe_Last = require("../Data.Maybe.Last/index.js");
var Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
var Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");
var Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");
var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Prelude = require("../Prelude/index.js");
var FunctorWithIndex = function (Functor0, mapWithIndex) {
    this.Functor0 = Functor0;
    this.mapWithIndex = mapWithIndex;
};
var mapWithIndex = function (dict) {
    return dict.mapWithIndex;
};
var mapDefault = function (dictFunctorWithIndex) {
    return function (f) {
        return mapWithIndex(dictFunctorWithIndex)(Data_Function["const"](f));
    };
};
var functorWithIndexMultiplicative = new FunctorWithIndex(function () {
    return Data_Monoid_Multiplicative.functorMultiplicative;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Multiplicative.functorMultiplicative)(f(Data_Unit.unit));
});
var functorWithIndexMaybe = new FunctorWithIndex(function () {
    return Data_Maybe.functorMaybe;
}, function (f) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(f(Data_Unit.unit));
});
var functorWithIndexLast = new FunctorWithIndex(function () {
    return Data_Maybe_Last.functorLast;
}, function (f) {
    return Data_Functor.map(Data_Maybe_Last.functorLast)(f(Data_Unit.unit));
});
var functorWithIndexFirst = new FunctorWithIndex(function () {
    return Data_Maybe_First.functorFirst;
}, function (f) {
    return Data_Functor.map(Data_Maybe_First.functorFirst)(f(Data_Unit.unit));
});
var functorWithIndexDual = new FunctorWithIndex(function () {
    return Data_Monoid_Dual.functorDual;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Dual.functorDual)(f(Data_Unit.unit));
});
var functorWithIndexDisj = new FunctorWithIndex(function () {
    return Data_Monoid_Disj.functorDisj;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Disj.functorDisj)(f(Data_Unit.unit));
});
var functorWithIndexConj = new FunctorWithIndex(function () {
    return Data_Monoid_Conj.functorConj;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Conj.functorConj)(f(Data_Unit.unit));
});
var functorWithIndexArray = new FunctorWithIndex(function () {
    return Data_Functor.functorArray;
}, $foreign.mapWithIndexArray);
var functorWithIndexAdditive = new FunctorWithIndex(function () {
    return Data_Monoid_Additive.functorAdditive;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Additive.functorAdditive)(f(Data_Unit.unit));
});
module.exports = {
    FunctorWithIndex: FunctorWithIndex,
    mapWithIndex: mapWithIndex,
    mapDefault: mapDefault,
    functorWithIndexArray: functorWithIndexArray,
    functorWithIndexMaybe: functorWithIndexMaybe,
    functorWithIndexFirst: functorWithIndexFirst,
    functorWithIndexLast: functorWithIndexLast,
    functorWithIndexAdditive: functorWithIndexAdditive,
    functorWithIndexDual: functorWithIndexDual,
    functorWithIndexConj: functorWithIndexConj,
    functorWithIndexDisj: functorWithIndexDisj,
    functorWithIndexMultiplicative: functorWithIndexMultiplicative
};
