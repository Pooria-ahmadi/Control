<template>
  <div>
    <div class="columns mx-0 is-justify-content-center" >
      <div class="column content-max-with px-0">
        <menudesktop />
        <menumobile />
        <Nuxt />
    
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