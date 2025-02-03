"use strict";

/**
 * Module dependencies
 * @private
 */

const connect = require("./socket");

/**
 * Validating host, port and options.
 * Null options is valid (default options will be used).
 * @todo Validate option params.
 * @param {string} host
 * @param {string | number | Array<number>} port
 * @param {{
 *      recursive?: boolean, // default: false
 *      fs?: boolean,
 *      filename?: string,
 *  }} [options]
 * @returns {[res: boolean, message: string]}
 * @private
 */
function validateParams(host, port, _options) {
    // validating host param
    if (host === null) {
        return [false, "Argument 'host' can not be null value."];
    } else if (typeof host !== "string") {
        return [false, "Argument 'host' must be a string."];
    } else if (host.includes("/")) {
        return [false, "Invalid 'host' string."];
    }

    // validate port param
    if (!port) {
        return [false, "Argument 'port' can not be null."];
    }

    // validate number value of 'port' argument
    if (typeof port === "number") {
        if (!(0 <= port && port <= 65535)) {
            return [false, `Invalid 'port' value: ${port}. Range: [0, 65535].`];
        }
    }

    // validate Array of ports
    if (Array.isArray(port)) {
        if (!port.every((p) => typeof p === "number")) {
            return [false, "Invalid Array of 'port' argument."];
        }
    }

    // validate string 'port' argument (for setting range of ports)
    if (typeof port === "string") {
        if (port.split(":").length !== 2) {
            return [false, "Argument 'port' string must have only one range."];
        }

        let [startPort, endPort] = port.split(":");

        // transforming string params to number
        startPort = parseInt(startPort);
        endPort = parseInt(endPort);

        // just checking number values
        if (isNaN(startPort) || isNaN(endPort)) {
            return [false, `Invalid string 'port' argument: ${port}`];
        } else if (
            startPort < 0 ||
            startPort > 65535 ||
            endPort < 0 ||
            endPort > 65535
        ) {
            return [
                false,
                `Invalid value for a single port: ${port}. Max: 65535, min: 0`,
            ];
        } else if (startPort > endPort) {
            return [
                false,
                `Start port (${startPort}) must be less than end port (${endPort})`,
            ];
        }
    }

    // validate options params
    // todo

    // Success validation return
    return [true, null];
}

/**
 * The function is designed to search for ports used on the host
 * synchronously.
 *
 * Usefull for Node version >= 8.x
 *
 * @param {string} host
 * Hostname must be a domain name or IP address, like as:
 *
 * - "github.com",
 * - "127.0.0.1".
 *
 * @param {number | Array<number>} port
 * Valid ports examples - 8080.
 *
 * @param {string} status
 * Value extends of special functions.
 * @throws ArgumentsError
 * @returns {Promise<object>}
 * @private
 */
const checkPortsStatus = async (host, port, status) => {
    // set default schema
    let portAndStatus = {
        STATUS: null,
        PORT: null,
    };

    // try to connect
    let resultStatus = await connect.connect(host, port);

    // setting status, if match with 'status' param
    if (resultStatus === status) {
        portAndStatus.STATUS = resultStatus;
        portAndStatus.PORT = port;
    }

    return portAndStatus;
};

/**
 * Module exports
 * @exports validateParams
 * @exports checkPortsStatus
 */
module.exports = {
    validateParams: validateParams,
    checkPortsStatus: checkPortsStatus,
};
