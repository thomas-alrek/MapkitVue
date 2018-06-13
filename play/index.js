import Vue from 'vue'
import MapkitVue from '../src'
import { play } from 'vue-play'

Vue.use(MapkitVue, {
  authorizationCallback (done) {
    done(process.env.MAPKIT_JWT)
  }
})

function mounted () {
  document.getElementById('app')
    .style.height = '100vh'
}

play('Mapkit')
  .add('Basic', {
    template: `<mk-map />`,
    mounted
  })
  .add('Customized', {
    template: `<mk-map mapType="hybrid" />`,
    mounted
  })
  .add('Marker Annotation', {
    template: `
    <mk-map>
      <mk-marker-annotation
        :latitude="60.3652817"
        :longitude="5.2890906"
      />
    </mk-map>
    `,
    mounted
  })
  .add('Advanced Marker Annotation', {
    template: `
    <mk-map>
      <mk-marker-annotation
        :latitude="60.3652817"
        :longitude="5.2890906"
        title="Title"
        subtitle="Subtitle"
        glyphText="A"
        color="#f00"
        :callout="true"
      />
    </mk-map>
    `,
    mounted
  })

