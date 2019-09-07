const Logger = function () {};
const moment = require('moment')
const date = moment().format("YYYY-MM-DDTHH:mm:ss.SSS")

Logger.prototype.info = function (logText) {
    console.log(`[${date}][info]${logText}`);
};

Logger.prototype.debug = function (logText) {
    console.log(`[${date}][debug]${logText}`);
};

Logger.prototype.error = function (logText) {
    console.log(`[${date}][error]${logText}`);
};

module.exports = new Logger();