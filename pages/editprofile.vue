<template>
    <div class="columns mx-0 is-justify-content-center">
        <div class="column content-max-with">
            <div class="columns mx-0 mt-4  is-mobile is-vcentered">
                <div class="column pb-0 mr-5">
                    <NuxtLink to="/profile">
                        <img src="rightarrow.svg" alt="">
                    </NuxtLink>
                </div>
                <div class="column is-flex is-justify-content-center">
                    <div class="pt-4 ml-3 has-text-weight-bold has-text-grey-light is-size-7">
                        تغییر رمز عبور
                    </div>
                    <img src="changepassword.png" alt="" class="cursor-pointer "
                        @click="isShowModal = true">
                    <div class="modal" :class="{ 'is-active': isShowModal }">
                        <div class="modal-background" @click="isShowModal = false"></div>
                        <div class="modal-card border-radius-30px">
                            <section class="modal-card-body">
                                <p class="color-100e1a font-size-18px mb-5">
                                    تغییر رمز ورود
                                </p>
                                <div class="field is-relative">
                                    <div class="control has-icons-left has-icons-right">
                                        <div>
                                            <input :type="isPasswordVisible ? 'text' : 'password'"
                                                class="input is-danger has-text-centered" placeholder="رمز جدید" v-model="passwordData.password">
                                        </div>
                                    </div>
                                    <span class="icon is-small is-left mt-12px-ml-10px position-absolute" @click="togglePasswordVisibility">
                                        <img :src="isPasswordVisible ? '/show-24.png' : 'hide-30.png'"
                                            alt="toggle visibility">
                                    </span>
                                    <p class="help is-danger">پر کردن این فیلد الزامی است.</p>
                                </div>


                                <div class="field is-relative">
                                    <div class="control has-icons-left has-icons-right">
                                        <div>
                                            <input :type="isPasswordVisible ? 'text' : 'password'"
                                                class="input is-danger has-text-centered" placeholder="رمز جدید" v-model="passwordData.secondPassword">
                                        </div>
                                    </div>
                                    <span class="icon is-small is-left mt-12px-ml-10px position-absolute" @click="togglePasswordVisibility">
                                        <img :src="isPasswordVisible ? '/show-24.png' : 'hide-30.png'"
                                            alt="toggle visibility">
                                    </span>
                                    <p class="help is-danger">پر کردن این فیلد الزامی است.</p>
                                </div>
                                <div class="columns is-mobile has-text-centered mt-2">
                                    <div class="column">
                                        <button class="button is-danger" @click="isShowModal = false">بیخیال</button>
                                    </div>
                                    <div class="column">
                                        <button class="button is-success" @click="changePassword()">تایید</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <p class="font-size-18px mr-5 mb-3 has-text-weight-bold font-bold-number">
                ویرایش پروفایل
            </p>
            <p class="text-color-gray font-size-13px mr-5">
                اطلاعات کاربری خود را ویرایش کنید
            </p>
            <div class="has-text-centered mt-5">
                <img src="avatar.svg" alt="" class="image-border-radius border-color-white">
            </div>
            <div class="field mt-4 is-flex is-justify-content-center">
                <div class="control  has-icons-right">
                    <input class="input height-input-60px border-color-white has-text-centered" type="text" placeholder="نام" v-model="userData.name">
                    <span class="icon is-small is-right pt-4">
                        <img src="user.png" alt="user icon">
                    </span>
                </div>
            </div>
            <div class="field mt-4 is-flex is-justify-content-center">
                <div class="control  has-icons-right">
                    <input class="input height-input-60px border-color-white has-text-centered" type="text" placeholder="نام خانوادگی" v-model="userData.lastname">
                    <span class="icon is-small is-right pt-4">
                        <img src="user.png" alt="user icon">
                    </span>
                </div>
            </div>
            <div class="is-flex is-justify-content-center">
                <div class="footer-bottom-10px position-fixed">
                    <button @click="changeUserData()"
                        class="button is-large has-text-white color-background-orange-index border-radius-20px height-60px-width-293px is-size-5 font-bold-number has-text-weight-bold">ویرایش</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: 'blank',
    data() {
        return {
            passwordData:{},
            userData:{},
            isShowModal: false,
            isPasswordVisible: false,
            password: '',
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible;
        },
        changePassword(){
            if(!this.passwordData.password || !this.passwordData.secondPassword)
                this.$toast.error('مقادیر را وارد نمایید');
            if(this.passwordData.password != this.passwordData.secondPassword)
                this.$toast.error('مفادیر یکسان نیستند');
            else{
                const vm = this

                this.$axios
                    .$post("ChangeAuthUserPawword",this.passwordData)
                    .then((res) => {
                        vm.isShowModal = false
                        vm.$toast.success('پسورد شما با موفقیت تغییر کرد');
                    })
            }
        },
        changeUserData(){
            if(!this.userData.name || !this.userData.lastname)
                this.$toast.error('مقادیر را وارد نمایید');
            else{
                const vm = this

                this.$axios
                    .$post("ChangeAuthUserData",this.userData)
                    .then((res) => {
                        vm.$toast.success('اطلاعات شما با موفقیت ثبت شد');
                    })
            }
        }
    },
    created: function(){
        if(this.$auth.user.name){
            this.userData.name = this.$auth.user.name
            this.userData.lastname = this.$auth.user.lastname
        }
    }
}
</script>