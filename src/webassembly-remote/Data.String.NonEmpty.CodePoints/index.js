// Generated by purs version 0.12.3
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_Array_NonEmpty = require("../Data.Array.NonEmpty/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
var Data_String_CodePoints = require("../Data.String.CodePoints/index.js");
var Data_String_NonEmpty_Internal = require("../Data.String.NonEmpty.Internal/index.js");
var Data_String_Pattern = require("../Data.String.Pattern/index.js");
var Partial_Unsafe = require("../Partial.Unsafe/index.js");
var Prelude = require("../Prelude/index.js");
var Unsafe_Coerce = require("../Unsafe.Coerce/index.js");
var toNonEmptyString = Unsafe_Coerce.unsafeCoerce;
var snoc = function (c) {
    return function (s) {
        return toNonEmptyString(s + Data_String_CodePoints.singleton(c));
    };
};
var singleton = function ($12) {
    return toNonEmptyString(Data_String_CodePoints.singleton($12));
};
var liftS = Unsafe_Coerce.unsafeCoerce;
var takeWhile = function (f) {
    return function ($13) {
        return Data_String_NonEmpty_Internal.fromString(liftS(Data_String_CodePoints.takeWhile(f))($13));
    };
};
var lastIndexOf$prime = function (pat) {
    return function ($14) {
        return liftS(Data_String_CodePoints["lastIndexOf'"](pat)($14));
    };
};
var lastIndexOf = function ($15) {
    return liftS(Data_String_CodePoints.lastIndexOf($15));
};
var indexOf$prime = function (pat) {
    return function ($16) {
        return liftS(Data_String_CodePoints["indexOf'"](pat)($16));
    };
};
var indexOf = function ($17) {
    return liftS(Data_String_CodePoints.indexOf($17));
};
var fromNonEmptyString = Unsafe_Coerce.unsafeCoerce;
var length = function ($18) {
    return Data_String_CodePoints.length(fromNonEmptyString($18));
};
var splitAt = function (i) {
    return function (nes) {
        var v = Data_String_CodePoints.splitAt(i)(fromNonEmptyString(nes));
        return {
            before: Data_String_NonEmpty_Internal.fromString(v.before),
            after: Data_String_NonEmpty_Internal.fromString(v.after)
        };
    };
};
var take = function (i) {
    return function (nes) {
        var s = fromNonEmptyString(nes);
        var $9 = i < 1;
        if ($9) {
            return Data_Maybe.Nothing.value;
        };
        return new Data_Maybe.Just(toNonEmptyString(Data_String_CodePoints.take(i)(s)));
    };
};
var toCodePointArray = function ($19) {
    return Data_String_CodePoints.toCodePointArray(fromNonEmptyString($19));
};
var toNonEmptyCodePointArray = function ($20) {
    return Data_Maybe.fromJust()(Data_Array_NonEmpty.fromArray(toCodePointArray($20)));
};
var uncons = function (nes) {
    var s = fromNonEmptyString(nes);
    return {
        head: Data_Maybe.fromJust()(Data_String_CodePoints.codePointAt(0)(s)),
        tail: Data_String_NonEmpty_Internal.fromString(Data_String_CodePoints.drop(1)(s))
    };
};
var fromFoldable1 = function (dictFoldable1) {
    return Data_Semigroup_Foldable.foldMap1(dictFoldable1)(Data_String_NonEmpty_Internal.semigroupNonEmptyString)(singleton);
};
var fromCodePointArray = function (v) {
    if (v.length === 0) {
        return Data_Maybe.Nothing.value;
    };
    return new Data_Maybe.Just(toNonEmptyString(Data_String_CodePoints.fromCodePointArray(v)));
};
var fromNonEmptyCodePointArray = function ($21) {
    return Data_Maybe.fromJust()(fromCodePointArray(Data_Array_NonEmpty.toArray($21)));
};
var dropWhile = function (f) {
    return function ($22) {
        return Data_String_NonEmpty_Internal.fromString(liftS(Data_String_CodePoints.dropWhile(f))($22));
    };
};
var drop = function (i) {
    return function (nes) {
        var s = fromNonEmptyString(nes);
        var $11 = i >= Data_String_CodePoints.length(s);
        if ($11) {
            return Data_Maybe.Nothing.value;
        };
        return new Data_Maybe.Just(toNonEmptyString(Data_String_CodePoints.drop(i)(s)));
    };
};
var countPrefix = function ($23) {
    return liftS(Data_String_CodePoints.countPrefix($23));
};
var cons = function (c) {
    return function (s) {
        return toNonEmptyString(Data_String_CodePoints.singleton(c) + s);
    };
};
var codePointAt = function ($24) {
    return liftS(Data_String_CodePoints.codePointAt($24));
};
module.exports = {
    fromCodePointArray: fromCodePointArray,
    fromNonEmptyCodePointArray: fromNonEmptyCodePointArray,
    singleton: singleton,
    cons: cons,
    snoc: snoc,
    fromFoldable1: fromFoldable1,
    toCodePointArray: toCodePointArray,
    toNonEmptyCodePointArray: toNonEmptyCodePointArray,
    codePointAt: codePointAt,
    indexOf: indexOf,
    "indexOf'": indexOf$prime,
    lastIndexOf: lastIndexOf,
    "lastIndexOf'": lastIndexOf$prime,
    uncons: uncons,
    length: length,
    take: take,
    takeWhile: takeWhile,
    drop: drop,
    dropWhile: dropWhile,
    countPrefix: countPrefix,
    splitAt: splitAt
};
