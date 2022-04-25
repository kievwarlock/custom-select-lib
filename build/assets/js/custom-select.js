/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/custom-select.css":
/*!*******************************!*\
  !*** ./src/custom-select.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://custom-select-lib/./src/custom-select.css?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CUSTOM_ON_CHANGE_EVENT\": () => (/* binding */ CUSTOM_ON_CHANGE_EVENT),\n/* harmony export */   \"CUSTOM_SELECT_CLASSNAME_HEAD\": () => (/* binding */ CUSTOM_SELECT_CLASSNAME_HEAD),\n/* harmony export */   \"CUSTOM_SELECT_CLASSNAME_HIDDEN\": () => (/* binding */ CUSTOM_SELECT_CLASSNAME_HIDDEN),\n/* harmony export */   \"CUSTOM_SELECT_CLASSNAME_OPTION\": () => (/* binding */ CUSTOM_SELECT_CLASSNAME_OPTION),\n/* harmony export */   \"CUSTOM_SELECT_CLASSNAME_OPTIONS\": () => (/* binding */ CUSTOM_SELECT_CLASSNAME_OPTIONS),\n/* harmony export */   \"CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN\": () => (/* binding */ CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN),\n/* harmony export */   \"CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED\": () => (/* binding */ CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED),\n/* harmony export */   \"CUSTOM_SELECT_CLASSNAME_VALUE\": () => (/* binding */ CUSTOM_SELECT_CLASSNAME_VALUE),\n/* harmony export */   \"CUSTOM_SELECT_CLASSNAME_WRAPPER\": () => (/* binding */ CUSTOM_SELECT_CLASSNAME_WRAPPER)\n/* harmony export */ });\nconst CUSTOM_SELECT_CLASSNAME_WRAPPER = 'custom-select-wrapper';\nconst CUSTOM_SELECT_CLASSNAME_HIDDEN = 'custom-select-hidden';\nconst CUSTOM_SELECT_CLASSNAME_OPTIONS = 'custom-select-options';\nconst CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN = 'custom-select-is-open';\nconst CUSTOM_SELECT_CLASSNAME_OPTION = 'custom-select-option';\nconst CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED =\n    'custom-select-option-selected';\nconst CUSTOM_SELECT_CLASSNAME_HEAD = 'custom-select-head';\nconst CUSTOM_SELECT_CLASSNAME_VALUE = 'custom-select-value';\n\nconst CUSTOM_ON_CHANGE_EVENT = 'onChange';\n\n\n//# sourceURL=webpack://custom-select-lib/./src/constants.js?");

/***/ }),

