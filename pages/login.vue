<template>
    <section>
        <div v-if="!codeIsSend">
            <div class="has-text-centered mt-6">
                <img src="/favicon.png" alt="">
            </div>
            <p class="is-size-5 has-text-centered has-text-black mt-5 has-text-weight-bold font-bold-number">
                ورود
            </p>
            <p class="has-text-grey-light my-5 has-text-centered font-size-14px">
                برای ورود ابتدا شماره تلفن خود را وارد کنید
            </p>
            <form @submit.prevent="verifysmssender()">
                <div class="field mt-4 is-flex is-justify-content-center">
                    <div class="control  has-icons-right">
                        <input class="input height-input-60px border-color-white has-text-centered" type="text" ref="refmobile" title="لطفاً فقط از اعداد استفاده کنید"
                            placeholder="9121234567" inputmode="numeric" pattern="[0-9]*" v-model="mobile">
                        <span class="icon is-small is-right pt-4">
                            <img src="/user.png" alt="user icon">
                        </span>
                    </div>
                </div>
                <div class="is-flex is-justify-content-center">
                    <button type="submit" 
                        class="button is-large has-text-white color-background-orange-index border-radius-20px height-60px-width-293px is-size-6 font-bold-number has-text-weight-bold input height-input-60px border-color-white has-text-centered">
                        {{ sendTextBtn }}
                    </button>
                </div>
            </form>
            <a href="tel:123456789" class="is-flex is-justify-content-center mt-6">
                <img src="/Support.png" alt="">
                <p class="pt-2 mr-3 has-text-grey is-size-7">
                    تماس با پشتیبانی
                </p>
            </a>
        </div>
        <div v-else>
            <div class="has-text-centered mt-6">
                <img src="/favicon.png" alt="">
            </div>
            <p class="is-size-5 has-text-centered has-text-black mt-5 has-text-weight-bold font-bold-number">
                ورود
            </p>
            <p class="has-text-grey-light my-5 has-text-centered font-size-14px">
                کد را وارد نمایید
            </p>
            <form @submit.prevent="codeverificator()">
                <div class="field mt-4 is-flex is-justify-content-center">
                    <div class="control  has-icons-right">
                        <input class="input height-input-60px border-color-white has-text-centered" @input="verify" inputmode="numeric" type="text"
                            pattern="\d{6}" autocomplete="one-time-code" v-model="confirmationcode"
                            ref="refconfirmationcode">
                        <span class="icon is-small is-right pt-4">
                            <img src="/password.png" alt="user icon">
                        </span>
                    </div>
                </div>
                <div class="is-flex is-justify-content-center">
                    <button type="submit"
                        class="button is-large has-text-white color-background-orange-index border-radius-20px height-60px-width-293px is-size-6 font-bold-number has-text-weight-bold">ورود</button>
                </div>
            </form>
            <div class="is-flex mt-4 is-justify-content-center">
                <button :disabled="!canResend" @click="verifysmssender()"
                    class="button is-outlined is-rounded height-60px-width-293px is-link is-large is-size-6 font-bold-number has-text-weight-bold">
                    <p v-if="canResend">
                        درخواست مجدد
                    </p>
                    <p v-else>
                        درخواست مجدد
                        {{ counter }}
                    </p>
                </button>
            </div>
            <a href="tel:123456789" class="is-flex is-justify-content-center mt-6">
                <img src="/Support.png" alt="">
                <p class="pt-2 mr-3 has-text-grey is-size-7">
                    تماس با پشتیبانی
                </p>
            </a>
        </div>
    </section>
</template>
<script>
export default {
    layout: 'blank',

    data() {
        return {
            mobile: "",
            confirmationcode: "",
            counter: "",
            sendTextBtn:"ارسال کد",

            canResend: false,
            codeIsSend: false,
            isLawModalActive: false,

            email: "",
            password: "",
        };
    },
    mounted: function () {
        const vm = this

        this.opt()

        setTimeout(() => {
            vm.$refs.refmobile.focus();
        }, 2000);
    },
    methods: {
        verifysmssender() {
            this.sendTextBtn = "در حال ارسال..."

            let vm = this;

            var mobile = this.mobile
            var firstchar = this.mobile.charAt(0)
            if (firstchar == "0" || firstchar == "۰")
                mobile = mobile.substring(1);
            mobile = this.toEnglishDigits(mobile)

            if (mobile.length != 10)
                this.$toast.error("شماره موبایل را صحیح وارد نمائید", "danger");
            else {
                this.$axios
                    .$post("auth/VerifySmsSender", {
                        mobile: mobile,
                    })
                    .then((response) => {
                        vm.$toast.success(response.message);
                        vm.countdown()
                        vm.codeIsSend = true
                    })
                    .then(() => {
                        vm.$refs.refconfirmationcode.focus();
                    })
                    .catch((error) => {
                        vm.sendTextBtn = "ارسال کد"
                        vm.$toast.error('مشکل در ارسال کد', 'danger');
                    });
            }
        },

        codeverificator() {
            this.$toast.success('در حال بررسی کد وارد شده');

            let vm = this;

            var mobile = this.mobile
            var firstchar = this.mobile.charAt(0)
            if (firstchar == "0" || firstchar == "۰")
                mobile = mobile.substring(1);
            mobile = this.toEnglishDigits(mobile)

            let confirmationcode = this.toEnglishDigits(this.confirmationcode)

            if (confirmationcode.length != 4)
                this.$toast.error("کد صحیح نمی باشد");
            else {
                this.$auth
                    .loginWith("laravelJWT", {
                        data: {
                            confirmationcode: confirmationcode,
                            mobile: mobile,
                        }
                    })
                    .then((response) => {
                        vm.$toast.success('به حساب کاربری وارد شدید');
                        vm.$store.commit("saleEmptier");
                        vm.codeIsSend = true
                    })
                    .catch((error) => {
                        vm.$toast.error(error.response.data.message)
                    });
            }
        },

        verify() {
            const vm = this

            let confirmationcode = String(this.confirmationcode)

            if (confirmationcode.length === 4) {
                this.codeverificator()
            }
        },
        countdown() {
            let vm = this;
            vm.canResend = false
            vm.counter = '1:00';

            // Set the date we're counting down to
            var date = new Date();
            var yy = date.getFullYear();
            var mm = date.getMonth();
            var hh = date.getHours();
            var dd = date.getDate();
            var mt = date.getMinutes();
            var d = mt + 1
            var sec = date.getSeconds() + 1

            var countDownDate = new Date(yy, mm, dd, hh, d, sec).getTime();

            // Update the count down every 1 second
            var x = setInterval(function () {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                vm.counter = minutes + ":" + seconds
                // Output the result in an element with id="demo"
                /*document.getElementById("demo").innerHTML = days + "d " + hours + "h "
                +  + "m " + seconds + "s ";*/

                // If the count down is over, write some text 
                if (distance < 0) {
                    clearInterval(x);
                    vm.canResend = true
                    //document.getElementById("demo").innerHTML = "EXPIRED";
                }
            }, 1000);
        },
        opt() {
            const vm = this

            if ('OTPCredential' in window) {
                window.addEventListener('DOMContentLoaded', e => {
                const ac = new AbortController();
                navigator.credentials.get({
                    otp: { transport: ['sms'] },
                    signal: ac.signal
                }).then(otp => {
                    vm.confirmationcode = otp.code
                    vm.codeverificator()
                }).catch(err => {
                    console.log(err)
                });
                })
            }
        },
    },
};
</script>
