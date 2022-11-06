<script setup>
import FundItem from './FundItem.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
</script>

<template>
  <FundItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Fund1</template>

    Abstract
    ...
  </FundItem>

  <FundItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Fund2</template>

    Abstract
    ...
  </FundItem>

  <FundItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Fund3</template>

    Abstract
    ...
  </FundItem>

  <FundItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Fund4</template>

    Abstract
    ...
  </FundItem>

  <FundItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Fund5</template>

    Abstract
    ...
    <!--
    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
    -->
  </FundItem>

</template>
