const WebAssembly = require('../src/WebAssembly');
const { performance } = require('perf_hooks');

async function run() {
    const start = performance.now();
    const success = await WebAssembly.Initialise(`${__dirname}/../wasm-examples/basic-functions.wasm`, false);
    const end = performance.now();
    
    success ? 
        console.log("Successfully initialised WAVM.") : 
        console.log("Failed to initialise WAVM.");

    console.log(`Time taken to initialise: ${(end - start).toFixed(5)}`);
}

run().then(_ => process.exit());