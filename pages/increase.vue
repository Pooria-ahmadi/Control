<template>
    <div>
        <div class="columns mx-0 mt-4 mb-6 is-mobile is-vcentered">
            <div class="column pb-0 mr-5">
                <NuxtLink to="/">
                    <img src="rightarrow.svg" alt="" >
                </NuxtLink>
            </div>
            <div class="column has-text-left">
                <NuxtLink to="/profile" class="ml-5">
                    <img src="user_avatar-51px.png" alt="">
                </NuxtLink>
            </div>
        </div>
        <p class="has-text-black mr-6 font-bold-number font-size-18px">
            افزایش اعتبار
        </p>
        <p class="text-color-gray font-size-13px mr-6 mt-3">
            میزان شارژ مورد نظر خود را انتخاب کنید
        </p>
        <div class="columns mb-0 mt-5 mx-4 is-mobile is-centered has-text-centered">
            <div class="column" v-for="(item, index) in columnsData" :key="index">
                <div class="py-5 border-radius-column has-text-centered border-color-white is-clickable">
                    <p class="font-bold-number has-text-black">{{ item.value }}</p>
                    <p class="text-color-blue is-size-7">تومان</p>
                </div>
            </div>
        </div>
        <div class="columns is-mobile is-vcentered mb-0 mt-3 mx-0 " v-for="(card, index) in cards" :key="index">
            <div class=" column mr-5 pl-0 is-1">
                <img :src="card.image" alt="">
            </div>
            <div class="column is-6 pt-0">
                <p class="is-size-7 has-text-black has-text-weight-bold">
                    {{ card.title }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    layout: 'blank',
    data() {
        return {
            columnsData: [
                { value: '30,000' },
                { value: '50,000' },
                { value: '100,000' },
            ],
            cards: [
                { title: 'بسته های ویژه شارژ ', image: 'offer.svg' },
            ]
        }
    }
}
</script>