<template>

  <div>
    <div class="align-item-center is-flex">
      <span class="circle-small-orange background-color-ef4339"></span>
      <span class="mr-2">
        <p class="title-font-size-12px color-100e1a has-text-weight-bold">فروشگاه</p>
        <p class="color-100e1a font-size-18px has-text-weight-bold font-bold-number" v-show="devicename">{{ devicename }}</p>
      </span>
    </div>
    <div class="has-text-grey-light my-5 has-text-centered font-size-14px" v-if="devicename">
      کالاهای موجود در فروشگاه 
      {{ devicename }}
    </div>
    <div class="columns is-flex is-justify-content-center pt-6">
      <div class="column is-8">
        <div class="columns">
          <div class="column is-12">
            <div class="control has-icons-right">
                <input class="input height-input-60px border-color-white has-text-centered" type="text" placeholder="وارد نمودن کد فروشگاه" v-model="storecode">
                <span class="icon is-small is-right pt-4">
                    <img src="2.png" alt="user icon">
                </span>
            </div>
            <div class="column is-12 has-text-centered">
              <button @click="getDeviceNameAndProduct(storecode)"
                class="button is-outlined is-rounded height-60px-width-293px is-danger is-large is-size-6 font-bold-number has-text-weight-bold">
                  <p>
                      ورود
                  </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns box is-mobile is-vcentered mx-0 " v-for="(item, index) in products" :key="index">
      <div class=" column is-2 white-border-radius border-radius-20px p-1 has-text-centered mr-3">
        <img :src="imager(item.image)" :alt="item.product" class="max-height-60px">
      </div>
      <div class="column is-6">
        <p class="is-size-7 has-text-black">
          {{ item.product }}
        </p>
        <p class="mt-2 has-text-weight-bold subtitle-color-blue text-color-blue">
          {{ lastcharthreecomma(item.price) }}
        </p>
      </div>
      <div class="column has-text-centered">
        <p class="is-size-7 color-text-orange-index is-clickable" @click="createSale(item.pk_product)">
          خرید +
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],

      sale:{},

      storecode:null,

      devicename: null,
    }
  },
  methods: {
    getDeviceNameAndProduct(id) {
      const vm = this

      this.$axios
        .$post("DeviceNameAndProduct", { 'id': id })
        .then((res) => {
          vm.products = res.products
          vm.devicename = res.deviceName
        })
        .catch((error) => {
            vm.$toast.error('اطلاعات صحیح نمی باشد', 'danger');
        });
    },
    createSale(productid) {
      const vm = this

      this.sale.productid =  productid

      this.$axios
        .$post("CreateSale", this.sale)
        .then((res) => {
          vm.$router.push('/card')
        })
    },
    
  },
  created: function () {
    if (this.$route.query.id){
      this.sale.deviceid = this.$route.query.id
      this.getDeviceNameAndProduct(this.$route.query.id)
    }
  }
}
</script>
