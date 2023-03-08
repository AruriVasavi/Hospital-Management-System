<template>
    <div>
       <HeaderBar />
      <div>
        <div class="row">
            <!-- <div class="col-sm-2" style="height:100vh;width:200px;background-color:#b3e0dc">
                <div class="nav nav-item active" @click="patientInfoRoute" >
                  OP
                </div>
                <div class="nav nav-item" @click="scanHomeRoute">
                  Scan
                </div>
                <div class="nav nav-item">
                  Billing
                </div>
                <div class="nav nav-item">
                  Lab
                </div>
                <div class="nav nav-item">
                  Discharges
                </div>
            </div> -->
            <div class="col-sm-10">
              <h3 class="mt-2"> Welcome Doctor </h3>
              <div style = "display:flex;justify-content:center;margin-left:200px">
                  <div class="card card-custom" @click="patientInfoRoute">
                    <div class="card-body" style="padding:50px;">
                      OP
                    </div>
                  </div>
                  <div class="card card-custom">
                    <div class="card-body" style="padding:50px;">
                       Diagnosis
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
    },
    scanHomeRoute() {
       this.$router.push({ name: 'scanhome' });
    }
  }
}
</script>

<style scoped>


.nav-item{
  padding:10px;
  cursor:pointer;
}
.active {
    font-weight: 600;
    color:teal;
}
.card-custom{
  background: linear-gradient(to right, teal, #0067a5);
  color:white;
  margin:10px;
  width:500px;
  cursor:pointer;
}
</style>