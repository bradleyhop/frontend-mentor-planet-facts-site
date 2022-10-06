<script>
import PlanetDisplay from "@/components/PlanetDisplay.vue";

export default {
  components: {
    PlanetDisplay,
  },

  data() {
    return {
      dataPlanet: {}, // on init, load local json
      viewPlanet: {}, // load a default planet view: Earth
      loaded: false, // show PlanetDisplay component only after json loads
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
    setNewPlanet(orbitNum) {
      this.viewPlanet = this.dataPlanet[orbitNum];
    },
  },
};
</script>

<template>
  <header>
    <div class="logo-container"><span class="logo-text">THE PLANETS</span></div>

    <nav>
      <ul class="menu-list">
        <li class="header-4 menu-item" @click="setNewPlanet(0)">MERCURY</li>
        <li class="header-4 menu-item" @click="setNewPlanet(1)">VENUS</li>
        <li class="header-4 menu-item" @click="setNewPlanet(2)">EARTH</li>
        <li class="header-4 menu-item" @click="setNewPlanet(3)">MARS</li>
        <li class="header-4 menu-item" @click="setNewPlanet(4)">JUPITER</li>
        <li class="header-4 menu-item" @click="setNewPlanet(5)">SATURN</li>
        <li class="header-4 menu-item" @click="setNewPlanet(6)">URANUS</li>
        <li class="header-4 menu-item" @click="setNewPlanet(7)">NEPTUNE</li>
      </ul>
    </nav>
  </header>

  <div class="device-widths component-container">
    <PlanetDisplay v-if="loaded" :planet="viewPlanet" />
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

  .menu-item {
    cursor: pointer;
    margin: 0 1.18rem;
    opacity: 0.75;

    &:last-child {
      margin-right: 2.86rem;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
