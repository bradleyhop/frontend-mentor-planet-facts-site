<script>
import PlanetDisplay from "@/components/PlanetDisplay.vue";

export default {
  components: {
    PlanetDisplay,
  },

  data() {
    return {
      dataPlanet: {}, // on init, load local json
      viewPlanet: {}, // prop; load a default planet view: Earth
      loaded: false, // show PlanetDisplay component only after json loads
      hover: false, // hover state for menu hover styling
      hoverColor: "",
      accentColor: [
        "rgb(65, 158, 187)",
        "rgb(237, 162, 73)",
        "rgb(109, 46, 213)",
        "rgb(209, 76, 50)",
        "rgb(216, 58, 52)",
        "rgb(205, 81, 32)",
        "rgb(30, 193, 162)",
        "rgb(45, 104, 240)",
      ],
      planetColor: "", // prop to send for styling
    };
  },

  beforeCreate() {
    // load in default MD text as supplied in our local json file
    fetch("./src/assets/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        this.dataPlanet = data;
      })
      .then(() => {
        // set Earth as deafult view
        this.viewPlanet = this.dataPlanet[2];
        this.planetColor = this.accentColor[2];
      })
      .catch(() => {
        console.error("Data not found!");
      })
      .finally(() => {
        // allow redering of planet content after load;
        // avoids race conditions, async, etc
        this.loaded = true;
      });
  },

  methods: {
    setNewPlanet: function (orbitNum) {
      this.viewPlanet = this.dataPlanet[orbitNum];
      this.planetColor = this.accentColor[orbitNum];
    },

    // show corridsponding planet color on selected planet menu item
    setHoverColor: function (planetNum) {
      this.hoverColor = this.accentColor[planetNum];
      this.hover = true;
    },
  },
};
</script>

<template>
  <header>
    <div class="logo-container"><span class="logo-text">THE PLANETS</span></div>

    <nav>
      <ul class="menu-list">
        <li
          class="header-4 menu-item"
          @click="setNewPlanet(0)"
          @mouseenter="setHoverColor(0)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          MERCURY
        </li>
        <li
          class="header-4 menu-item"
          @click="setNewPlanet(1)"
          @mouseenter="setHoverColor(1)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          VENUS
        </li>
        <li
          class="header-4 menu-item"
          @click="setNewPlanet(2)"
          @mouseenter="setHoverColor(2)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          EARTH
        </li>
        <li
          class="header-4 menu-item"
          @click="setNewPlanet(3)"
          @mouseenter="setHoverColor(3)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          MARS
        </li>
        <li
          class="header-4 menu-item"
          @click="setNewPlanet(4)"
          @mouseenter="setHoverColor(4)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          JUPITER
        </li>
        <li
          class="header-4 menu-item"
          @click="setNewPlanet(5)"
          @mouseenter="setHoverColor(5)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          SATURN
        </li>
        <li
          class="header-4 menu-item"
          @click="setNewPlanet(6)"
          @mouseenter="setHoverColor(6)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          URANUS
        </li>
        <li
          class="header-4 menu-item"
          @click="setNewPlanet(7)"
          @mouseenter="setHoverColor(7)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          NEPTUNE
        </li>
      </ul>
    </nav>
  </header>

  <div class="device-widths component-container">
    <PlanetDisplay v-if="loaded" :planet="viewPlanet" :pColor="planetColor" />
  </div>
</template>

<style lang="scss">
header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 6rem;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-left: 2.28rem;
}

.logo-text {
  font-family: $antonio-font;
  font-size: 2rem;
  letter-spacing: -1.05px;
  line-height: 2.57rem;
}

.menu-list {
  display: flex;
  height: 100%;
  list-style: none;
  align-items: center;

  // hover color based on what planet user is hovering over in the mneu
  .accentBorderColor:hover {
    border-color: v-bind(hoverColor);
  }

  .menu-item {
    cursor: pointer;
    margin: 0 1.18rem;
    opacity: 0.75;
    // pushes border-top to top of div
    padding: 2rem 0;
    // makes room for border-top hover effect
    border-top: 2px solid rgba(0, 0, 0, 0);

    &:last-child {
      margin-right: 2.86rem;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
