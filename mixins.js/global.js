export default {
    data() {
        return {
            baseLaraURL: 'https://api.payavending.com',
        }
    },
    methods: {
        toEnglishDigits(str) {

            // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
            var e = '۰'.charCodeAt(0);
            str = str.replace(/[۰-۹]/g, function (t) {
                return t.charCodeAt(0) - e;
            });

            // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
            e = '٠'.charCodeAt(0);
            str = str.replace(/[٠-٩]/g, function (t) {
                return t.charCodeAt(0) - e;
            });
            return str;
        },
        logout() {
            const vm = this;

            this.$store.commit('saleEmptier')
            this.$auth.logout().then(function () {
                vm.$toast.error('از حساب کاربری خارج شدید')
                vm.$store.commit('orderEmptier')
                vm.$router.push({
                    path: "/",
                })
            });
        },
        //methods for forms

        threecomma(oldv) {
            let newv = oldv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return newv
        },
        lastcharthreecomma(oldv) {
            let newv = Math.floor(oldv / 10);
            let newvv = newv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return newvv
        },

        imager(image) {
            return this.baseLaraURL + "/storage/" + image;
        },
    },
}