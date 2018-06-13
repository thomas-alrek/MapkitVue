<template>
  <div ref="mapkitMap" class="mk-map">
    <div><slot /></div>
  </div>
</template>

<script>
  import createMapkit, { loadMapkit } from '../Mapkit.js'
  import { clearInterval } from 'timers';

  let resolveReady

  function featureEnum (type, defaultType = 'adaptive') {
    switch (type.toLowerCase()) {
      case 'hidden':
      case 'visible':
        break
      default:
        type = defaultType
        break
    }

    return type
  }

  export default {
    name: 'Mapkit',

    data () {
      return {
        deferredReadyPromise: new Promise(resolve => {
          resolveReady = resolve
        }),
        deferredMapKitPromise: loadMapkit(),
        items: []
      }
    },

    props: {
      options: {
        type: Object,
        default: () => {}
      },

      mapType: {
        type: String,
        default: 'standard'
      },

      padding: {
        type: Object,
        default: () => ({ top: 0, right: 0, bottom: 0, left: 0 })
      },

      showsCompass: {
        type: String,
        default: 'adaptive'
      },

      showsMapTypeControl: {
        type: Boolean,
        default: true
      },

      showsZoomControl: {
        type: Boolean,
        default: true
      },

      showsUserLocationControl: {
        type: Boolean,
        default: false
      },

      showsPointsOfInterest: {
        type: Boolean,
        default: false
      },

      showsScale: {
        type: String,
        default: 'adaptive'
      },

      tintColor: {
        type: String,
        default: ''
      }
    },

    computed: {
      style () {
        return `width: 100%; height: 100%`
      },

      width () {
        return this.$parent.clientWidth
      },

      height () {
        return this.$parent.clientHeight
      }
    },

    methods: {
      async init () {
        this.$mapkit = await this.deferredMapKitPromise
        this.$map = await createMapkit(this.$refs.mapkitMap)
        resolveReady(this.$map)
        this.setOptions(this.options)
        this.setMapType(this.mapType)
        this.setPadding(this.padding)
        this.setShowsCompass(this.showsCompass)
        this.setShowsMapTypeControl(this.showsMapTypeControl)
        this.setShowsZoomControl(this.showsZoomControl)
        this.setShowsUserLocationControl(this.showsMapTypeControl)
        this.setShowsPointsOfInterest(this.showsPointsOfInterest)
        this.setShowsScale(this.showsScale)
        this.setTintColor(this.tintColor)
      },

      async addItem (item) {
        await this.deferredReadyPromise

        if (!this.items.includes(item)) {
          this.items.push(item)
        }

        this.$map.showItems([ ...this.items ])
      },

      async removeItem (item) {
        await this.deferredReadyPromise

        if (this.items.includes(item)) {
          this.items = this.items.filter(i => i !== item)
        }

        this.$map.showItems([ ...this.items ])
      },

      setOptions (options = {}) {
        options = { ...this.options, ...options }
        Object.keys(options).forEach(key => {
          this[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](options[key])
        })
      },

      setMapType (mapType = 'standard') {
        switch (mapType.toLowerCase()) {
          case 'satellite':
          case 'hybrid':
            break
          default:
            mapType = 'standard'
        }

        this.$map.mapType = mapType        
      },

      setPadding (padding = {}) {
        const { top, right, bottom, left } = padding = {
          ...{ top: 0, right: 0, bottom: 0, left: 0 },
          ...padding
        }

        this.$map.padding = new this.$mapkit.Padding(top, right, bottom, left)
      },

      setShowsCompass (showsCompass = 'adaptive') {
        this.$map.showsCompass = featureEnum(showsCompass)
      },

      setShowsMapTypeControl (showsMapTypeControl = true) {
        this.$map.showsMapTypeControl = showsMapTypeControl
      },

      setShowsZoomControl (showsZoomControl = true) {
        this.$map.showsZoomControl = showsZoomControl
      },

      setShowsUserLocationControl (showsUserLocationControl = false) {
        this.$map.showsUserLocationControl = showsUserLocationControl
      },

      setShowsPointsOfInterest (showsPointsOfInterest = false) {
        this.$map.showsPointsOfInterest = showsPointsOfInterest
      },

      setShowsScale (showsScale = 'adaptive') {
        this.$map.showsScale = featureEnum(showsScale)
      },

      setTintColor (tintColor = '') {
        this.$map.tintColor = tintColor
      }
    },

    watch: {
      options: 'setOptions',
      mapType: 'setMapType',
      padding: 'setPadding',
      showsCompass: 'setShowsCompass',
      showsMapTypeControl: 'setShowsMapTypeControl',
      showsZoomControl: 'setShowsZoomControl',
      showsUserLocationControl: 'setShowsUserLocationControl',
      showsPointsOfInterest: 'setShowsPointsOfInterest',
      showsScale: 'setShowsScale',
      tintColor: 'setTintColor'
    },

    beforeDestroy () {
      if (this.$map) {
        this.$map.destroy()
      }
    },

    mounted () {
      this.init()
    }
  }
</script>

<style scoped>
  .mk-map {
    width: 100%;
    height: 100%;
  }

  .mk-map > div {
    display: none;
  }
</style>