"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = require("mongodb");
var MongoHelper = /** @class */ (function () {
    function MongoHelper() {
    }
    MongoHelper.getClient = function () {
        if (!MongoHelper.client) {
            MongoHelper.connect('mongodb://localhost:27017/test');
        }
        return MongoHelper.client;
    };
    MongoHelper.connect = function (url) {
        return new Promise(function (resolve, reject) {
            mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
                if (err) {
                    reject(err);
                }
                else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    };
    MongoHelper.prototype.disconnect = function () {
        MongoHelper.client.close();
    };
    return MongoHelper;
}());
exports.MongoHelper = MongoHelper;
//# sourceMappingURL=mongoHelper.js.map