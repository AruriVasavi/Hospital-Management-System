<template>

    <HeaderBar />
    <div class="container mt-5" style="width:500px;heght:500px;" >
      <h1>Login </h1>
      <form class="row g-3">
        <div class="form-floating mb-3">
          <input v-model="user.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input v-model="user.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
          <label for="floatingPassword">Password</label>
        </div>
        <div class="mt-3">
          <button @click="onSubmit()" type="button" class="btn btn-primary me-2" style="background-color:teal;border-color:teal;color:white">Submit</button>
          <button @click="onRest()" type="button" class="btn" style="border-color:teal;color:teal">Cancel</button>
        </div>
      </form>
    </div>
</template>

<script>
// import axios from "axios";
import HeaderBar from '../UIComponents/HeaderBar.vue';
export default{
  name: 'LoginPage',
  components: {
    HeaderBar
  },
  data() {
    return {
        user: {
            email: '',
            password: '',
            role:''
        },
        show: true,
        endUser :[],
     }
  },
  async mounted() {
    // let result = await axios.get('https://reqres.in/api/users?page=1');
    // console.log("from hello login");
    // console.log(result);
  },
  methods: {
      onSubmit() {
        console.log("onSubmit");
         let email = this.user.email;
         let password = this.user.password;

         if (email == "doctora@gmail.com" && password == "Doctora@123") {
            this.user.role = 11;
            localStorage.setItem("user-info", JSON.stringify(this.user));
            this.$router.push({ name: 'doctorhome' });
            //this.$toast.error(`Hey! I'm here`);
         }
         else if (email == "opa@gmail.com" && password == "Opa@123") {
             this.user.role = 22;
             localStorage.setItem("user-info", JSON.stringify(this.user));
             this.$router.push({ name: 'ophome' });
             //this.$toast.error(`Hey! I'm here`);
         }
         else if(email == "diagnosis@gmail.com" && password == "Diagnosis@123") {
                this.user.role = 33;
                localStorage.setItem("user-info", JSON.stringify(this.user));
                this.$router.push({ name: 'diagnosishome' });
         }
         else {
             this.$router.push({ name: 'notfound' });
             //this.$toast.error(`Hey! I'm here`);
         }
      },
      onReset() {

      }
    }
}
</script>


<style scoped>

</style>