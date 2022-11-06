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
    setPlanetView: function (whichOne) {
      this.num = whichOne;
    },
  },

  computed: {
    imageUrl() {
      let imgLink;

      // surface geology image is overlayed on the Overview image
      if (this.num === 2) {
        imgLink = this.planet.images[this.imgLayer[0]];
      } else {
        imgLink = this.planet.images[this.imgLayer[this.num]];
      }

      return imgLink;
    },

    geologyImgUrl() {
      // called and displayed only when the geology view is chosen
      return this.planet.images[this.imgLayer[2]];
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
  <div class="mobile-layer-menu">
    <button
      class="mobile-button"
      :class="this.num === 0 ? 'mobile-active-button' : ''"
      @click="setPlanetView(0)"
    >
      <span class="button-text">Overview</span>
    </button>
    <button
      class="mobile-button"
      :class="this.num === 1 ? 'mobile-active-button' : ''"
      @click="setPlanetView(1)"
    >
      <span class="button-text">Structure</span>
    </button>
    <button
      class="mobile-button"
      :class="this.num === 2 ? 'mobile-active-button' : ''"
      @click="setPlanetView(2)"
    >
      <span class="button-text">Surface</span>
    </button>
  </div>
  <!-- .mobile-layer-menu -->

  <div class="device-widths">
    <div class="upper-container">
      <!-- planet layer info buttons viewable only on mobile -->

      <div class="img-container">
        <div class="center-planets">
          <img class="planet-img" :src="imageUrl" />
          <img v-if="num === 2" :src="geologyImgUrl" class="geology-img" />
        </div>
      </div>

      <div class="planet-content-container">
        <!-- only one child will be displayed at a time -->
        <div class="layer-info-container">
          <h1 class="page-title">{{ planet.name }}</h1>

          <p class="para-structure">
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

        <!-- visible only on tablet larger devices; buttons to select information layer -->
        <div class="fact-menu">
          <button
            class="button-itself"
            :class="this.num === 0 ? 'active-button' : ''"
            @click="setPlanetView(0)"
          >
            <span class="button-number">01</span>
            <span class="button-text">Overview</span>
          </button>
          <button
            class="button-itself"
            :class="this.num === 1 ? 'active-button' : ''"
            @click="setPlanetView(1)"
          >
            <span class="button-number">02</span>
            <span class="button-text">Internal Structure</span>
          </button>
          <button
            class="button-itself"
            :class="this.num === 2 ? 'active-button' : ''"
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

      <div class="grid-outline">
        <div class="title-fact">Average Temp.</div>
        <div class="number-fact">{{ planet.temperature }}</div>
      </div>
    </div>
    <!-- .fact-boxes -->
  </div>
  <!-- .device-widths -->
</template>

<style lang="scss">
.mobile-layer-menu {
  display: inline-flex;
  justify-content: space-evenly;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  width: 100vw;

  @include tablet-breakpoint {
    display: none; // hide when not mobile view
  }

  .mobile-button {
    appearance: none;
    background-color: rgba(7, 7, 36, 0.2);
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-family: $spartan-font;
    font-size: 0.64rem;
    letter-spacing: 1.93px;
    line-height: 0.71rem;
    text-transform: uppercase;
    padding: 1.43rem 0 1.21rem 0; // L&R 'padding' set by flex
  }

  .mobile-active-button {
    color: $white;
    border-bottom: 4px solid v-bind(pColor);
    padding-bottom: 0.86rem;
    transition: 300ms ease;
  }
}

.upper-container {
  display: flex;
  flex-direction: column;

  @include desktop-breakpoint {
    flex-direction: row;
  }

  .img-container {
    display: flex;
    flex-grow: 1;
    position: relative;
    min-height: 25rem;

    @include tablet-breakpoint {
      min-height: 35rem;
    }

    @include desktop-breakpoint {
      min-height: 50rem;
    }

    .center-planets {
      align-items: center;
      display: flex;
      justify-content: center;
      margin: auto;
      position: relative;

      .planet-img {
        height: auto;
        max-width: 40%;

        @include tablet-breakpoint {
          max-width: 65%;
        }

        @include desktop-breakpoint {
          max-width: 100%;
        }
      }

      .geology-img {
        height: auto;
        max-width: 7rem; // making a guess here; nothing on design doc
        position: absolute;
        top: 66%;

        @include tablet-breakpoint {
          max-width: 9rem;
        }

        @include desktop-breakpoint {
          max-width: 11.64rem; // set to not a %
        }
      }
    }
  }

  .planet-content-container {
    display: flex;
    justify-content: center;

    @include tablet-breakpoint {
      flex-direction: row;
      flex: 0 0 19rem;
    }

    @include desktop-breakpoint {
      flex-direction: column;
      flex: 0 0 25rem; // sets width and doesn't grow nor shrink
    }

    .page-title {
      @include header-1;
      margin-bottom: 1.71rem;
      font-size: 2.86rem;
      line-height: 3.71rem;
      text-align: center;

      @include tablet-breakpoint {
        font-size: 3.43rem;
        line-height: 4.43rem;
        text-align: left;
      }

      @include desktop-breakpoint {
        font-size: 5.7rem;
        line-height: 7.4rem;
      }
    }

    .layer-info-container {
      @include tablet-breakpoint {
        width: 50%;
        display: flex;
        flex-direction: column;
      }

      @include desktop-breakpoint {
        width: 100%;
      }
    }

    .para-structure {
      @include para-p;
      font-size: 0.79rem;
      line-height: 1.57rem;
      margin-bottom: 2.29rem;
      min-height: 8rem;
      text-align: center;

      @include tablet-breakpoint {
        text-align: left;
      }

      @include desktop-breakpoint {
        font-size: 1rem;
        height: 10.71rem; // must be set to keep all elements in parent constant
        line-height: 1.79rem;
        margin-bottom: 1.71rem;
      }
    }

    .source {
      font-family: $spartan-font;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 2rem;
      text-align: center;

      @include tablet-breakpoint {
        font-size: 0.86rem;
        line-height: 1.79rem;
        margin-bottom: 0;
      }

      @include desktop-breakpoint {
        font-size: 1rem;
        line-height: 1.79rem;
        margin-bottom: 2.79rem;
      }

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
    display: none; // menu for mobile is above planet image

    // button menus
    @include tablet-breakpoint {
      display: flex;
      flex-direction: column;
      width: 50%;
      align-items: end;
      justify-content: center;
    }

    @include desktop-breakpoint {
      width: 100%;
    }

    .button-itself {
      appearance: none;
      background-color: rgba(7, 7, 36, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      margin-bottom: 1.14rem;
      text-align: left;

      &:hover {
        background-color: rgba(216, 216, 216, 0.2);
        border: 1px solid rgba(216, 216, 216, 0); // to blend in with background
        transition: 300ms ease;
      }

      @include tablet-breakpoint {
        padding: 8px 0 7px 0;
        width: 80%;
      }

      @include desktop-breakpoint {
        padding: 12px 0 11px 0;
        width: 100%;
      }
    }

    .button-number {
      @include header-4;
      color: $white;
      letter-spacing: 2.5px;
      margin: 0 2rem;
      opacity: 0.5;

      @include tablet-breakpoint {
        font-size: 0.64rem;
        line-height: 1.79rem;
      }

      @include desktop-breakpoint {
        font-size: 0.86rem;
      }
    }

    .button-text {
      @include header-4;
      color: $white;
      letter-spacing: 2.5px;
      text-transform: uppercase;

      @include tablet-breakpoint {
        font-size: 0.64rem;
        line-height: 1.79rem;
      }

      @include desktop-breakpoint {
        font-size: 0.86rem;
      }
    }

    .active-button {
      background-color: v-bind(pColor);
      border: 1px solid v-bind(pColor);
      transition: 300ms ease;

      &:hover {
        background-color: v-bind(pColor);
      }
    }
  }
}

.number-facts-container {
  display: grid;
  row-gap: 0.57rem;
  margin-bottom: 1rem;

  @include tablet-breakpoint {
    column-gap: 2.14rem;
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-outline {
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: inline-flex;
    justify-content: space-between;
    padding: 0.64rem 1.71rem 0.93rem 1.71rem;

    @include tablet-breakpoint {
      display: block;
      padding: 1.14rem 0 1.36rem 1.07rem;
    }

    @include desktop-breakpoint {
      padding: 1.43rem 0 1.93rem 1.64rem;
    }
  }

  .title-fact {
    @include header-4;
    text-transform: uppercase;
    opacity: 0.5;
    font-size: 0.57rem;
    line-height: 1.14rem;
    letter-spacing: 0.72px;
    padding-top: 5px; // cheater

    @include tablet-breakpoint {
      padding-top: 0;
    }

    @include desktop-breakpoint {
      font-size: 0.79rem;
      line-height: 1.79rem;
      letter-spacing: 1px;
    }
  }

  .number-fact {
    @include header-2;
    text-transform: uppercase;
    font-size: 1.43rem;
    letter-spacing: -0.75px;
    line-height: 1.86rem;

    @include tablet-breakpoint {
      font-size: 1.71rem;
      letter-spacing: -0.9px;
      line-height: 2.21rem;
    }

    @include desktop-breakpoint {
      font-size: 2.86rem;
      letter-spacing: -1.5px;
      line-height: 3.7rem;
    }
  }
}
</style>
