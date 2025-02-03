/**
 * Module dependencies
 * @public
 */

const { Socket } = require("net");
const { HostNotFoundError } = require("../errors");

/**
 * Module constant variables
 * @private
 */
const timeout = 400;
const Statuses = Object.freeze({
    0: "IN USE",
    1: "NOT IN USE",
});

/**
 *
 * @param {string} host
 * @param {number} port
 * @returns {Promise<string>}
 * @private
 */
const connect = async (host, port) => {
    // create new Socket instance
    const socket = new Socket();

    // returning statuses extends of socket event
    return new Promise((resolve) => {
        socket.on("connect", () => {
            resolve(Statuses[0]);
            socket.destroy();
        });

        socket.setTimeout(timeout);
        socket.on("timeout", () => {
            resolve(Statuses[1]);
            socket.destroy();
        });

        socket.on("error", (err) => {
            if (err.code === "ENOTFOUND") {
                throw new HostNotFoundError("Host was not found.");
            }
            resolve(Statuses[1]);
        });

        socket.on("close", () => {
            resolve(Statuses[1]);
            socket.destroy();
        });

        socket.connect(port, host);
    });
};

/**
 * Module exports.
 * @exports connect
 */
module.exports = {
    connect: connect,
};
