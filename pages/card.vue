<template>
    <div class="container">
        <div class="columns mt-6 is-mobile is-justify-content-center">
            <div class="column is-9">
                <div class="columns is-mobile box border-radius-20px">
                    <div class="column pr-4">
                        مبلغ قابل پرداخت
                    </div>
                    <div class="column has-text-centered">
                        {{ lastcharthreecomma(invoicePrice) }} تومان
                    </div>
                </div>
                <div class="field mt-5">
                    <div class="control mt-6">
                        <div class="columns non-select-radio is-mobile mb-5 is-clickable" id="userWalletBtn"
                            @click="setRadio('userWallet')">
                            <div class="column is-2">
                                <input type="radio" :disabled="!canUseWallet" name="purchase" id="userWallet"
                                    value="userWallet" v-model="paytype">
                            </div>
                            <div class="column">
                                <div id="userWalletText">
                                    پرداخت با کیف پول
                                    <small class="has-text-danger" v-if="!canUseWallet">
                                        (عدم موجودی)
                                    </small>
                                    <small class="has-text-success" v-else>
                                        ( موجودی کافی)
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div class="columns non-select-radio is-mobile mb-5 is-clickable" id="organWalletBtn"
                            @click="setRadio('organWallet')">
                            <div class="column is-2">
                                <input :disabled="!canUserBudget" type="radio" name="purchase" id="organWallet"
                                    value="organWallet" v-model="paytype">
                            </div>
                            <div class="column">
                                <div id="organWalletText">
                                    پرداخت سازمانی
                                    <small class="has-text-danger" v-if="!canUserBudget">
                                        (عدم موجودی)
                                    </small>
                                    <small v-else>
                                        ( موجودی کافی)
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="field mt-4 is-flex is-justify-content-center">
                        <div class="control  has-icons-right">
                            <input class="input is-rounded has-text-centered" type="text" placeholder="افزودن کد تخفیف"  v-model="discount">
                            <span class="icon is-small is-right pt-1">
                                %
                            </span>
                        </div>
                        <button @click="submitDiscount()" :disabled="paytype == 'organWallet'"
                            class="button is-rounded is-light mr-1 has-text-grey font-size-14px">
                                ثبت
                        </button>
                    </div>
                </div>
                <div class="is-flex mt-6 is-justify-content-center">
                    <button @click="submit()"
                        class="button is-rounded height-60px-width-293px is-large is-size-6 font-bold-number is-success mt-5">
                        <span class="px-1" v-if="!canUserBudget && !canUseWallet">
                            شارژ کیف پول و
                        </span>
                        <span>
                            پرداخت
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            invoicePrice: 0,

            paytype: '',
            discount:'',

            canUserBudget: false,
            canUseWallet: false,
        }
    },
    methods: {
        getUserDataForPay() {
            const vm = this

            this.$axios
                .$post("UserDataForPay")
                .then((res) => {
                    vm.invoicePrice = res.invoicePrice
                    vm.wallet = res.wallet
                    vm.canUserBudget = res.canUserBudget
                    if (vm.invoicePrice <= vm.wallet)
                        vm.canUseWallet = true
                    if (vm.canUseWallet == false) {
                        var userWallet = document.getElementById("userWalletText");
                        userWallet.classList.add('has-text-grey-light');
                    }

                    if (vm.canUserBudget == false) {
                        var organWallet = document.getElementById("organWalletText");
                        organWallet.classList.add('has-text-grey-light');
                    }
                })
        },
        setRadio(option) {

            var el1 = document.getElementById("userWalletBtn");
            var el2 = document.getElementById("organWalletBtn");

            if (option == 'userWallet' && this.canUseWallet) {
                document.getElementById(option).checked = true;

                el1.classList.add('has-background-success-light');
                el2.classList.remove('has-background-success-light');
            }
            else if (option == 'organWallet' && this.canUserBudget) {
                document.getElementById(option).checked = true;

                el2.classList.add('has-background-success-light');
                el1.classList.remove('has-background-success-light');
            }

        },
        submit() {
            if(this.canUseWallet == false && this.canUserBudget == false)
                this.$router.push('/increase')
            else{
                const vm = this

                this.$axios
                    .$post("CreateInvoice", {'paytype': this.paytype})
                    .then((res) => {
                        vm.$toast.success('خرید با موفقیت انجام شد')
                        vm.$router.push('/purchases')
                    })
            }

        }
    },
    mounted: function () {
        this.getUserDataForPay()
    },

}
</script>
<style>
.block-radio {
    display: block;
}

.non-select-radio {
    border: 1px solid lightgrey;
    border-radius: 10px;
}
</style>
