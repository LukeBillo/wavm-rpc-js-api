const WebAssembly = require('../src/WebAssembly');
const { performance } = require('perf_hooks');

async function executeTest() {
    const start = performance.now();
    const success = await WebAssembly.Initialise("/home/luke/Documents/c++-wasm-files/wasm/basic-functions-precomp.wasm", true)
    const end = performance.now();

    if (!success) {
        console.log("Failed to initialise WAVM. Exiting..");
        process.exit();
    }
    
    await WebAssembly.Void("_addToMyNumber 15");
    await WebAssembly.Void("_addToMyNumber 15");
    await WebAssembly.Void("_addToMyNumber 15");

    const res = await WebAssembly.Execute("_getMyNumber");

    console.log(res);
    console.log(`Transmission time: ${(end - start).toFixed(5)}ms`)
}

const start = performance.now();
executeTest().then(_ => process.exit());
const end = performance.now();

console.log(`Total time taken: ${(end - start).toFixed(5)}ms`)