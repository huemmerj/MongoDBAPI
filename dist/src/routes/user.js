"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoHelper_1 = require("../mongo/mongoHelper");
var router = express.Router();
router.post('/', function (req, res) {
    var client = mongoHelper_1.MongoHelper.getClient();
    var testDB = client.db('test');
    testDB.collection('test').insertOne(req.body);
    res.status(200).json("hat gefunkt");
});
router.get('/', function (req, res) {
    res.status(200).json({ hallo: 'hallo' });
});
exports.default = router;
//# sourceMappingURL=user.js.map