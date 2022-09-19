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
      <RouterLink to="/mercury">Mercury</RouterLink>
      <RouterLink to="/venus">Venus</RouterLink>
      <RouterLink to="/earth">Earth</RouterLink>
      <RouterLink to="/mars">Mars</RouterLink>
      <RouterLink to="/jupiter">Jupiter</RouterLink>
      <RouterLink to="/saturn">Saturn</RouterLink>
      <RouterLink to="/uranus">Uranus</RouterLink>
      <RouterLink to="/neptune">Neptune</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