/***/ "./src/custom-select.js":
/*!******************************!*\
  !*** ./src/custom-select.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CustomSelect\": () => (/* binding */ CustomSelect)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\nconst defaultSettings = {\n    containerClass: '',\n    selectValueClass: '',\n    headClass: '',\n    optionsClass: '',\n};\n\nfunction CustomSelect(selector, settings = defaultSettings) {\n    if (!validateSelectElement(selector)) {\n        throw new Error('Validation select element error!');\n    }\n    const newOnChange = new Event(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_ON_CHANGE_EVENT);\n\n    const originSelectElement = document.querySelector(selector);\n    const globalNewSelectElement = document.createElement('div');\n    const globalSelectValueElement = document.createElement('div');\n    const newSelectHeadElement = document.createElement('div');\n    const newOptionsElement = document.createElement('div');\n\n    originSelectElement.insertAdjacentElement(\n        'beforebegin',\n        globalNewSelectElement,\n    );\n    globalNewSelectElement.append(originSelectElement);\n\n    addMainClassNames();\n    addAdditionalClassNames();\n    createNewSelectHead();\n    createNewSelectOptions();\n    addOutsideClickEvent();\n\n    function addMainClassNames() {\n        originSelectElement.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_HIDDEN);\n        globalNewSelectElement.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_WRAPPER);\n        globalSelectValueElement.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_VALUE);\n        newSelectHeadElement.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_HEAD);\n        newOptionsElement.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_OPTIONS);\n    }\n\n    function addAdditionalClassNames() {\n        const { containerClass, headClass, optionsClass, selectValueClass } =\n            settings;\n\n        if (containerClass) {\n            globalNewSelectElement.classList.add(containerClass);\n        }\n        if (selectValueClass) {\n            globalSelectValueElement.classList.add(selectValueClass);\n        }\n        if (headClass) {\n            newSelectHeadElement.classList.add(headClass);\n        }\n        if (optionsClass) {\n            newOptionsElement.classList.add(optionsClass);\n        }\n    }\n\n    function validateSelectElement(element) {\n        if (element && typeof element === 'string') {\n            const elementItem = document.querySelectorAll(element)?.[0];\n\n            if (\n                elementItem instanceof HTMLElement &&\n                elementItem.tagName.toUpperCase() === 'SELECT'\n            ) {\n                return true;\n            }\n        }\n\n        return false;\n    }\n\n    function createNewSelectHead() {\n        newSelectHeadElement.addEventListener('click', () => {\n            globalNewSelectElement.classList.toggle(\n                _constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN,\n            );\n        });\n\n        const { label } = getValue();\n        globalSelectValueElement.innerText = label;\n        newSelectHeadElement.appendChild(globalSelectValueElement);\n        globalNewSelectElement.append(newSelectHeadElement);\n    }\n\n    function createNewSelectOptions() {\n        const { value: selectedOptionValue } = getValue();\n\n        for (const optionItem of originSelectElement.options) {\n            const newOptionItemElement = document.createElement('div');\n            newOptionItemElement.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_OPTION);\n            if (optionItem.value === selectedOptionValue) {\n                newOptionItemElement.classList.add(\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED,\n                );\n            }\n            newOptionItemElement.setAttribute('data-value', optionItem.value);\n            newOptionItemElement.innerText = optionItem.label;\n            newOptionItemElement.addEventListener('click', (e) => {\n                setValue(e.target.getAttribute('data-value'));\n            });\n            newOptionsElement.append(newOptionItemElement);\n        }\n\n        globalNewSelectElement.append(newOptionsElement);\n    }\n\n    function addOutsideClickEvent() {\n        document.addEventListener('click', (e) => {\n            if (!globalNewSelectElement.contains(e.target)) {\n                closeMenu();\n            }\n        });\n    }\n\n    function closeMenu() {\n        globalNewSelectElement.classList.remove(\n            _constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN,\n        );\n    }\n\n    function setValue(value) {\n        globalNewSelectElement\n            .querySelectorAll(`.${_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_OPTION}`)\n            .forEach((item) => {\n                item.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED);\n                const dataValue = item.getAttribute('data-value');\n\n                if (dataValue === value) {\n                    originSelectElement.value = value;\n                    globalSelectValueElement.innerText = item.innerHTML;\n                    item.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED);\n                    closeMenu();\n                    globalNewSelectElement.dispatchEvent(newOnChange);\n                }\n            });\n    }\n\n    function getValue() {\n        return {\n            label: originSelectElement.selectedOptions?.[0].label,\n            value: originSelectElement.selectedOptions?.[0].value,\n        };\n    }\n\n    function onChange(callback) {\n        if (typeof callback !== 'function') return;\n\n        globalNewSelectElement.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_ON_CHANGE_EVENT, () => {\n            callback(getValue());\n        });\n    }\n\n    return {\n        setValue,\n        getValue,\n        onChange,\n    };\n}\n\n__webpack_require__.g.CustomSelect = CustomSelect;\n\n\n//# sourceURL=webpack://custom-select-lib/./src/custom-select.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _custom_select_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-select.css */ \"./src/custom-select.css\");\n/* harmony import */ var _custom_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-select */ \"./src/custom-select.js\");\n\n\n\n__webpack_require__.g.CustomSelect = _custom_select__WEBPACK_IMPORTED_MODULE_1__.CustomSelect;\n\n\n//# sourceURL=webpack://custom-select-lib/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;