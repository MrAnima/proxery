# **proxery**

[![GitHub license](https://img.shields.io/github/license/MrAnima/proxery.svg)](https://github.com/MrAnima/proxery)
![David](https://img.shields.io/david/MrAnima/proxery.svg)

> Proxery is a very simple library for the browser that allows you to very easily get elements from the DOM using proxies. Given the following HTML:
> ```html
> <form>
>   <input type="text" id="name">
>   <input type="number" id="age">
> <form>
> ```
> You can get references to the `<input>` fields using:
> ```javascript
> let { name, age } = proxery.id;
> ```
> Have fun !

## Setup

### Download
`npm install proxery`

### Import / Require
```javascript
// Create your proxery object with default options
const proxery = require('proxery')();

// Or specify them. These are the default values
const proxery = require('proxery')({
    cache: false, // Should results be cached (the same query won't be done twice)
    document: window.document // Which "document" object to use. Can be changed for testing purposes
});
```

## Usage

Once you have your **proxery** object, you can use 4 different proxies to do various queries:

 * `proxery.class.*`
 * `proxery.id.*`
 * `proxery.name.*`
 * `proxery.tag.*`

They all return a list of `HTMLElement` except for _id_ which obviously returns a single element.
Destructuring assignment is particularly useful here, especially with _proxery.id_:

### Examples
```javascript
// Classes
let buttons = proxery.class.btn;

// ID
let { id1, id2, id3 } = proxery.id;

// Names
// Because it returns an array, we destructure it
let [ firstEmailElement ] = proxery.name.email;

// Tag names
proxery.tag.form.forEach(form => form.submit());
```

### Browser
This library is obviously made for the browser. You can bundle it using [browserify](http://browserify.org/), _AMD_ or simply use it by including `dist/proxery.min.js` in a webpage, which will expose a global variable. You may also use the [UNPKG CDN](https://unpkg.com/proxery/dist/proxery.min.js)

## Tests

Tests are created with [mocha](https://github.com/mochajs/mocha) and asserted with [chai`.expect`](https://github.com/chaijs/chai)

You can run the suite using
```bash
npm test
```

## License

**proxery** is licensed under the very permissive [MIT License](https://tldrlegal.com/license/mit-license). You may use it for commercial projects.