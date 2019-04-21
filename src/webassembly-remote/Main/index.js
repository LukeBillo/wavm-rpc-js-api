"use strict";
var Control_Bind = require("../Control.Bind/index.js");
var Control_Promise = require("../Control.Promise/index.js");
var Data_Function = require("../Data.Function/index.js");
var Effect = require("../Effect/index.js");
var Prelude = require("../Prelude/index.js");
var TypeConversion = require("../TypeConversion/index.js");
var ZeroMQ = require("../ZeroMQ/index.js");
var initP = function (endpoint) {
    return Control_Promise.fromAff(ZeroMQ.send(endpoint)(Control_Bind.discard(Control_Bind.discardUnit)(ZeroMQ.bindRemote)(ZeroMQ["void"]("addToMyNumber 15"))(function () {
        return Control_Bind.discard(Control_Bind.discardUnit)(ZeroMQ.bindRemote)(ZeroMQ["void"]("addToMyNumber 15"))(function () {
            return ZeroMQ.execute("_getMyNumber");
        });
    })));
};
var main = (function () {
    var endpoint = ZeroMQ.createEndpoint(ZeroMQ.createRpcServer(45555)(45554));
    return initP(endpoint);
})();
module.exports = {
    main: main,
    initP: initP
};
