<template>
  <div>
    <div class="py-6 background-color-1c1c1c border-radius-50px">
      <div class="is-flex is-justify-content-center is-align-items-center">
        <div class="has-text-centered is-flex is-justify-content-center is-align-items-center">
          <img v-if="showFirst" src="power.png" alt="خاموش کننده هود" @click="activepower" />
          <img v-else src="Group 1.png" alt="روشن کننده هود" @click="activepower" />
        </div>
      </div>
      <div class="columns is-centered mt-6 is-mobile mx-0">
        <div class="column is-3 is-flex is-justify-content-center is-align-items-center">
          <div class="pt-5">
            <div v-if="threeimage" class="img-on-center-circle" @click="activeheating">
              <img src="1.png" />
              <img src="4.png" class="img-overlay" />
            </div>
            <div v-else class="img-on-center-circle" @click="activeheating">
              <img src="2.png" />
              <img src="44.png" :class="{ 'rotate': isRotating3 }" class="img-overlay" />
            </div>
          </div>
        </div>
        <div class="column is-3 is-flex is-justify-content-center is-align-items-center">
          <div>
            <div class="box-shomaresh">
              <p class="p-1">{{ clickCount2 }}</p>
            </div>
            <div v-if="seccendimage" class="img-on-center-circle" @click="activeclock">
              <img src="1.png" />
              <img src="3.png" class="img-overlay" />
            </div>
            <div v-else class="img-on-center-circle" @click="activeclock">
              <img src="2.png" />
              <img src="33.png" :class="{ 'rotate': isRotating2 }" class="img-overlay" />
            </div>
          </div>
        </div>
        <div class="column is-3 is-flex is-justify-content-center is-align-items-center">
          <div>
            <div class="box-shomaresh">
              <p class="p-2">{{ clickCount }}</p>
            </div>
            <div v-if="showFirstImage" class="img-on-center-circle" @click="toggleImage">
              <img src="1.png" />
              <img src="11.png" class="img-overlay" />
            </div>
            <div v-else class="img-on-center-circle" @click="toggleImage">
              <img src="2.png" />
              <img src="22.png" :class="{ 'rotate': isRotating }" class="img-overlay" />
            </div>
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
      showfire: true,
      showthermometer: true,
      showFirstImage: true,
      clickCount: 0,
      isRotating: false,
      seccendimage: true,
      clickCount2: 0,
      isRotating2: false,
      threeimage: true,
      clickCount3: 0,
      isRotating3: false
    };
  },
  methods: {
    toggleImage() {
      this.clickCount++;

      if (this.clickCount === 1) {
        this.showFirstImage = false;
      } else if (this.clickCount >= 2 && this.clickCount < 5) {
        this.isRotating = true;
        setTimeout(() => {
          this.isRotating = false;
        }, 500);
      } else if (this.clickCount === 4) {
        this.showFirstImage = true;
      } else if (this.clickCount === 5) {
        this.clickCount = 0;
        this.showFirstImage = true;
      }
    },
    activeclock() {
      this.clickCount2++;
      if (this.clickCount2 === 1) {
        this.seccendimage = false;
        this.clickCount2 = 15;
      } else if (this.clickCount2 === 2) {
        this.clickCount2 = 30;
      } else if (this.clickCount2 === 3) {
        this.clickCount2 = 45;
      } else if (this.clickCount2 === 4) {
        this.clickCount2 = 60;
      } else if (this.clickCount2 === 5) {
        this.clickCount2 = 0; 
        this.seccendimage = true; 
      }
      if (this.clickCount2 >= 2 && this.clickCount2 < 5) {
        this.isRotating2 = true;
        setTimeout(() => {
          this.isRotating2 = false;
        }, 500);
      }
    },
    activeheating() {
      this.clickCount3++;
      if (this.clickCount3 === 1) {
        this.threeimage = false;
      } else if (this.clickCount3 >= 2 && this.clickCount3 < 5) {
        this.isRotating3 = true;
        setTimeout(() => {
          this.isRotating3 = false;
        }, 500);
      } else if (this.clickCount3 === 4) {
        this.threeimage = true;
      } else if (this.clickCount3 === 5) {
        this.clickCount2 = 0;
        this.threeimage = true;
      }
    },
    activepower() {
      this.showFirst = !this.showFirst;
    },
    activefire() {
      this.showfire = !this.showfire;
    },
    activethermometer() {
      this.showthermometer = !this.showthermometer;
    }

  },
};
</script>
