<template>
    <div>
       <HeaderBar />
      <div class="mt-3">
        <h1> Welcome to Doctor's Home </h1>
        <div style = "display:flex;justify-content:center;">
          <div class="card card-custom" @click="patientInfoRoute">
            <div class="card-body" style="padding:50px;">
              OP
            </div>
          </div>
          <div class="card card-custom">
            <div class="card-body" style="padding:50px;">
              Scan
            </div>
          </div>
          <div class="card card-custom" >
            <div class="card-body" style="padding:50px;">
              Lab
            </div>
          </div>
          <div class="card card-custom">
            <div class="card-body" style="padding:50px;">
              Billing
            </div>
          </div>
          <div class="card card-custom">
            <div class="card-body" style="padding:50px;">
              Discharges
            </div>
          </div>
       </div>
      </div>
    </div>
</template>

<script>
import HeaderBar from '../UIComponents/HeaderBar.vue';

//  import SideBar from '../UIComponents/SideBar.vue';

export default {
  name: 'DoctorHome',
  mounted() {

  },
  components: {
    HeaderBar,
  },
  methods:{
    patientInfoRoute() {
       this.$router.push({ name: 'patientinfo' });
    }
  }
}
</script>

<style scoped>
.card-custom{
margin-right:10px;
cursor:pointer;
width:290px;
background-image:linear-gradient(to right, teal , #00bde7,#005b6d);
color:white;
font-weight: 300;
font-size:25px;
}
</style>