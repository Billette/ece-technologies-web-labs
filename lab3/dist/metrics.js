"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var leveldb_1 = require("./leveldb");
var level_ws_1 = __importDefault(require("level-ws"));
var Metric = /** @class */ (function () {
    function Metric(ts, v) {
        this.timestamp = ts;
        this.value = v;
    }
    return Metric;
}());
exports.Metric = Metric;
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(dbPath) {
        this.db = leveldb_1.LevelDB.open(dbPath);
    }
    MetricsHandler.prototype.save = function (key, metrics, callback) {
        var stream = level_ws_1.default(this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        metrics.forEach(function (m) {
            stream.write({ key: "metric:" + key + ":" + m.timestamp, value: m.value });
        });
        stream.end();
    };
    MetricsHandler.prototype.getAll = function (callback) {
        var metrics = [];
        var rs = this.db.createReadStream()
            .on('data', function (data) {
            console.log(data.key, '=', data.value);
            var timestamp = data.key.split(':')[2];
            var metric = new Metric(timestamp, data.value);
            metrics.push(metric);
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(err, null);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            callback(null, metrics);
        });
    };
    MetricsHandler.prototype.getOne = function (key, callback) {
        var metrics = [];
        var rs = this.db.createReadStream()
            .on('data', function (data) {
            //console.log("key :", data.key)
            var tmp = data.key.split(':')[1];
            //console.log("test :", tmp)
            //console.log("key parameters :", key)
            if (tmp === key) {
                console.log(data.key, '=', data.value);
                var timestamp = data.key.split(":")[2];
                var metric = new Metric(timestamp, data.value);
                metrics.push(metric);
            }
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(err, null);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            callback(null, metrics);
        });
    };
    MetricsHandler.prototype.deleteOne = function (key, callback) {
        var _this = this;
        var dataSuppressed = [];
        var rs = this.db.createReadStream()
            .on('data', function (data) {
            var datakey = data.key;
            var userkey = data.key.split(":")[1];
            if (key === userkey) {
                var timestamp = data.key.split(":")[2];
                var metric = new Metric(timestamp, data.value);
                dataSuppressed.push(metric);
                _this.db.del(datakey);
            }
        })
            .on('err', function (err) {
            callback(err, key);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            console.log(dataSuppressed);
            callback(null, dataSuppressed);
        });
    };
    MetricsHandler.prototype.deleteAll = function (callback) {
        var _this = this;
        var dataSuppressed = [];
        var rs = this.db.createReadStream()
            .on('data', function (data) {
            var datakey = data.key;
            var userkey = data.key.split(":")[1];
            var timestamp = data.key.split(":")[2];
            var metric = new Metric(timestamp, data.value);
            dataSuppressed.push(metric);
            _this.db.del(datakey);
        })
            .on('err', function (err) {
            callback(err, null);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            console.log(dataSuppressed);
            callback(null, dataSuppressed);
        });
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
