/**
 * Module dependencies
 * @private
 */
const { checkPortsStatus } = require("./checkPort");
const { validateParams } = require("./checkPort");

/**
 * Module exports
 * @exports checkPortsStatus
 * @exports validateParams
 */
module.exports = {
    checkPortsStatus: checkPortsStatus,
    validateParams: validateParams,
};
