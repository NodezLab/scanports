/**
 * Module dependencies
 * @private
 */
const { ArgumentsError } = require("../errors");
const { validateParams, checkPortsStatus } = require("../common");

/**
 * Module variables
 * @private
 *
 * Import types for TypeScript.
 * @typedef {import("../../types/scanner/scanner.d.ts") } Options
 * @see {@link ../../types/scanner/scanner.d.ts}
 */

/**
 * Default options for portsInUse, if function got an undefined options.
 * @type {Options}
 * @property { "json" | "table" } output
 * @private
 */
const defaultOptions = {
    output: "json",
};

/**
 *
 * @param {*} host
 * Hostname must be a domain name or IP address, like as:
 *
 * - "github.com",
 * - "127.0.0.1".
 *
 * @param {*} port
 * Valid ports examples:
 * - 8080;
 * - [8080, 3000];
 * - "8080:8085"
 *
 * @param {{
 *   output?: string,
 * } | undefined} [options]
 * @public
 */
const portsInUse = async (host, port, options) => {
    let startTime = performance.now();
    const inUse = [];

    // validating args by validateParams function
    // destructure array
    const [res, message] = validateParams(host, port, options);

    // if validation was failed throws args error
    if (!res) {
        throw new ArgumentsError(message);
    }

    if (typeof options === "undefined") {
        options = defaultOptions;
    }

    process.stdout.write("Start scanning...\n");

    if (typeof port === "number") {
        const result = await checkPortsStatus(host, port, "IN USE");
        if (result.STATUS === "IN USE") {
            inUse.push(result);
        }
    }

    if (typeof port === "string") {
        let [startPort, endPort] = port.split(":");
        startPort = parseInt(startPort);
        endPort = parseInt(endPort);

        for (let i = startPort; i <= endPort; i++) {
            process.stdout.write(`Scanning ${i}`);
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            const result = await checkPortsStatus(host, i, "IN USE");
            if (result.STATUS === "IN USE") {
                inUse.push(result);
            }
        }
    }

    if (Array.isArray(port)) {
        for (let i = 0; i < port.length; i++) {
            process.stdout.write(`Scanning ${i}`);
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            const result = await checkPortsStatus(host, port[i], "IN USE");
            if (result.STATUS === "IN USE") {
                inUse.push(result);
            }
        }
    }

    let endTime = performance.now();

    // output extends of options.output (default: 'json')
    if (options.output === "table") {
        console.table(inUse);
    } else if (options.output === "json") {
        process.stdout.write(`${JSON.stringify(inUse, null, 2)}\n`);
    }

    process.stdout.write(
        `Execution time: ${(endTime.toFixed() - startTime.toFixed()) / 1000} s.\n`,
    );
};

/**
 * Module exports
 * @exports portsInUse
 */
module.exports = {
    portsInUse: portsInUse,
};
