<script>
import PlanetDisplay from "@/components/PlanetDisplay.vue";
import planetInfo from "@/assets/data/data.json";

export default {
  components: {
    PlanetDisplay,
  },

  data() {
    return {
      dataPlanet: planetInfo, // on init, load local json
      viewPlanet: {}, // prop; load a default planet view: Earth
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

  created() {
    // set Earth as default planet view upon page load
    this.viewPlanet = this.dataPlanet[2];
    this.planetColor = this.accentColor[2];
  },

  methods: {
    setNewPlanet: function (orbitNum) {
      this.viewPlanet = this.dataPlanet[orbitNum];
      this.planetColor = this.accentColor[orbitNum];
      this.toggleMenu = false; // reset mobile menu
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
        <img
          src="@/assets/img/icon-hamburger.svg"
          alt="press icon for menu list"
          :class="toggleMenu ? 'hamburger-icon-active' : 'hamburger-icon'"
        />
      </button>
      <!-- mobile menu  -->
      <nav>
        <ul
          class="mobile-menu-list"
          :class="toggleMenu ? 'animate-menu' : 'remove-menu'"
        >
          <li
            v-for="item in dataPlanet"
            :key="item"
            class="mobile-menu-item"
            @click="setNewPlanet(dataPlanet.indexOf(item))"
          >
            <span
              class="bullet-circle"
              :style="{
                'background-color': accentColor[dataPlanet.indexOf(item)],
              }"
            ></span>
            <span class="mobile-name">{{ item.name }}</span>
            <span class="chevron-container">
              <img
                src="@/assets/img/icon-chevron.svg"
                alt="chevron icon for menu item"
                class="chevron-icon"
              />
            </span>
          </li>
        </ul>
      </nav>
    </nav>

    <!-- menu list for tablet and larger devices -->
    <nav class="horizontal-menu">
      <ul class="menu-list">
        <li
          v-for="item in dataPlanet"
          :key="item"
          class="menu-item"
          @click="setNewPlanet(dataPlanet.indexOf(item))"
          @mouseenter="setHoverColor(dataPlanet.indexOf(item))"
          @mouseleave="hover = false"
          :class="{ accentBorderColor: hover }"
        >
          {{ item.name }}
        </li>
      </ul>
    </nav>
  </header>

  <main
    class="component-container"
    :class="toggleMenu ? 'hide-main' : 'restore-main'"
  >
    <PlanetDisplay :planet="viewPlanet" :pColor="planetColor" />
  </main>

  <footer>
    <div class="attribution">
      Challenge by
      <a
        href="https://www.frontendmentor.io/challenges/planets-fact-site-gazqN8w_f"
        target="_blank"
        rel="noopener noreferrer"
      >
        Frontend Mentor
      </a>
      <br />
      Code by
      <a
        href="https://github.com/bradleyhop/frontend-mentor-planet-facts-site"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bradley Smith
      </a>
    </div>
  </footer>
</template>

<style lang="scss">
$transition-default: 300ms ease;
$header-height: 6rem;

header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  min-height: $header-height;
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
        width: 24px;
        height: auto;
        transition: $transition-default;
      }

      .hamburger-icon-active {
        @extend .hamburger-icon;
        opacity: 0.25;
      }
    }

    .mobile-menu-list {
      background-color: $blackish;
      left: 0;
      list-style: none;
      list-style-position: inside;
      position: absolute;
      top: $header-height; // set to min-height of <header>
      z-index: 9001;
      overflow-x: hidden;
      transition: $transition-default;

      .mobile-menu-item {
        @include header-4;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        display: flex;
        font-size: 1.07rem;
        line-height: 1.79rem;
        margin: 0 2.29rem 0 1.71rem;
        padding: 1.43rem 0;
        text-transform: uppercase;

        .mobile-name {
          flex-grow: 1;
        }

        .bullet-circle {
          align-self: center;
          border-radius: 50%;
          display: flex;
          height: 1.43rem;
          margin-right: 1.71rem;
          width: 1.43rem;
        }

        &:first-child {
          margin-top: 3.14rem;
        }

        &:last-child {
          border-bottom: none;
          margin-bottom: 4.79rem;
        }

        .chevron-container {
          display: flex;

          .chevron-icon {
            align-self: center;
            height: 8px;
            width: 4px;
          }
        }
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

    .accentBorderColor:hover {
      // using vue, hover color based on planet accent color
      border-color: v-bind(hoverColor);
      transition: $transition-default;
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

.attribution {
  @include para-p;
  font-size: 1.1rem;
  line-height: 160%;
  margin: 2rem auto;
  min-height: 4rem;
  text-align: center;

  & a {
    text-decoration: none;
    font-weight: bold;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
}

// animate menu classes
.animate-menu {
  width: 100vw;
  width: 100dvw;
}

.remove-menu {
  width: 0vw;
}

// hide web content when mobile menu is displayed; invoked by menu component
.hide-main {
  display: none;
}

.restore-main {
  display: block;
}
</style>
