<template>
  <div class="pb-6">
    <div class="columns is-mobile mx-0 is-vcentered mt-5">
      <div class="column mr-5">
        <p class="has-text-weight-bold is-size-7 has-text-grey-light">
          موجودی حساب شما
        </p>
        <p class=" mt-4 red-color-text">
          <strong class=" red-color-text  is-size-4 font-bold-number">
            {{ lastcharthreecomma(wallet) }}
          </strong>
          تومان
        </p>
      </div>
      <div class="column has-text-centered">
        <NuxtLink to="/increase">
          <button class="button border-radius-button-12px has-background-danger-light">
            <p class="is-size-7 color-text-orange-index"> <span> + </span> افزایش اعتبار </p>
          </button>
        </NuxtLink>
      </div>
    </div>

    <p class="mt-6-mr-35px-text red-color-text font-size-13px font-size-13px font-bold-number" v-if="wallet < 300000">
      موجودی حساب شما برای خرید کافی نمیباشد
    </p>
    <div class="has-text-centered is-relative">
      <img src="welcom.jpg" alt="">
      <p class="centered-text-on-image-index width-100 position-absolute has-text-weight-bold has-text-black font-bold-number">
        به پایاوندینگ خوش آمدید
      </p>
    </div>
    <NuxtLink class="w-70-h-70-border-radius-15 is-relative background-color-ef4339 column mt-4 is-hidden-tablet mb-6 pb-6 is-hidden-desktop" to="/qrscanner">
      <img class="mb-6 " src="codeQR.png" alt="codeQR">
    </NuxtLink>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wallet: 0,
    }
  },
  methods: {
    getAuthUserWallet(){
      const vm = this
      this.$axios
        .$post("AuthUserWallet")
        .then((res) => {
            vm.wallet = res
        })
    },
  },
  created: function(){
    if(this.$route.query.id)
        this.$router.push('/buy?id=' + this.$route.query.id)
    else
      this.getAuthUserWallet()
  },
}
</script>