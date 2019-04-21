"use strict";
var $foreign = require("./foreign.js");
var Command = require("../Command/index.js");
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Apply = require("../Control.Apply/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Monad = require("../Control.Monad/index.js");
var Control_Monad_Reader = require("../Control.Monad.Reader/index.js");
var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");
var Control_Monad_Reader_Trans = require("../Control.Monad.Reader.Trans/index.js");
var Control_Monad_State = require("../Control.Monad.State/index.js");
var Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
var Control_Monad_State_Trans = require("../Control.Monad.State.Trans/index.js");
var Control_Promise = require("../Control.Promise/index.js");
var Data_Array = require("../Data.Array/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Function_Uncurried = require("../Data.Function.Uncurried/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Show = require("../Data.Show/index.js");
var Data_Tuple = require("../Data.Tuple/index.js");
var Effect = require("../Effect/index.js");
var Effect_Aff = require("../Effect.Aff/index.js");
var Effect_Aff_Class = require("../Effect.Aff.Class/index.js");
var Effect_Class = require("../Effect.Class/index.js");
var Prelude = require("../Prelude/index.js");
var Type_Data_Boolean = require("../Type.Data.Boolean/index.js");
var TypeConversion = require("../TypeConversion/index.js");

/**
 *  --------------- 
 */
/**
 *  Command runners 
 */
/**
 *  --------------- 
 */
var Endpoint = (function () {
    function Endpoint(value0) {
        this.value0 = value0;
    };
    Endpoint.create = function (value0) {
        return new Endpoint(value0);
    };
    return Endpoint;
})();

// Remote monad
var Remote = function (x) {
    return x;
};

// Sync
var sendSyncCurried = Data_Function_Uncurried.runFn2($foreign.sendSync);
var sendRemoteSync = function (sock) {
    return function (s) {
        return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(sendSyncCurried(sock)(s)))(Control_Promise.toAff);
    };
};
var sendBundledCmds = function (v) {
    return function (cmds) {
        return v.value0.async(v.value0.sockets.asyncSocket)(Data_Show.show(Data_Show.showArray(Command.showCommand))(cmds));
    };
};

/**
 *  -------------- 
 */
/**
 *  Send functions 
 */
/**
 *  -------------- 
 */
// Async
var sendAsyncCurried = Data_Function_Uncurried.runFn2($foreign.sendAsync);
var sendRemoteAsync = function (sock) {
    return function (s) {
        return Control_Bind.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(sendAsyncCurried(sock)(s)))(Control_Promise.toAff);
    };
};

