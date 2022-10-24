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
      toggleMenu: false, // state of pop-over menu for mobile devices
      hover: false, // hover state for menu hover styling
      hoverColor: "", // cover for menu item hover border
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

    // toggle mobile menu
    setMobileMenu: function () {
      this.toggleMenu = !this.toggleMenu;
    },
  },
};
</script>

<template>
  <header>
    <div class="logo-container"><span class="logo-text">THE PLANETS</span></div>

    <!-- pop-over menu for mobile devices -->
    <nav class="mobile-menu">
      <button class="mobile-menu-button" @click="setMobileMenu()">
        <img src="@/assets/img/icon-hamburger.svg" class="humburger-icon" />
      </button>
    </nav>

    <!-- menu list for tablet and larger devices -->
    <nav class="horizontal-menu">
      <ul class="menu-list">
        <li
          class="menu-item"
          @click="setNewPlanet(0)"
          @mouseenter="setHoverColor(0)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          MERCURY
        </li>
        <li
          class="menu-item"
          @click="setNewPlanet(1)"
          @mouseenter="setHoverColor(1)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          VENUS
        </li>
        <li
          class="menu-item"
          @click="setNewPlanet(2)"
          @mouseenter="setHoverColor(2)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          EARTH
        </li>
        <li
          class="menu-item"
          @click="setNewPlanet(3)"
          @mouseenter="setHoverColor(3)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          MARS
        </li>
        <li
          class="menu-item"
          @click="setNewPlanet(4)"
          @mouseenter="setHoverColor(4)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          JUPITER
        </li>
        <li
          class="menu-item"
          @click="setNewPlanet(5)"
          @mouseenter="setHoverColor(5)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          SATURN
        </li>
        <li
          class="menu-item"
          @click="setNewPlanet(6)"
          @mouseenter="setHoverColor(6)"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          URANUS
        </li>
        <li
          class="menu-item"
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

  <div class="component-container">
    <PlanetDisplay
      v-if="loaded && !toggleMenu"
      :planet="viewPlanet"
      :pColor="planetColor"
    />
  </div>
</template>

<style lang="scss">
header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  min-height: 6rem;
  width: 100%;
  padding: 0 1.71rem;

  @include tablet-breakpoint {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  @include desktop-breakpoint {
    flex-direction: row;
    justify-content: space-between;
  }

  .mobile-menu {
    align-self: center;

    @include tablet-breakpoint {
      display: none;
    }

    .mobile-menu-button {
      appearance: none;
      background: none;
      border: none;
      cursor: pointer;

      .hamburger-icon {
        height: 24px;
        width: auto;
      }
    }
  }

  .logo-container {
    display: flex;
    flex-grow: 1; // helps to push menu button
    align-items: center;

    @include tablet-breakpoint {
      margin: 2.29rem 0 0 0;
    }

    @include desktop-breakpoint {
      margin: 0 0 0 2.28rem;
    }
  }

  .logo-text {
    font-family: $antonio-font;
    font-size: 2rem;
    letter-spacing: -1.05px;
    line-height: 2.57rem;
    text-transform: uppercase;
  }

  .menu-list {
    display: none;

    @include tablet-breakpoint {
      display: flex;
      height: 100%;
      list-style: none;
      align-items: center;
    }

    // hover color based on what planet user is hovering over in the mneu
    .accentBorderColor:hover {
      border-color: v-bind(hoverColor);
    }

    .menu-item {
      @include header-4;
      cursor: pointer;
      margin: 0 1.18rem;
      opacity: 0.75;
      // pushes border-top to top of div
      padding: 2rem 0;
      // makes room for border-top hover effect
      border-top: 2px solid rgba(0, 0, 0, 0);
      text-transform: uppercase;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: initial;

        @include desktop-breakpoint {
          margin-right: 2.86rem;
        }
      }

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
