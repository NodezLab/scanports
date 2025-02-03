/**
 * @module
 * Functions for public using.
 */
const { portsInUse } = require("./scanner");

/**
 * Public exports.
 * @exports portsInUse
 */
module.exports = {
    portsInUse: portsInUse,
};
