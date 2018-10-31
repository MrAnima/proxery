/**
 * Turns a camelCased input string into a param-cased string
 * @param {string} input
 * @returns {string} Param-cased input
 */
module.exports = function(input) {
    // Split the input at each uppercase letter
    const words = input.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1);
    return words.map(word => word.toLowerCase()).join('-');
}
