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
      // buttons to select planet view; need this to show active background
      buttons: [
        { name: "Overview", number: "01", fn: "setPlanetView(0)" },
        { name: "Internal Structure", number: "02", fn: "setPlanetView(1)" },
        { name: "Surface Geology", number: "03", fn: "setPlanetView(2)" },
      ],
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
      let imgLink;

      // surface geology image is overlayed on the Overview image
      if (this.num === 2) {
        imgLink = new URL(
          `${this.planet.images[this.imgLayer[0]]}`,
          import.meta.url
        ).href;
      } else {
        imgLink = new URL(
          `${this.planet.images[this.imgLayer[this.num]]}`,
          import.meta.url
        ).href;
      }

      return imgLink;
    },

    geologyImgUrl() {
      return new URL(`${this.planet.images[this.imgLayer[2]]}`, import.meta.url)
        .href;
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
  <div class="upper-container">
    <div class="img-container">
      <div class="center-planets">
        <img class="planet-img" :src="imageUrl" />
        <img v-if="num === 2" :src="geologyImgUrl" class="geology-image" />
      </div>
    </div>

    <div class="planet-content-container">
      <!-- only one child will be displayed at a time -->
      <div class="layer-info-container">
        <h1 class="page-title">{{ planet.name }}</h1>

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
        <button
          class="button-itself"
          :class="this.num === 0 ? 'activeButton' : ''"
          @click="setPlanetView(0)"
        >
          <span class="button-number">01</span>
          <span class="button-text">Overview</span>
        </button>
        <button
          class="button-itself"
          :class="this.num === 1 ? 'activeButton' : ''"
          @click="setPlanetView(1)"
        >
          <span class="button-number">02</span>
          <span class="button-text">Internal Structure</span>
        </button>
        <button
          class="button-itself"
          :class="this.num === 2 ? 'activeButton' : ''"
          @click="setPlanetView(2)"
        >
          <span class="button-number">03</span>
          <span class="button-text">Surface Geology</span>
        </button>
      </div>
    </div>
    <!-- .planet-content-container -->
  </div>
  <!-- .upper-container -->

  <!-- fact boxes -->
  <div class="number-facts-container">
    <div class="rotation-container grid-outline">
      <div class="title-fact">Rotation Time</div>
      <div class="number-fact">{{ planet.rotation }}</div>
    </div>

    <div class="revolution-container grid-outline">
      <div class="title-fact">Revolution Time</div>
      <div class="number-fact">{{ planet.revolution }}</div>
    </div>

    <div class="radius-container grid-outline">
      <div class="title-fact">Radius</div>
      <div class="number-fact">{{ planet.radius }}</div>
    </div>

    <div class="temp-container grid-outline">
      <div class="title-fact">Average Temp.</div>
      <div class="number-fact">{{ planet.temperature }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.upper-container {
  display: flex;

  @include tablet-breakpoint {
    flex-direction: column;
  }

  @include desktop-breakpoint {
    flex-direction: row;
  }

  .img-container {
    display: flex;
    flex-grow: 1;
    position: relative;
    min-height: 700px; // CHANGE ME!

    .center-planets {
      align-items: center;
      display: flex;
      justify-content: center;
      margin: auto;
      position: relative;

      .planet-img {
        height: auto;
        max-width: 100%;
      }

      .geology-image {
        height: auto;
        max-width: 11.64rem; // set to non%
        position: absolute;
        top: 66%;
      }
    }
  }

  .planet-content-container {
    flex: 0 0 25rem; // sets width and doesn't grow nor shrink
    display: flex;
    justify-content: center;

    @include tablet-breakpoint {
      flex-direction: row;
    }

    @include desktop-breakpoint {
      flex-direction: column;
    }

    .page-title {
      margin-bottom: 1.64rem;
      text-transform: uppercase;
      @include header-1;
    }

    .layer-info-container {
      min-height: 10rem;

      @include tablet-breakpoint {
        width: 50%;
      }

      @include desktop-breakpoint {
        width: 100%;
      }
    }

    .para-structure {
      height: 10.71rem; // must be set to keep all elements in parent constant
      margin-bottom: 1.71rem;
    }

    .source {
      font-family: $spartan-font;
      font-size: 1rem;
      line-height: 1.79rem;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 2.79rem;

      .wiki-text-link {
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        text-decoration: underline;
      }

      .icon-img {
        height: 0.86rem;
        width: 0.86rem;
        margin-left: 0.57rem;
      }
    }
  }

  .fact-menu {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.14rem;

    @include tablet-breakpoint {
      width: 50%;
      align-items: end;
      justify-content: center;
    }

    @include desktop-breakpoint {
      width: 100%;
    }

    .button-itself {
      margin-bottom: 1.14rem;
      padding: 12px 0 11px 0;
      background-color: rgba(7, 7, 36, 0.2);

      &:hover {
        background-color: rgba(216, 216, 216, 0.2);
        border: 1px solid rgba(216, 216, 216, 0); // to blend in with background
      }

      @include tablet-breakpoint {
        width: 80%;
      }

      @include desktop-breakpoint {
        width: 100%;
      }
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

    .activeButton {
      background-color: v-bind(pColor);
      border: 1px solid v-bind(pColor);

      &:hover {
        background-color: v-bind(pColor);
      }
    }
  }
}

.number-facts-container {
  display: grid;
  column-gap: 2.14rem;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 2rem;

  .grid-outline {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1.43rem 0 1.93rem 1.64rem;
  }

  .title-fact {
    text-transform: uppercase;
    opacity: 0.5;
    @include header-4;
  }

  .number-fact {
    text-transform: uppercase;
    @include header-2;

    @include tablet-breakpoint {
      font-size: 1.71rem;
      line-height: 2.21rem;
    }

    @include desktop-breakpoint {
      font-size: 2.86rem;
      line-height: 3.7rem;
    }
  }
}
</style>
