// Generated by purs version 0.12.3
"use strict";
var $foreign = require("./foreign.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Posix = require("../Data.Posix/index.js");
var Data_Posix_Signal = require("../Data.Posix.Signal/index.js");
var Effect = require("../Effect/index.js");
var Foreign_Object = require("../Foreign.Object/index.js");
var Node_Platform = require("../Node.Platform/index.js");
var Node_Stream = require("../Node.Stream/index.js");
var Prelude = require("../Prelude/index.js");
var Unsafe_Coerce = require("../Unsafe.Coerce/index.js");
var version = $foreign.process.version;
var stdoutIsTTY = $foreign.process.stdout.isTTY;
var stdout = $foreign.process.stdout;
var stdin = $foreign.process.stdin;
var stderrIsTTY = $foreign.process.stderr.isTTY;
var stderr = $foreign.process.stderr;
var platformStr = $foreign.process.platform;
var platform = Node_Platform.fromString(platformStr);
var pid = $foreign.process.pid;
var onSignal = function (sig) {
    return $foreign.onSignalImpl(Data_Posix_Signal.toString(sig));
};
var mkEffect = Unsafe_Coerce.unsafeCoerce;
var nextTick = function (callback) {
    return mkEffect(function (v) {
        return $foreign.process.nextTick(callback);
    });
};
var getEnv = mkEffect(function (v) {
    return $foreign.process.env;
});
var lookupEnv = function (k) {
    return Data_Functor.map(Effect.functorEffect)(Foreign_Object.lookup(k))(getEnv);
};
var execPath = mkEffect(function (v) {
    return $foreign.process.execPath;
});
var execArgv = mkEffect(function (v) {
    return $foreign.process.execArgv;
});
var cwd = $foreign.process.cwd;
var argv = mkEffect(function (v) {
    return $foreign.process.argv;
});
module.exports = {
    onSignal: onSignal,
    argv: argv,
    execArgv: execArgv,
    execPath: execPath,
    cwd: cwd,
    getEnv: getEnv,
    lookupEnv: lookupEnv,
    pid: pid,
    platform: platform,
    stdin: stdin,
    stdout: stdout,
    stderr: stderr,
    stdoutIsTTY: stdoutIsTTY,
    stderrIsTTY: stderrIsTTY,
    version: version,
    onBeforeExit: $foreign.onBeforeExit,
    onExit: $foreign.onExit,
    chdir: $foreign.chdir,
    setEnv: $foreign.setEnv,
    exit: $foreign.exit
};