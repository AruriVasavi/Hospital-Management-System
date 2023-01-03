<!--<template>
    <div>
       <HeaderBar />




      <div>
        <button  class="btn btn-primary mt-3" style="float:right;" @click="doctorHomeRoute"> Go back to Home </button>
      </div>


      <div class="container-fluid">
          <h1 class="mt-5"> Welcome to Scan home </h1>

              <table class="table table-hover table-bordered mt-5" id="myTable">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>User Id</th>
                          <th>Title</th>
                          <th>Body</th>
                      </tr>
                  </thead>
                  <tbody>

                  </tbody>
            </table>
      </div>
    </div>
</template> -->

<template>
      <div>
        <HeaderBar />
      <div class="row">
        <div class="col-sm-2" style="height:100vh;width:200px;background-color:#b3e0dc">
            <div class="nav nav-item" @click="patientInfoRoute" >
              OP
            </div>
            <div class="nav nav-item active" @click="scanHomeRoute">
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
        </div>
        <div class="col-sm-10 mt-3">

            <table class="table table-hover table-bordered mt-5" style="height:100vh;" id="myTable">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>User Id</th>
                          <th>Title</th>
                          <th>Body</th>
                      </tr>
                  </thead>
                  <tbody>

                  </tbody>
            </table>

        </div>
      </div>
   </div>
</template>

<script>
import HeaderBar from '../UIComponents/HeaderBar.vue';

// import SideBar from '../UIComponents/SideBar.vue';
import axios from "axios";
import $ from 'jquery';
export default {
  name: 'ScanHome',
  mounted() {
    this.getUsers();
  },
  components: {
    HeaderBar,
    // SideBar
  },
  methods:{
    getUsers() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          $("#myTable").DataTable({
            // dom: 'Bfrip',
            // buttons:['colvis', 'excel', 'print', 'csv'],
            data: response.data,
            columns:[
              {data: 'id' },
              {data: 'userId' },
              {data: 'title' },
              {data: 'body' }
            ]
          })


        }).catch(error => console.log(error.response));
    },
    doctorHomeRoute() {
      this.$router.push({ name: 'doctorhome' });
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
</style>