import annotationProps from './annotationProps'

export default {
  ...annotationProps,

  url: {
    type: Object,
    default: () => {}
  }
}
