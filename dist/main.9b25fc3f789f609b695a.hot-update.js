exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express = __webpack_require__(/*! express */ \"express\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar user_1 = __webpack_require__(/*! ./routes/user */ \"./src/routes/user.ts\");\nvar app = express();\nconsole.log(\"test\");\napp.use(bodyParser);\napp.use('/user', user_1.default);\napp.listen(3000);\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

};