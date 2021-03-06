// Generated by purs version 0.12.3
"use strict";
var Control_Category = require("../Control.Category/index.js");
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_Either = require("../Data.Either/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Functor_Coproduct = require("../Data.Functor.Coproduct/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Prelude = require("../Prelude/index.js");
var Inject = function (inj, prj) {
    this.inj = inj;
    this.prj = prj;
};
var prj = function (dict) {
    return dict.prj;
};
var injectReflexive = new Inject(Control_Category.identity(Control_Category.categoryFn), Data_Maybe.Just.create);
var injectLeft = new Inject(function ($1) {
    return Data_Functor_Coproduct.Coproduct(Data_Either.Left.create($1));
}, Data_Functor_Coproduct.coproduct(Data_Maybe.Just.create)(Data_Function["const"](Data_Maybe.Nothing.value)));
var inj = function (dict) {
    return dict.inj;
};
var injectRight = function (dictInject) {
    return new Inject(function ($2) {
        return Data_Functor_Coproduct.Coproduct(Data_Either.Right.create(inj(dictInject)($2)));
    }, Data_Functor_Coproduct.coproduct(Data_Function["const"](Data_Maybe.Nothing.value))(prj(dictInject)));
};
module.exports = {
    inj: inj,
    prj: prj,
    Inject: Inject,
    injectReflexive: injectReflexive,
    injectLeft: injectLeft,
    injectRight: injectRight
};
