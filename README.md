# mapkit-vue
[![Coverage Status](https://coveralls.io/repos/github/thomas-alrek/mapkit-vue/badge.svg?branch=master)](https://coveralls.io/github/thomas-alrek/mapkit-vue?branch=master)
[![Latest Stable Version](https://img.shields.io/npm/v/mapkit-vue.svg)](https://www.npmjs.com/package/mapkit-vue)

> A Vue library for Apple Mapkit

This project is under active development and is not yet ready for production

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## Installation

``` bash
npm install -S mapkit-vue
```

## Usage

Please follow the official [MapkitJS documentation](https://developer.apple.com/maps/mapkitjs/) to setup your API credentials.

``` js
import Vue from 'vue';
import MapkitVue from 'mapkit-vue';

Vue.use(MapkitVue, {
  authorizationCallback (done) {
    done('your-jwt-here')
  }
});
```

## Documentation

Make sure all dependencies are installed:
``` bash
npm install
```

To run a documentation dev server:
``` bash
npm run docs:dev
```

To build documentation:
``` bash
npm run docs:build
```

To publish documentation to `gh-pages`:
``` bash
npm run docs:publish
```

## Development

A sandboxed dev environment is provided by [vue-play](https://github.com/vue-play/vue-play). Changes made to the component files will appear in real time in the sandbox.

To begin development, run:

``` bash
npm install
npm run dev
```

then navigate to `http://localhost:5000`

To modify and add sandbox scenarios, edit `play/index.js`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.