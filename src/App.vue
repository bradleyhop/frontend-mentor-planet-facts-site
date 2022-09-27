<script>
import PlanetDisplay from "@/components/PlanetDisplay.vue";

export default {
  components: {
    PlanetDisplay,
  },

  data() {
    return {
      dataPlanet: {}, // on init, load local json
      viewPlanet: {}, // load a default planet view, earth
    };
  },

  beforeCreate() {
    // load in default MD text as supplied in our local json file
    fetch("./src/assets/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        this.dataPlanet = data;
      })
      .catch(() => {
        console.log = "Did not load!";
      })
      .finally(() => {
        // set Earth as deafult view
        this.viewPlanet = this.dataPlanet[2];
        console.log(this.viewPlanet);
      });
  },

  methods: {
    setNewPlanet(orbitNum) {
      this.viewPlanet = this.dataPlanet[orbitNum];
      console.log(this.viewPlanet.name);
    },
  },
};
</script>

<template>
  <div>
    <nav>
      <ul class="menu-list">
        <li class="menu-item" @click="setNewPlanet(0)">Mercury</li>
        <li class="menu-item" @click="setNewPlanet(1)">Venus</li>
        <li class="menu-item" @click="setNewPlanet(2)">Earth</li>
        <li class="menu-item" @click="setNewPlanet(3)">Mars</li>
        <li class="menu-item" @click="setNewPlanet(4)">Jupiter</li>
        <li class="menu-item" @click="setNewPlanet(5)">Saturn</li>
        <li class="menu-item" @click="setNewPlanet(6)">Uranus</li>
        <li class="menu-item" @click="setNewPlanet(7)">Neptune</li>
      </ul>
    </nav>

    <PlanetDisplay :planet="viewPlanet" />
  </div>

  <RouterView />
</template>

<style lang="scss">
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.menu-list {
  list-style: none;
  display: inline-flex;

  .menu-item {
    cursor: pointer;
    margin: 1rem;
  }
}

.router-text {
  padding: 1rem;
}
</style>
