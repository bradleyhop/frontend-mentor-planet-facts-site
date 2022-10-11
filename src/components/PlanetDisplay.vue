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
    <p class="para-p para-structure">
      {{ paragraphCopy }}
    </p>

    <div class="source">
      Source :
      <a
        :href="sourceLink"
        target="_blank"
        rel="noopener noreferrer"
        class="wiki-text-link"
        >Wikipedia
        <span
          ><img
            src="@/assets/img/icon-source.svg"
            class="icon-img"
            alt="link to Wikipedia source article"
        /></span>
      </a>
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
    <div class="rotation-container grid-outline">
      <div class="title-fact header-4">Rotation Time</div>
      <div class="number-fact header-2">{{ planet.rotation }}</div>
    </div>

    <div class="revolution-container grid-outline">
      <div class="title-fact header-4">Revolution Time</div>
      <div class="number-fact header-2">{{ planet.revolution }}</div>
    </div>

    <div class="radius-container grid-outline">
      <div class="title-fact header-4">Radius</div>
      <div class="number-fact header-2">{{ planet.radius }}</div>
    </div>

    <div class="temp-container grid-outline">
      <div class="title-fact header-4">Average Temp.</div>
      <div class="number-fact header-2">{{ planet.temperature }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.planet-img {
  height: 15rem;
  width: 15rem;
}

.page-title {
  margin-bottom: 1.64rem;
  text-transform: uppercase;
}

.layer-info-container {
  min-height: 10rem;
}

.para-structure {
  margin-bottom: 1.71rem;
}

.source {
  font-family: $spartan-font;
  font-size: 1rem;
  line-height: 1.79rem;
  opacity: 0.5;

  .wiki-text-link {
    font-weight: 700;
    color: $white;
    text-decoration: underline;
  }

  .icon-img {
    height: 0.86rem;
    width: 0.86rem;
    margin-left: 0.57rem;
  }

  // taking liberty here; not specified but seems reasonable
  &:hover {
    opacity: 1;
  }
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

.number-facts-container {
  display: grid;
  column-gap: 2.14rem;
  grid-template-columns: repeat(4, 1fr);

  .grid-outline {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1.43rem 0 1.93rem 1.64rem;
  }

  .title-fact {
    text-transform: uppercase;
    opacity: 0.5;
  }

  .number-fact {
    text-transform: uppercase;
  }
}
</style>
