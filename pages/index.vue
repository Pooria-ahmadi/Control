<template>
  <div>
    <div class="py-6 background-color-1c1c1c border-radius-50px">
      <div class="is-flex is-justify-content-center is-align-items-center">
        <div 
          class="has-text-centered is-flex is-justify-content-center is-align-items-center">
            <img v-if="showFirst" src="power.png" alt="خاموش کننده هود" @click=" activepower" />
            <img v-else src="Group 1.png" alt="روشن کننده هود"  @click=" activepower" />
        </div>
      </div>
      <div class="columns is-centered mt-6 is-vcentered is-mobile mx-0">
        <div class="column is-3 is-flex is-justify-content-center is-align-items-center">
          <div class="circle-option">
            <img src="sun.png" class="img-on-center-circle" />
          </div>
        </div>
        <div class="column is-3 is-flex is-justify-content-center is-align-items-center">
          <div class="circle-option">
            <img src="clock-button.png" class="img-on-center-circle" />
          </div>
        </div>
        <div class="column is-3 is-flex is-justify-content-center is-align-items-center">
          <div class="circle-option">
            <img src="fan-speed.png" class="img-on-center-circle" />
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-centered mt-6 is-vcentered is-mobile mx-0">
      <div class="column is-flex is-justify-content-center is-align-items-center">

          <img v-if="showthermometer" src="thermometer2.png" alt="خاموش کننذه دما" @click="activethermometer" />
          <img v-else src="thermometer1.png" alt="روشن کننده دما" @click="activethermometer" />
      </div>
      <div class="column is-flex is-justify-content-center is-align-items-center">
        
          <img v-if="showfire" src="firebutton1.png" alt="گرمایش خاموش" @click="activefire" />
          <img v-else src="firebutton2.png" alt="گرمایش روشن" @click="activefire" />

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showFirst: true,
      showfire:true,
      showthermometer:true,
    };
  },
  methods: {
    activepower() {
      this.showFirst = !this.showFirst;
    },
    activefire(){
      this.showfire = !this.showfire;
    },
    activethermometer(){
      this.showthermometer = !this.showthermometer;
    }

  },
};
</script>
