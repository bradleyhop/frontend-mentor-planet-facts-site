<script>
// import { RouterLink, RouterView } from "vue-router";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      viewPlanet: {}, // on init, load local json
    };
  },

  beforeCreate() {
    // load in default MD text as supplied in our local json file
    fetch("./src/assets/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        this.viewPlanet = data;
        console.log(this.viewPlanet);
      })
      .catch(() => {
        console.log = "Did not load!";
      });
  },
};
</script>

<template>
  <div>
    <nav>
      <RouterLink class="router-text" to="/mercury">Mercury</RouterLink>
      <RouterLink class="router-text" to="/venus">Venus</RouterLink>
      <RouterLink class="router-text" to="/earth">Earth</RouterLink>
      <RouterLink class="router-text" to="/mars">Mars</RouterLink>
      <RouterLink class="router-text" to="/jupiter">Jupiter</RouterLink>
      <RouterLink class="router-text" to="/saturn">Saturn</RouterLink>
      <RouterLink class="router-text" to="/uranus">Uranus</RouterLink>
      <RouterLink class="router-text" to="/neptune">Neptune</RouterLink>
    </nav>
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

.router-text {
  padding: 1rem;
}
</style>
