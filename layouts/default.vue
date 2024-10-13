<template>
  <div style="background-color: rgb(43, 43, 43);">
    <div class="columns mx-0 is-justify-content-center">
      <div class="column content-max-with">
        <menudesktop />
        <menumobile />
        <Nuxt />
        <footeer />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import global from "~/mixins.js/global.js"
Vue.mixin(global);

export default {
  mixins: [global],
  layout: 'blank'
}
</script>