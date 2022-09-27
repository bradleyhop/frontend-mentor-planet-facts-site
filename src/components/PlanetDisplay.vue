<script>
export default {
  data() {
    return {
      overviewCopy: true, // load overview copy on load
      internalCopy: false,
      surfaceCopy: false,
    };
  },

  props: {
    planet: Object,
  },
};
</script>

<template>
  <h1 class="page-title header-1">{{ planet.name }}</h1>

  <!-- Overview Content Start -->

  <div class="overview-container">
    <p class="overview para-p">
      {{ planet.overview.content }}
    </p>

    <div class="source">
      Source :
      <a
        :href="planet.overview.source"
        target="_blank"
        rel="noopener noreferrer"
        >Wikipedia</a
      >
    </div>
  </div>

  <!-- Overview Content End -->

  <!-- Internal Structure Content Start -->

  <div class="internal-container">
    <p class="internal-content para-p">
      {{ planet.structure.content }}
    </p>

    <div class="internal-source">
      Source :
      <a
        :href="planet.structure.source"
        target="_blank"
        rel="noopener noreferrer"
        >Wikipedia</a
      >
    </div>
  </div>

  <!-- Internal Structure Content End -->

  <!-- Surface Geology Content Start -->

  <div class="surface-container">
    <p class="surface-content para-p">
      {{ planet.geology.content }}
    </p>

    <div class="surface-source">
      Source :
      <a :href="planet.geology.source" target="_blank" rel="noopener noreferrer"
        >Wikipedia</a
      >
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
      <div class="number-fact">{{ planet.rotation }}</div>
    </div>

    <div class="revolution-container">
      <div class="ti-fact-number">Revolution Time</div>
      <div class="number-fact">{{ planet.revolution }}</div>
    </div>

    <div class="radius-container">
      <div class="title-fact-number">Radius</div>
      <div class="number-fact">{{ planet.radius }}</div>
    </div>

    <div class="temp-container">
      <div class="title-fact-number">Average Temp.</div>
      <div class="number-fact">{{ planet.temperature }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.page-title {
  color: $earth-purple;
}
</style>
