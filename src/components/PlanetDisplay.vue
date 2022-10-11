<script>
export default {
  data() {
    return {
      overviewCopy: true, // load overview copy on load
      internalCopy: false,
      surfaceCopy: false,
      planetInfo: ["overview", "structure", "geology"],
      imgLayer: ["planet", "internal", "geology"], // diff names for img sources
      num: 0, // overview is the default planet layer view
    };
  },

  props: {
    planet: {
      type: Object,
      required: true,
    },
    // accent color
    pColor: {
      type: String,
      required: true,
    },
  },

  methods: {
    setPlanetView: function (which) {
      this.num = which;
    },
  },

  computed: {
    imageUrl() {
      // this is going to need more logic to show planet layer
      return new URL(
        `${this.planet.images[this.imgLayer[this.num]]}`,
        import.meta.url
      ).href;
    },

    paragraphCopy() {
      return this.planet[this.planetInfo[this.num]].content;
    },

    sourceLink() {
      return this.planet[this.planetInfo[this.num]].source;
    },
  },

  watch: {
    // reset planet info to 'overview' when changing planets; no user story
    //  given here, so this seems the most consistant i think
    planet() {
      this.num = 0;
    },
  },
};
</script>

<template>
  <div class="img-container">
    <img class="planet-img" :src="imageUrl" />
  </div>

  <h1 class="page-title header-1">{{ planet.name }}</h1>

  <!-- only one child will be displayed at a time -->
  <div class="layer-info-container">
    <p class="para-p">
      {{ paragraphCopy }}
    </p>

    <div class="source">
      Source :
      <a :href="sourceLink" target="_blank" rel="noopener noreferrer"
        >Wikipedia</a
      >
    </div>
  </div>

  <!-- buttons to select information layer -->
  <div class="fact-menu">
    <button class="button-itself" @click="setPlanetView(0)">
      <span class="button-number">01</span
      ><span class="button-text"> Overview</span>
    </button>
    <button class="button-itself" @click="setPlanetView(1)">
      <span class="button-number">02</span>
      <span class="button-text">Internal Structure</span>
    </button>
    <button class="button-itself" @click="setPlanetView(2)">
      <span class="button-number">03</span
      ><span class="button-text">Surface Geology</span>
    </button>
  </div>

  <!-- fact boxes -->
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
.planet-img {
  height: 15rem;
  width: 15rem;
}

.layer-info-container {
  min-height: 10rem;
}

.fact-menu {
  display: flex;
  flex-direction: column;
  max-width: 50%; // change me
  margin: 2rem 0; // change me

  .button-itself {
    margin-bottom: 1.14rem;
    padding: 12px 0 11px 0;
    background-color: $blackish;
  }

  .button-number {
    color: $white;
    letter-spacing: 2.5px;
    margin: 0 2rem;
    opacity: 0.5;
  }

  .button-text {
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: $white;
  }
}

.number-facts-container > div {
  margin: 1rem 0;
}
</style>
