<template>
  <div class="is-flex is-justify-content-center">
    <div class="foter-b-0px-max-w-520px width-100 position-fixed">
      <hr class="mb-3">
      <div class="columns is-centered is-mobile mx-0 py-1 has-background-white">
        <div class="column has-text-centered pt-0 is-flex-grow-1"  v-for="(item, index) in menus" :key="index">
          <NuxtLink :to="item.link">
            <img :src="item.activeSrc" />
            <p class="is-size-7 has-text-grey-light">
              {{ item.label }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          activeSrc: '11.svg',
          enableSrc: '1.svg',
          disableSrc: '11.svg',
          label: 'فروشگاه',
          link: '/',
          alt: 'فروشگاه'
        },
        {
          activeSrc: '22.png',
          enableSrc: '2.png',
          disableSrc: '22.png',
          label: 'خرید',
          link: '/buy',
          alt: 'خرید'
        },
        {
          activeSrc: '33.svg',
          enableSrc: '3.svg',
          disableSrc: '33.svg',
          label: 'خریدها',
          link: '/purchases',
          alt: 'خریدها'
        },
        {
          activeSrc: '44.svg',
          enableSrc: '4.svg',
          disableSrc: '44.svg',
          label: 'پروفایل',
          link: '/profile',
          alt: 'پروفایل'
        }
      ],
    };
  },
  methods: {
    updateActiveMenu(currentPath) {
      this.menus.forEach((item) => {
        if (item.link === currentPath)
          this.$set(item, 'activeSrc', item.enableSrc);
        else
          this.$set(item, 'activeSrc', item.disableSrc);
      });
    }
  },
  mounted() {
    this.updateActiveMenu(this.$route.path);
  },
  watch: {
    '$route.path'(newPath) {
      this.updateActiveMenu(newPath);
    }
  },
};
</script>
