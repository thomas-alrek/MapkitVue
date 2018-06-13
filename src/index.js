import { setMapOptions } from './Mapkit.js'
import registerComponents from './components'

export default {
  install (Vue, options = {}) {
    const prefix = options.prefix || 'mk'
    setMapOptions(options)
    registerComponents(Vue, prefix)
  }
}
