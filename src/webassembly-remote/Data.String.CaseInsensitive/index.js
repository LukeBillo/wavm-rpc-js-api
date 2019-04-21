// Generated by purs version 0.12.3
"use strict";
var Data_Eq = require("../Data.Eq/index.js");
var Data_Newtype = require("../Data.Newtype/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Show = require("../Data.Show/index.js");
var Data_String = require("../Data.String/index.js");
var Data_String_Common = require("../Data.String.Common/index.js");
var Prelude = require("../Prelude/index.js");
var CaseInsensitiveString = function (x) {
    return x;
};
var showCaseInsensitiveString = new Data_Show.Show(function (v) {
    return "(CaseInsensitiveString " + (Data_Show.show(Data_Show.showString)(v) + ")");
});
var newtypeCaseInsensitiveString = new Data_Newtype.Newtype(function (n) {
    return n;
}, CaseInsensitiveString);
var eqCaseInsensitiveString = new Data_Eq.Eq(function (v) {
    return function (v1) {
        return Data_String_Common.toLower(v) === Data_String_Common.toLower(v1);
    };
});
var ordCaseInsensitiveString = new Data_Ord.Ord(function () {
    return eqCaseInsensitiveString;
}, function (v) {
    return function (v1) {
        return Data_Ord.compare(Data_Ord.ordString)(Data_String_Common.toLower(v))(Data_String_Common.toLower(v1));
    };
});
module.exports = {
    CaseInsensitiveString: CaseInsensitiveString,
    eqCaseInsensitiveString: eqCaseInsensitiveString,
    ordCaseInsensitiveString: ordCaseInsensitiveString,
    showCaseInsensitiveString: showCaseInsensitiveString,
    newtypeCaseInsensitiveString: newtypeCaseInsensitiveString
};