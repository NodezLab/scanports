/**
 * Error for unexpected arguments
 * @private
 */

class ArgumentsError extends Error {
    name = "ArgsError";
}

/**
 * Error throws, if 'host' was not found
 * @private
 */

class HostNotFoundError extends Error {
    name = "HostError";
}

/**
 * @exports ArgumentsError
 * @exports HostNotFoundError
 */
module.exports = {
    ArgumentsError: ArgumentsError,
    HostNotFoundError: HostNotFoundError,
};
