const paramCase = require('param-case');

const DEFAULTS = {
    cache: false,
    get document () { return window.document },
}

/**
 * Creates a DOM querying proxy
 * @param {DEFAULTS} options - Options for the proxy
 * @param {boolean} options.cache - True if elements should be cached when requested for the first time. Be careful, the cache won't be updated if elements are added to the DOM later
 * @param {Document} options.document - Which Document object should be used. Defaults to windows.document, but you shouldn't need to change this
 * @returns {{class: Object.<string, HTMLElement[]>, id: Object.<string, HTMLElement>, name: Object.<string, HTMLElement[]>, tag: Object.<string, HTMLElement[]>}}
 */
module.exports = function(options = {}) {

    const {cache, document} = Object.assign(DEFAULTS, options);

    /**
     * Creates a simple getter proxy
     * @param {((string) => (HTMLElement|HTMLCollection)} queryFunction 
     */
    function createProxy(queryFunction) {
        return new Proxy(Object.create(null), {
            get(obj, key) {
                // Don't handle symbols / number keys
                if (typeof key !== 'string') return null;

                // Transform key using param-case
                key = paramCase(key);

                // Try to retrieve from cache
                if (cache && key in obj) return obj[key];

                let value = queryFunction.call(document, key);
                if (value instanceof HTMLCollection) value = Array.from(value);

                // Store in cache
                if (cache) obj[key] = value;
                return value;
            },
            has(obj, key) {
                return !!this.get(obj, key);
            },
        });
    }

    return {
        class: createProxy(document.getElementsByClassName),
        id:    createProxy(document.getElementById),
        name:  createProxy(document.getElementsByName),
        tag:   createProxy(document.getElementsByTagName),
    }

}

module.exports.default = module.exports;
