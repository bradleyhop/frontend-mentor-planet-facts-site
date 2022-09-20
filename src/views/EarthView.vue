<script>
export default {
  data() {
    return {
      overviewCopy: true, // load overview copy on load
      internalCopy: false,
      surfaceCopy: false,
    };
  },
};
</script>

<template>
  <h1 class="page-title header-1">Earth</h1>

  <!-- Overview Content Start -->

  <div class="overview-container">
    <p class="overview para-p">
      Third planet from the Sun and the only known planet to harbor life. About
      29.2% of Earth's surface is land with remaining 70.8% is covered with
      water. Earth's distance from the Sun, physical properties and geological
      history have allowed life to evolve and thrive.
    </p>

    <div class="source">
      Source : <a href="">Wikipedia</a>
      <!-- URL: https://en.wikipedia.org/wiki/Earth -->
    </div>
  </div>

  <!-- Overview Content End -->

  <!-- Internal Structure Content Start -->

  <div class="internal-container">
    <p class="internal-content para-p">
      Earth's interior, like that of the other terrestrial planets, is divided
      into layers by their chemical or physical (rheological) properties. The
      outer layer is a chemically distinct silicate solid crust, which is
      underlain by a highly viscous solid mantle.
    </p>

    <div class="internal-source">
      Source : <a href="">Wikipedia</a>
      <!-- URL: https://en.wikipedia.org/wiki/Earth#Internal_structure -->
    </div>
  </div>

  <!-- Internal Structure Content End -->

  <!-- Surface Geology Content Start -->

  <div class="surface-container">
    <p class="surface-content para-p">
      The total surface area of Earth is about 510 million km2. The continental
      crust consists of lower density material such as the igneous rocks granite
      and andesite. Less common is basalt, a denser volcanic rock that is the
      primary constituent of the ocean floors.
    </p>

    <div class="surface-source">
      Source : <a href="">Wikipedia</a>
      <!-- URL: https://en.wikipedia.org/wiki/Earth#Surface -->
    </div>
  </div>

  <!-- Surface Geology Content End -->

  <div class="fact-menu">
    <!-- dynamically set class here later -->
    <div class="button-container">
      <button class="button-active">
        <span class="button-number">01</span
        ><span class="button-text"> Overview</span>
      </button>
    </div>
    <div class="button-container">
      <button class="button-inactive">
        <span class="button-number">02</span>
        <span class="button-text">Internal Structure</span>
      </button>
    </div>
    <div class="button-container">
      <button class="button-inactive">
        <span class="button-number">03</span
        ><span class="button-text">Surface Geology</span>
      </button>
    </div>
  </div>

  <div class="number-facts-container">
    <div class="rotation-container">
      <div class="title-fact-number">Rotation Time</div>
      <div class="number-fact">0.99 Days</div>
    </div>

    <div class="revolution-container">
      <div class="ti-fact-number">Revolution Time</div>
      <div class="number-fact">365.26 Days</div>
    </div>

    <div class="radius-container">
      <div class="title-fact-number">Radius</div>
      <div class="number-fact">6,371 KM</div>
    </div>

    <div class="temp-container">
      <div class="title-fact-number">Average Temp.</div>
      <div class="number-fact">16°c</div>
    </div>
  </div>
</template>

<style lang="scss">
.page-title {
  color: $earth-purple;
}
</style>
