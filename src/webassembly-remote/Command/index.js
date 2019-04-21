"use strict";
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Show = require("../Data.Show/index.js");
var Prelude = require("../Prelude/index.js");
var Type_Data_Boolean = require("../Type.Data.Boolean/index.js");
var Init = (function () {
    function Init(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Init.create = function (value0) {
        return function (value1) {
            return new Init(value0, value1);
        };
    };
    return Init;
})();
var Execute = (function () {
    function Execute(value0) {
        this.value0 = value0;
    };
    Execute.create = function (value0) {
        return new Execute(value0);
    };
    return Execute;
})();
var InvalidProc = (function () {
    function InvalidProc() {

    };
    InvalidProc.value = new InvalidProc();
    return InvalidProc;
})();

// Serializables
var Void = (function () {
    function Void(value0) {
        this.value0 = value0;
    };
    Void.create = function (value0) {
        return new Void(value0);
    };
    return Void;
})();

// Serializables
var InvalidCmd = (function () {
    function InvalidCmd() {

    };
    InvalidCmd.value = new InvalidCmd();
    return InvalidCmd;
})();
var Bundle = (function () {
    function Bundle(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Bundle.create = function (value0) {
        return function (value1) {
            return new Bundle(value0, value1);
        };
    };
    return Bundle;
})();
var showProcedure = new Data_Show.Show(function (v) {
    if (v instanceof Init) {
        return "Init \"" + (v.value0 + "\" False");
    };
    if (v instanceof Execute) {
        return "Execute \"" + (v.value0 + "\"");
    };
    if (v instanceof InvalidProc) {
        return "Invalid procedure";
    };
    throw new Error("Failed pattern match at Command (line 22, column 1 - line 22, column 41): " + [ v.constructor.name ]);
});
var showCommand = new Data_Show.Show(function (v) {
    if (v instanceof Void) {
        return "Void \"" + (v.value0 + "\"");
    };
    if (v instanceof InvalidCmd) {
        return "Invalid command";
    };
    throw new Error("Failed pattern match at Command (line 14, column 1 - line 14, column 37): " + [ v.constructor.name ]);
});
var showBundle = new Data_Show.Show(function (v) {
    return "Bundle " + (Data_Show.show(Data_Show.showArray(showCommand))(v.value0) + (" (" + (Data_Show.show(showProcedure)(v.value1) + ")")));
});
module.exports = {
    Void: Void,
    InvalidCmd: InvalidCmd,
    Init: Init,
    Execute: Execute,
    InvalidProc: InvalidProc,
    Bundle: Bundle,
    showCommand: showCommand,
    showProcedure: showProcedure,
    showBundle: showBundle
};
