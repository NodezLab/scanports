/**
 * Module dependencies
 * @private
 */

const { ArgumentsError } = require("./errors");
const { HostNotFoundError } = require("./errors");

/**
 * Module exports
 * @exports ArgumentsError
 * @exports HostNotFoundError
 */
module.exports = {
    ArgumentsError: ArgumentsError,
    HostNotFoundError: HostNotFoundError,
};
