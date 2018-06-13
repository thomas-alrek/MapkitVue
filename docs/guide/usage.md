## Usage

``` js
import Vue from 'vue';
import MapkitVue from 'mapkit-vue';

Vue.use(MapkitVue, {
  authorizationCallback (done) {
    done('your-jwt-here')
  }
});
```