const WebAssembly = require('../src/WebAssembly');
const { performance } = require('perf_hooks');

async function executeTest() {
    const success = await WebAssembly.Initialise(`${__dirname}/../wasm-examples/basic-functions.wasm`, false)

    if (!success) {
        console.log("Failed to initialise WAVM. Exiting..");
        process.exit();
    }
    
    const start = performance.now();

    await WebAssembly.Execute("_addToMyNumber", 15);
    await WebAssembly.Execute("_addToMyNumber", 15);
    await WebAssembly.Execute("_addToMyNumber", 25);

    const res = await WebAssembly.Execute("_getMyNumber");

    const end = performance.now();

    console.log(res);
    console.log(`Time taken: ${(end - start).toFixed(5)}ms`)
}

executeTest().then(_ => {
    process.exit()
});
