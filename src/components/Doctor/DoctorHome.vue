<template>
    <div>
       <HeaderBar />
       <!-- <SideBar /> -->
      <div>
        <button class="btn btn-primary">Save</button>
      </div>
      <div class="container-fluid">
          <h1 class="mt-4"> Welcome to doctor home </h1>
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
</template>

<script>
import HeaderBar from '../UIComponents/HeaderBar.vue';

// import SideBar from '../UIComponents/SideBar.vue';
import axios from "axios";
import $ from 'jquery';
export default {
  name: 'DoctorHome',
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
    }
  }
}
</script>
