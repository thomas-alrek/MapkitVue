require('dotenv').config()
const Vue = require('vue')
const utils = require('../utils')
const MapkitVue = require('../../../src/')
const MKMarkerAnnotation = require('../../../src/components/MKMarkerAnnotation.vue')

Vue.use(MapkitVue, {
  authorizationCallback (done) {
    done(process.env.MAPKIT_JWT)
  }
})

describe('Map', () => {
  it('should mount successfully', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(MKMarkerAnnotation),
      mounted () {
        const markerAnnotationInstance = this.$children[0]
        expect(markerAnnotationInstance._isMounted).toBe(true)
      }
    })

    return utils.expectToMatchSnapshot(vm)
  })
})
