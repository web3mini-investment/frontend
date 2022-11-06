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
  </FundItem>

</template>
