<template>
  <section>
    <div class="columns mx-0 is-justify-content-center">
      <div class="column content-max-with">
        <div class="columns mx-0 mt-4  is-mobile is-vcentered">
          <div class="column pb-0 pr-6">
            <img src="parsiansazeh.png">
          </div>
          <div class="column is-flex is-justify-content-center">
            <p class="pt-4 ml-3 has-text-grey-light is-size-7 is-clickable" @click="logout">
              خروج از حساب
            </p>
            <NuxtLink to="/">
              <img src="exitonaccount.png" alt="">
            </NuxtLink>
          </div>
        </div>
        <div class="has-text-centered my-5">
          <img src="user_avatar-120px.png" alt="">
          <p class="has-text-black has-text-weight-bold mt-4 font-size-15px" v-if="$auth.user.name">
            {{ $auth.user.name + ' ' + $auth.user.lastname }}
          </p>
          <p class="is-size-7 has-text-grey-light ">
            {{ $auth.user.mobile }}
          </p>
        </div>
        <div class="columns is-mobile is-vcentered mb-0 mx-0 " v-for="(card, index) in cards" :key="index">
          <div class=" column mr-5 pl-0 is-1">
            <img :src="card.image" alt="">
          </div>
          <div class="column is-6">
            <p class="is-size-7 has-text-black">
              {{ card.title }}
            </p>
          </div>
          <div class="column has-text-centered">
            <NuxtLink to="/editprofile">
              <img src="left-arrow.png" alt="">
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <footeer />
  </section>
</template>
<script>
export default {
  layout: 'blank',
  data() {
    return {
      cards: [
        { title: 'ویرایش پروفایل', image: 'user_profile_edit.png' },
        /*{ title: 'قوانین و مقررات', image: 'profile_license_agreement_icon.png' },*/
        { title: 'پشتیبانی', image: 'profile_support_icon.png' },
      ]
    }
  },
}
</script>
