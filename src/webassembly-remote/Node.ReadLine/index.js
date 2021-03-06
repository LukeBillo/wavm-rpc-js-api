// Generated by purs version 0.12.3
"use strict";
var $foreign = require("./foreign.js");
var Control_Applicative = require("../Control.Applicative/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Options = require("../Data.Options/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Effect = require("../Effect/index.js");
var Foreign = require("../Foreign/index.js");
var Node_Process = require("../Node.Process/index.js");
var Node_Stream = require("../Node.Stream/index.js");
var Prelude = require("../Prelude/index.js");
var terminal = Data_Options.opt("terminal");
var output = Data_Options.opt("output");
var noCompletion = function (s) {
    return Control_Applicative.pure(Effect.applicativeEffect)({
        completions: [  ],
        matched: s
    });
};
var historySize = Data_Options.opt("historySize");
var createInterface = function (input) {
    return function (opts) {
        return $foreign.createInterfaceImpl(Data_Options.options(Data_Semigroup.append(Data_Options.semigroupOptions)(opts)(Data_Options.assoc(Data_Options.opt("input"))(input))));
    };
};
var completer = Data_Options.opt("completer");
var createConsoleInterface = function (compl) {
    return createInterface(Node_Process.stdin)(Data_Semigroup.append(Data_Options.semigroupOptions)(Data_Options.assoc(output)(Node_Process.stdout))(Data_Options.assoc(completer)(compl)));
};
module.exports = {
    createInterface: createInterface,
    createConsoleInterface: createConsoleInterface,
    output: output,
    completer: completer,
    terminal: terminal,
    historySize: historySize,
    noCompletion: noCompletion,
    prompt: $foreign.prompt,
    setPrompt: $foreign.setPrompt,
    setLineHandler: $foreign.setLineHandler,
    close: $foreign.close,
    question: $foreign.question
};
