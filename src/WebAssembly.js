const Control_Applicative = require("./webassembly-remote/Control.Applicative/index.js");
const Control_Bind = require("./webassembly-remote/Control.Bind/index.js");
const Effect_Aff = require("./webassembly-remote/Effect.Aff/index.js");
const ZeroMQ = require("./webassembly-remote/ZeroMQ/index.js");
const Control_Promise = require("./webassembly-remote/Control.Promise");

function wasmSocket() {
    if (typeof wasmSocket.endpoint === 'undefined') {
        var endpoint = ZeroMQ.createEndpoint(ZeroMQ.createRpcServer(45555)(45554));
    }
    return endpoint;
}

const endpoint = wasmSocket();
let commandQueue = [];

function constructNextCommandChain(index, commandQueue, finalCommand) {
    if (index === commandQueue.length) {
        return function () {
            return finalCommand;
        }
    }

    const nextInChain = constructNextCommandChain(index + 1, commandQueue, finalCommand);

    return function () {
        return Control_Bind.discard(Control_Bind.discardUnit)(ZeroMQ.bindRemote)(commandQueue[index])(nextInChain);
    }
}

function buildCommandChain(finalCommand) {
    let commandChain = null;

    if (commandQueue.length !== 0) {
        commandChain = Control_Bind.discard(Control_Bind.discardUnit)(ZeroMQ.bindRemote)(commandQueue[0]);
        return (commandChain(constructNextCommandChain(1, commandQueue, finalCommand)));
    } else {
        return finalCommand;
    }
}

function runCommandChain(lastCommand) {
    let commandChain = buildCommandChain(lastCommand);
    commandQueue = [];

    return Control_Promise.fromAff(
        (ZeroMQ.send(endpoint)
            (commandChain)
        )
    )();
}

function stringifyArgs(args) {
    let stringifedArgs = '';

    if (args) {
        for (let arg of args) {
            stringifedArgs += ` ${arg}`;
        }
    }

    return stringifedArgs;
}

// Promise<bool> - send immediately
function Init(moduleFile, isPrecompiled) {
    return runCommandChain(ZeroMQ.init(moduleFile)(isPrecompiled))
           .then(r => r === "Initialised");;
}

// Promise<any> - send immediately
function Execute(functionName, ...args) {
    const stringifedArgs = stringifyArgs(args);
    return runCommandChain(ZeroMQ.execute(`${functionName}${stringifedArgs}`));
}

// Promise<void> - not sent immediately unless specified
function Void(functionName, ...args) {
    const stringifedArgs = stringifyArgs(args);

    commandQueue.push(ZeroMQ.void(`${functionName}${stringifedArgs}`));
    return Promise.resolve();
}

function VoidNow(functionName, ...args) {
    const stringifedArgs = stringifyArgs(args);
    return runCommandChain(ZeroMQ.void(`${functionName}${stringifedArgs}`));
}

module.exports = {
    Initialise: Init,
    Execute: Execute,
    Void: Void
};
