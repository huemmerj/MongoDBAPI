"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var user_1 = require("./routes/user");
var app = express();
app.use(bodyParser);
app.use('/user', user_1.default);
app.listen(3000);
//# sourceMappingURL=index.js.map