<template>
    <div>
        <div class="columns is-mobile mx-4 mt-5 mb-4 py-3 is-vcentered">
            <div class="column has-text-centered ">
                <div class="align-item-center is-flex">
                    <span class="circle-small-orange background-color-ef4339"></span>
                    <span class="mr-2">
                        <p>خریدهای من</p>
                    </span>
                </div>
            </div>
            <div class="column">
                <p class="has-text-grey-light is-size-7">
                    -
                </p>
            </div>
        </div>
        <div class="columns is-mobile is-vcentered mx-5 mb-5 py-4 px-0 background-colo-blue-border-radius border-radius-20px"
            v-for="(card, index) in cards" :key="index">
            <div class=" column is-2 white-border-radius border-radius-20px p-1 has-text-centered mr-3">
                <img :src="card.image" alt="" class="max-height-60px">
            </div>
            <div class="column">
                <p class="is-size-7 has-text-black">
                    {{ card.product }}
                </p>
                <p class="mt-3 has-text-weight-bold is-flex subtitle-color-blue text-color-blue">
                    <img src="clock.png" alt="clock" style="height: 14px;" class="ml-1">
                    {{ card.createdate }}
                </p>
            </div>
            <div class="column has-text-black is-size-7 is-4">
                <p class="has-text-black">
                    <strong class="has-text-black is-size-6">{{ lastcharthreecomma(card.price) }}</strong>
                    تومان
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentDate: '',

            cards: [],
        }
    },
    methods: {
        getAuthUserPurchases(id) {
            const vm = this
            this.$axios
                .$post("AuthUserPurchases")
                .then((res) => {
                    vm.cards = res
                })
        },
    },
    created: function () {
        this.getAuthUserPurchases(this.$route.query.id)
    }
}
</script>
