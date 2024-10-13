<template>
    <section>
        <div class="overlay">
            <div class="center-square"></div>
        </div>
        <NuxtLink class="back-arrow-in-camera" to="/">
            <img src="rightarrow.svg" alt="">
        </NuxtLink>
        <qrcode-stream @decode="onDecode"  @detect="onDetect"></qrcode-stream>
    </section>
</template>

<script>
export default {
    layout:'blank',

    data() {
        return {
        wallet: 0,
        }
    },
    methods:{
        onDecode(result){
            const urlObj = new URL(result);

            const baseUrl = urlObj.origin;

            const currentOrigin = window.location.origin;

            if(baseUrl == currentOrigin){
                var params = new URLSearchParams(urlObj.search);

                const id = params.get('id');

                this.$router.push('/buy?id='+id )
            }

        },
    }
}
</script>
<style>
.back-arrow-in-camera {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 2;
    background-color: rgba(255,255,255,0.3);
    border-radius: 20px;
    width: 55px;
    height: 55px;
}

.overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); /* Semi-transparent black */
    display: flex;
    justify-content: center;
    align-items: center;
}

.center-square {
    width: 200px; /* Adjust the width of the square */
    height: 200px; /* Adjust the height of the square */
    background-color: transparent; /* Transparent background */
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.8); /* Mask effect */
    z-index: 2;
}
</style>