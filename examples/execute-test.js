const WebAssembly = require('../src/WebAssembly');
const { performance } = require('perf_hooks');

async function executeTest() {
    const startBeforeInit = performance.now();
    const success = await WebAssembly.Initialise("/home/luke/Documents/c++-wasm-files/wasm/basic-functions-precomp.wasm", true)

    if (!success) {
        console.log("Failed to initialise WAVM. Exiting..");
        process.exit();
    }
    
    const startAfterInit = performance.now();

    await WebAssembly.Void("_addToMyNumber", 15);
    await WebAssembly.Void("_addToMyNumber", 15);
    await WebAssembly.Void("_addToMyNumber", 25);

    const res = await WebAssembly.Execute("_getMyNumber");

    const end = performance.now();

    console.log(res);
    console.log(`Time taken, excluding start-up: ${(end - startAfterInit).toFixed(5)}ms`)
    console.log(`Time taken, including start-up: ${(end - startBeforeInit).toFixed(5)}ms`)
}

const start = performance.now();
executeTest().then(_ => {
    const end = performance.now();
    console.log(`Total time taken: ${(end - start).toFixed(5)}ms`)
    process.exit()
});
