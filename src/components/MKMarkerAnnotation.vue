<template>
  <div style="display: none">
    <div ref="callout">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import props from '../utils/markerAnnoationProps.js'
  import findRootNode from '../utils/findRootNode.js'

  export default {
    name: 'MapkitMarkerAnnotation',

    data () {
      return {
        coordinates: null
      }
    },

    props,

    methods: {
      init () {
        if (this.$annotation && this.$parent.$map) {
          this.$parent.$map.removeAnnotations([this.$annotation])
        }

        this.coordinates = new this.$mapkit.Coordinate(this.latitude, this.longitude)

        const callout = {}
        const options = {
          color: this.color,
          title: this.title,
          subtitle: this.subtitle,
          selected: this.selected,
          glyphText: this.glyphText
        }

        if (this.callout) {
          if (typeof this.callout === 'function') {
            options.callout = this.callout(this)
          } else {
            const getSlotNode = () => this.$refs.callout
            switch (this.callout) {
              case 'content':
                callout.calloutContentForAnnotation = getSlotNode
                break
              case 'element':
                callout.calloutElementForAnnotation = getSlotNode
                break
              default:
                break          
            }
            options.callout = callout
          }
        }

        this.$annotation = new this.$mapkit.MarkerAnnotation(this.coordinates, options)

        this.$annotation.addEventListener('select', event => this.$emit('select', event))
        this.$annotation.addEventListener('deselect', event => this.$emit('deselect', event))
        this.$annotation.addEventListener('drag-start', event => this.$emit('dragstart', event))
        this.$annotation.addEventListener('dragging', event => this.$emit('dragging', event))
        this.$annotation.addEventListener('drag-end', event => this.$emit('dragend', event))

        this.$map.addItems([this.$annotation])
      },

      setColor (color) {
        this.$annotation.color = color
      },

      setTitle (title) {

        this.$annotation.title = title
      },

      setSubtitle (subtitle) {
        this.$annotation.subtitle = subtitle
      },

      setSelected (selected) {
        this.$annotation.selected = selected
      },

      setGlyphText (glyphText) {
        this.$annotation.glyphText = glyphText
      },

      setLatitude (latitude) {
        this.coordinates.latitude = latitude
      },

      setLongitude (longitude) {
        this.coordinates.longitude = longitude
      }
    },

    beforeDestroy () {
      if (this.$parent.$map) {
        this.$parent.$map.removeAnnotations([this.$annotation])
      }
    },

    watch: {
      color: 'setColor',
      title: 'setTitle',
      subtitle: 'setSubtitle',
      selected: 'setSelected',
      glyphText: 'setGlyphText',
      latitude: 'setLatitude',
      longitude: 'setLongitude',
      callout: 'init'
    },

    async mounted () {
      this.$parent = findRootNode(this)

      await this.$parent.deferredReadyPromise
      this.$mapkit = this.$parent.$mapkit
      this.$map = this.$parent.$map
      this.init()
    }
  }
</script>
