// Generated by purs version 0.12.3
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Map_Internal = require("../Data.Map.Internal/index.js");
var Data_Set = require("../Data.Set/index.js");
var Prelude = require("../Prelude/index.js");
var Unsafe_Coerce = require("../Unsafe.Coerce/index.js");
var keys = function ($0) {
    return Data_Functor["void"](Data_Map_Internal.functorMap)($0);
};
module.exports = {
    keys: keys
};