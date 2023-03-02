<template lang="pug">
b-row.main-body
    b-col.p-5.bg-light(cols='12')
      div.row
        div(class='col-md-8')
          div#finalSVG
        div(class='col-md-2')
          div#speedometerSVG
</template>

<script>
export default {
  name: 'Scadavis',
  mounted () {
    const speedometerSvg = require('../static/svg/speedometer.svg')
    const finalSvg = require('../static/svg/final.svg')

    // eslint-disable-next-line new-cap
    const svg1 = new scadavis({
      container: 'speedometerSVG',
      svgurl: speedometerSvg
    })

    svg1.setValue('TAG1', 0)

    setInterval(function () {
      let v = Math.random() * 10 - 2.5 * svg1.getValue('TAG1') / 60 + svg1.getValue('TAG1')

      if (v < 0) { v = 0 }
      if (v > 120) { v = 120 }

      svg1.setValue('TAG1', v)
    }, 1000)

    // eslint-disable-next-line new-cap
    const svg2 = new scadavis({
      container: 'finalSVG',
      svgurl: finalSvg,
      iframeparams: 'frameborder="0" height="400" width="690"'
    })
    svg2.zoomTo(0.5)

    svg2.setValue('rojo', 0)
    svg2.setValue('verde', 200)

    setInterval(function () {
      const rojo = svg2.getValue('rojo')
      const verde = svg2.getValue('verde')

      if (rojo === 0 && verde === 200) {
        svg2.setValue('rojo', 200)
        svg2.setValue('verde', 0)
      } else if (rojo === 200 && verde === 0) {
        svg2.setValue('rojo', 0)
        svg2.setValue('verde', 0)
      } else {
        svg2.setValue('rojo', 0)
        svg2.setValue('verde', 200)
      }
    }, 2000)
  }
}
</script>
