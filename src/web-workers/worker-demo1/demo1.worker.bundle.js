/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 374);
/******/ })
/************************************************************************/
/******/ ({

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(83);


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
console.log('Web Worker ONE Loaded.');
// prevent TypeScript compile error
const customPostMessage = postMessage;
// Jasmine API
// The postMessage method has a different signature
// in the browser than in a worker.
// Supply a custom postMessage callback method to
// prevent TypeScript data type errors.
let jasmineSpecPostMessageCallback = null;
let jasmineSpecIsInBrowser;
// Strange try / catch couple with boolean logic is to
// suppress errors in both teh worker and browser contexts.
// Worker throws an error for window being undefined.
// TypeScript throws errors for compiling worker.
try {
    jasmineSpecIsInBrowser = (window !== undefined);
}
catch (e) {
    jasmineSpecIsInBrowser = false; // We are a web worker!
}
// Worker API
onmessage = function (event) {
    // worker data process
    console.log('Web Worker ONE: Message received from main script');
    console.log('Web Worker ONE: Posting message back to main script');
    const workerResult = 'Result: ' + event.data + ' in Worker';
    if (jasmineSpecIsInBrowser) {
        if (!jasmineSpecPostMessageCallback) {
            throw Error('Need postMessage callback to run jasmine specs');
        }
        else {
            jasmineSpecPostMessageCallback(workerResult);
        }
    }
    else {
        customPostMessage(workerResult);
    }
};
// Jasmine API
const jasmineSpecWorkerAPI = {
    onmessage: onmessage,
    postMessage: (cb) => {
        jasmineSpecPostMessageCallback = cb;
    }
};
/* harmony export (immutable) */ __webpack_exports__["jasmineSpecWorkerAPI"] = jasmineSpecWorkerAPI;

//# sourceMappingURL=demo1.worker.js.map

/***/ })

/******/ });
//# sourceMappingURL=demo1.worker.bundle.js.map