// Generic
var send = function (e) {
    return function (v) {
        return Control_Bind.bind(Effect_Aff.bindAff)(Control_Monad_State_Trans.runStateT(Control_Monad_Reader_Trans.runReaderT(v)(e))([  ]))(function (v1) {
            var res = Data_Tuple.fst(v1);
            var cmds = Data_Tuple.snd(v1);
            return Control_Bind.discard(Control_Bind.discardUnit)(Effect_Aff.bindAff)(Control_Applicative.when(Effect_Aff.applicativeAff)(!Data_Array["null"](cmds))(sendBundledCmds(e)(cmds)))(function () {
                return Control_Applicative.pure(Effect_Aff.applicativeAff)(res);
            });
        });
    };
};
var runSyncCmd = function (p) {
    return Remote(Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Control_Monad_State_Trans.bindStateT(Effect_Aff.monadAff)))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(Control_Monad_State_Trans.monadStateT(Effect_Aff.monadAff))))(function (v) {
        return Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Control_Monad_State_Trans.bindStateT(Effect_Aff.monadAff)))(Control_Monad_State_Class.get(Control_Monad_Reader_Trans.monadStateReaderT(Control_Monad_State_Trans.monadStateStateT(Effect_Aff.monadAff))))(function (v1) {
            return Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Control_Monad_State_Trans.bindStateT(Effect_Aff.monadAff)))(Effect_Aff_Class.liftAff(Effect_Aff_Class.monadAffReader(Effect_Aff_Class.monadAffState(Effect_Aff_Class.monadAffAff)))(v.value0.sync(v.value0.sockets.syncSocket)(Data_Show.show(Command.showBundle)(new Command.Bundle(v1, p)))))(function (v2) {
                return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Reader_Trans.bindReaderT(Control_Monad_State_Trans.bindStateT(Effect_Aff.monadAff)))(Control_Monad_State_Class.put(Control_Monad_Reader_Trans.monadStateReaderT(Control_Monad_State_Trans.monadStateStateT(Effect_Aff.monadAff)))([  ]))(function () {
                    return Control_Applicative.pure(Control_Monad_Reader_Trans.applicativeReaderT(Control_Monad_State_Trans.applicativeStateT(Effect_Aff.monadAff)))(TypeConversion.convertFromWasmType(TypeConversion.parseResult(v2)));
                });
            });
        });
    }));
};
var runAsyncCmd = function (c) {
    return Remote(Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Control_Monad_State_Trans.bindStateT(Effect_Aff.monadAff)))(Control_Monad_State_Class.get(Control_Monad_Reader_Trans.monadStateReaderT(Control_Monad_State_Trans.monadStateStateT(Effect_Aff.monadAff))))(function (v) {
        return Control_Monad_State_Class.put(Control_Monad_Reader_Trans.monadStateReaderT(Control_Monad_State_Trans.monadStateStateT(Effect_Aff.monadAff)))(Data_Semigroup.append(Data_Semigroup.semigroupArray)([ c ])(v));
    }));
};
var $$void = function (s) {
    return runAsyncCmd(new Command.Void(s));
};
var monadRemote = Control_Monad_Reader_Trans.monadReaderT(Control_Monad_State_Trans.monadStateT(Effect_Aff.monadAff));
var monadEffectRemote = Control_Monad_Reader_Trans.monadEffectReader(Control_Monad_State_Trans.monadEffectState(Effect_Aff.monadEffectAff));
var monadAskRemote = Control_Monad_Reader_Trans.monadAskReaderT(Control_Monad_State_Trans.monadStateT(Effect_Aff.monadAff));

// Command conversions
var init = function (s) {
    return function (b) {
        return runSyncCmd(new Command.Init(s, b));
    };
};
var functorRemote = Control_Monad_Reader_Trans.functorReaderT(Control_Monad_State_Trans.functorStateT(Effect_Aff.functorAff));
var execute = function (s) {
    return runSyncCmd(new Command.Execute(s));
};

/**
 *  -------------- 
 */
/**
 *  Server startup 
 */
/**
 *  -------------- 
 */
var createZeroMqServerCurried = Data_Function_Uncurried.runFn2($foreign.createZeroMqServer);
var createRpcServer = createZeroMqServerCurried;
var createEndpoint = function (s) {
    return new Endpoint({
        sockets: s,
        async: sendRemoteAsync,
        sync: sendRemoteSync
    });
};
var bindRemote = Control_Monad_Reader_Trans.bindReaderT(Control_Monad_State_Trans.bindStateT(Effect_Aff.monadAff));
var applyRemote = Control_Monad_Reader_Trans.applyReaderT(Control_Monad_State_Trans.applyStateT(Effect_Aff.monadAff));
var applicativeRemote = Control_Monad_Reader_Trans.applicativeReaderT(Control_Monad_State_Trans.applicativeStateT(Effect_Aff.monadAff));
module.exports = {
    createZeroMqServerCurried: createZeroMqServerCurried,
    createRpcServer: createRpcServer,
    sendAsyncCurried: sendAsyncCurried,
    sendRemoteAsync: sendRemoteAsync,
    sendSyncCurried: sendSyncCurried,
    sendRemoteSync: sendRemoteSync,
    sendBundledCmds: sendBundledCmds,
    send: send,
    Endpoint: Endpoint,
    createEndpoint: createEndpoint,
    runAsyncCmd: runAsyncCmd,
    runSyncCmd: runSyncCmd,
    init: init,
    execute: execute,
    "void": $$void,
    Remote: Remote,
    bindRemote: bindRemote,
    monadRemote: monadRemote,
    applicativeRemote: applicativeRemote,
    applyRemote: applyRemote,
    functorRemote: functorRemote,
    monadAskRemote: monadAskRemote,
    monadEffectRemote: monadEffectRemote,
    createZeroMqServer: $foreign.createZeroMqServer,
    sendAsync: $foreign.sendAsync,
    sendSync: $foreign.sendSync
};
