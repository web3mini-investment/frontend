<script setup>
  import TitleView from './components/TitleView.vue'
  import FundList from './components/FundList.vue'
  import TabMenu from './components/TabMenu.vue'
</script>

<template>
  <header>
    <img alt="dFund logo" class="logo" src="./assets/logo.svg" width="250" height="250" />

    <div class="wrapper">
      <TitleView msg="Welcome to the dFund!" name="sugami and M.Ishida"/>
    </div>

    <div id="tab">
      <TabMenu/>
      <router-view/>
    </div>
  </header>

  <main>
    <FundList />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  place-items: center;
  margin: auto;
}

@media (min-width: 1024px) {
  header {
    display: block;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    place-items: center;
    margin: auto;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

#tab {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #030f1b;
  margin-top: 30px;
}
</style>
