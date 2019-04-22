# JavaScript API Design

This document discusses the API design for using WebAssembly from JS when it is hosted in a virtual machine.

---
## Initialisation

The very first function to be called will need to initialise the virtual machine with a `.wasm` module. This can be achieved using the exported function `Initialise`.

```ts
WebAssembly.Initialise(moduleName: string, isPrecompiled: boolean): Promise<boolean>
```

### Parameters

- module: This is a `string` parameter which is the location of the module on the host PC. **Note**: In a browser, this would be changed to be a string of the module's code, since the `.wasm` file should not be stored locally.
- isPrecompiled: this is a `boolean` parameter, which can be provided to utilise WAVM's `wavm-precompile` executable. Using `wavm-precompile` on an existing modulle will precompile it to object files, and will reduce initialisation time when using this module. When the module you are using is precompiled, set `isPrecompiled` to true. Otherwise, it should be false.

### Return Value

`Initialise` returns a `Promise<boolean>`. The boolean value represents whether initialisation was successful or not, and as such, you should handle a false value accordingly.

### Additional Information

WebAssembly modules can be compiled from C or C++ using the emcc and em++ executables respectively. These executables are available from the Emscripten SDK (emsdk) which can be found at https://emscripten.org/docs/getting_started/downloads.html.

---
## Calling a Function

Once a module has been loaded, it is now possible to execute functions that are available in the loaded WebAssembly module. Executing a function can be achieved with `Execute`.

```ts
WebAssembly.Execute(funcName: string, ...args: any[]): Promise<any>
```

### Parameters

- functionName: This is a `string` which equates to the function's name that you wish to call. Be wary of Emscripten's obfuscation when using emcc or em++ compiled modules, as function names will frequently not be what you expect. To keep function names as readable as possible, it is recommended to use `extern "C"` in C/C++ function definitions, which will output function names prefixed with an underscore like so: `_myFunction()`.
- ...args: This is a list of arguments for the function being called. They can be provided as either an array (e.g. `Execute("myFunction", [1,2])`) or as different parametets (e.g. `Execute("myFunction, 1, 2,)`).

### Return Value

The return value is the return value of the function called. The return value is automatically converted to the JavaScript equivalent of the WebAssembly type returned.

### Additional Information

Be wary of using classes / structs / objects for both arguments and return types. These are not currently supported by the API, as there is currently no way of representing them effectively in WebAssembly or serialising and deserialising them effectively.

---
## Functions without a return

When using functions where there is no return value, or the return value can be simply discarded, it is more efficient to call `Void`.

```ts
WebAssembly.Void(funcName: string, ...args: any[]): Promise<void>
```

### Parameters

The parameters for this are identical to `Execute`. See above for further details.

### Return Value

Since this does not have a return value, it will return a `Promise<void>`.

### Additional Information

In the underlying implementation, `Void` calls are added to a queue and not immediately sent to be evaluated. This way, when a function with a return value is sent, `Void` calls are bundled and sent together with it and are executed in the order they were queued.

If this is not desirable, it is possible to send a `Void` function immediately using the function described below, `VoidNow`.

Be wary of queueing a lot of `Void` functions, as `Promise`s may time out if execution takes too long.

## Executing functions without a return immediately

As mentioned above, functions where the return value is not utilised (or there isn't one) can be called more efficiently with `Void`. However, these queue up and are bundled locally before evaluating the function remotely. 

When this isn't desirable, `VoidNow` can be used.

```ts
WebAssembly.VoidNow(funcName: string, ...args: any[]): Promise<void>
```

### Parameters

Again, these parameters are identical to those used in both `Void` and `Execute`. See above for more information.

### Return Value

The return value is identical to `Void`, and is a `Promise<void>`.

### Additional Information

This is different to `Void` in that it sends immediately instead of queueing up functions to be evaluated remotely later.

## Running asynchronous, non-returning tasks

Sometimes, it is ideal to use threads for longer-running tasks or when something needs to be computed asynchronously. For this purpose, there is an asynchronous `VoidNow` which executes immediately and asynchronously.

```ts
WebAssembly.VoidAsync(funcName: string, ...args: any[]) : Promise<void>
```

### Parameters

The parameters are equivalent to those used for `Execute`, `Void` and `VoidNow`.

### Return Value

The return value for this is a `Promise<void>`. However, this `Promise` resolves once the functions have been sent to the server and **does not wait for their evaluation to be completed**.

### Additional Notes

Be weary when using asynchronous calls, as this will not wait for them to complete and values may not be what you expect at particular times.

As mentioned, this will **not be queued** like `Void`. It will be sent to the remote WebAssembly server immediately, similarly to `VoidNow`.

## Examples

Examples are available in the same folder as this documentation. See ./examples for examples of using this JavaScript API, which use the WebAssembly modules located in ./wasm-examples when running.

Examples can be executed using NodeJS. To run an example:

`node [file-name].js`

E.g. To run the initialisation test:

`node initialise-test.js`

## Future Work & Improvements

In the future, it could be possible to have a `Module` object which is returned from `Initialise` and holds all of the exported functions of a WebAssembly module. This would reflect how the current WebAssembly API is designed- however, this is currently too time consuming to implement for the project.

This would not change the rest of the API, it would simply mean you could do something like the following:

```js
const module = await WebAssembly.initialise("module.wasm");
await WebAssembly.Void(module.myFunction, 1, 2);

const result = WebAssembly.Execute(module.getMyValue);
// ...
```