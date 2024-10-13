<template>
    <div class="columns mx-0 is-justify-content-center">
        <div class="column content-max-with">
            <section>
                <nuxt />
            </section>
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