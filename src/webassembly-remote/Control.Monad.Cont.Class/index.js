// Generated by purs version 0.12.3
"use strict";
var Prelude = require("../Prelude/index.js");
var MonadCont = function (Monad0, callCC) {
    this.Monad0 = Monad0;
    this.callCC = callCC;
};
var callCC = function (dict) {
    return dict.callCC;
};
module.exports = {
    MonadCont: MonadCont,
    callCC: callCC
};
