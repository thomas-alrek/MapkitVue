import MKMap from './MKMap.vue'
import MKImageAnnotation from './MKImageAnnotation.vue'
import MKMarkerAnnotation from './MKMarkerAnnotation.vue'

function registerComponent (Vue, name, component, prefix = 'mk') {
  Vue.component(`${prefix ? `${prefix}-` : ''}${name}`, component)
}

export default function registerComponents (Vue, prefix = 'mk') {
  registerComponent(Vue, 'map', MKMap, prefix)
  registerComponent(Vue, 'image-annotation', MKImageAnnotation, prefix)
  registerComponent(Vue, 'marker-annotation', MKMarkerAnnotation, prefix)
}

export { default as MKMap } from './MKMap.vue'
export { default as MKImageAnnotation } from './MKImageAnnotation.vue'
export { default as MKMarkerAnnotation } from './MKMarkerAnnotation.vue'
