const WebAssembly = require('../src/WebAssembly');

// You can use these the old-style promise way, like so:
// WebAssembly.Initialise("/home/luke/Documents/c++-wasm-files/wasm/basic-functions.wasm", false).then(r => {
//     console.log(r);
//     process.exit();
// });

// Or, preferably, use the new-style async-await:
async function run() {
    const r = await WebAssembly.Initialise("/home/luke/Documents/c++-wasm-files/wasm/basic-functions.wasm", false);
    console.log(r);
}

run().then(_ => process.exit());