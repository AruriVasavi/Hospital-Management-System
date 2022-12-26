<template>
<div>
    <nav class="navbar navbar-light " style="background-color: teal;color:white">
      <div class="container-fluid">
        <a class="navbar-brand" style="color:white">Hospital Management System</a>
        <div class="d-flex">
          <!-- <router-link  to="/register" style="text-decoration:none;margin-right:10px">Register</router-link> -->
          <div v-if="user == null"> <router-link  to="/login" style="text-decoration:none;margin-right:50px">Login</router-link> </div>
          <div v-if="user != null" @click="logout()"> <router-link  to="/login" style="text-decoration:none;margin-right:50px">Logout</router-link> </div>
          <!-- <div v-if="user != null"> Hello {{username}} </div> -->
           <!-- <router-link v-if="user != null" @click = "logout()"  style="text-decoration:none;margin-right:50px">Logout</router-link> -->
        </div>
      </div>
  </nav>
  <router-view/>
  </div>
</template>

<script>

export default {
  name: 'HeaderBar',
  data() {
    return {
      username: '',
      user: {}
    }
  },
   mounted() {
     let vm = this;
     let test = {};
     vm.user = localStorage.getItem("user-info");
     if (vm.user != null) {
      test = JSON.parse(vm.user);
      vm.username = test.email;

     }
    },
  methods:{
     logout() {
                localStorage.clear();
                this.$router.push({ name: 'login' });
            }
  }
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
  color:white;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: wheat;
}
</style>
