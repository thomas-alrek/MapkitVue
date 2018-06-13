require('dotenv').config()
const Vue = require('vue')
const utils = require('../utils')
const MapkitVue = require('../../../src/')
const MKMap = require('../../../src/components/MKMap.vue')

Vue.use(MapkitVue, {
  authorizationCallback (done) {
    done(process.env.MAPKIT_JWT)
  }
})

describe('Map', () => {
  it('should mount successfully', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(MKMap),
      mounted () {
        const mapInstance = this.$children[0]
        expect(mapInstance._isMounted).toBe(true)
      }
    })

    return utils.expectToMatchSnapshot(vm)
  })
})
