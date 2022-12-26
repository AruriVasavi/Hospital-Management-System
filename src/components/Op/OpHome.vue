<template>
  <div>
    <HeaderBar />
    <div class="my-2" v-if = "shouldRender">
      <h1>Welcome Home</h1>
      <div class="container" style="width:500px;height:100px">
        <form class="d-flex">
          <input class="form-control me-2"  v-model= "patientId"  type="search" placeholder="Enter phonenumber to search..." aria-label="Search">
          <button class="btn" @click="searchPatient()" style="background-color:teal;color:white" type="button">Search</button>
          <button class="btn btn-primary" style="color:white;margin-left:7px;" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Register</button>
        </form>
      </div>
      <div class="container-fluid">
          <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>PID</th>
                  <th>Name</th>
                  <th>Age </th>
                  <th>Phone number </th>
                  <th> Address </th>
                  <th> Sex </th>
                  <th> Diagnosis Doctor </th>
                </tr>
              </thead>
              <tbody>
                  <tr v-if="user.pid == ''">
                    <td  colspan="8" style="text-align:center">
                      User Details not found.
                      <!-- <a type="button" style="color:teal;"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Click here to Register a new patient
                      </a> -->
                    </td>
                  </tr>
                  <tr v-else>
                      <td>{{user.pid}} </td>
                      <td>{{user.name}} </td>
                      <td>{{user.age }}</td>
                      <td>{{user.phonenumber }}</td>
                      <td>{{user.address}} </td>
                      <td>{{user.sex}} </td>
                      <td>{{user.diagnosisdoctor}} </td>
                      <!-- <td>
                          <button class="btn" style="background-color:teal;color:white;margin-right:3px;"> Edit </button>
                          <button class="btn btn-danger" style="color:white"> Delete </button>
                      </td> -->
                  </tr>
              </tbody>
          </table>

       <div style = "display:flex;justify-content:center;">
        <div class="card" style="width: 18rem;margin-right:10px;" v-if="user.pid && user.daysFromLastPayment <= 15">
          <div class="card-body">
            <p class="card-text">Total visit from the last payment {{user.visitsAfterLastPayment}}</p>
              <button type="button" class="btn btn-success" @click="markVisit()"  :disabled="user.daysFromLastVisit == 0"> Mark Visit </button>
          </div>
        </div>
        <div class="card" style="width: 18rem;" v-if="user.pid && (user.daysFromLastPayment >= 15 || user.visitsAfterLastPayment >= 4 )">
            <div class="card-body">
              <p class="card-text"> No of days from the last payment {{ user.daysFromLastPayment }}.</p>
              <button type="button" class="btn btn-danger" @click="collectPayment()"  :disabled="user.daysFromLastVisit == 0"> Collect Payment </button>
            </div>
        </div>
      </div>

      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p v-if="errors.length">
                      <b>Please correct the following error(s):</b>
                      <ul>
                        <li style="list-style-type:none;color:red" v-for="error in errors" :key = "error">{{ error }}</li>
                      </ul>
                    </p>
              <form class="row g-3">
                  <div class="col-md-6 form-floating mb-1">
                  <input v-model = "user.name" type="text" class="form-control" id="floatingInput" placeholder="First Name" required>
                  <label for="floatingInput"> Name</label>
                  </div>
                  <div class="col-md-6 form-floating mb-1">
                  <input v-model = "user.age" type="number" class="form-control" id="floatingInput" placeholder="Age" required>
                  <label for="floatingInput">Age</label>
                  </div>
                  <div class="col-md-12 form-floating mb-1">
                  <input v-model = "user.phonenumber" type="text" class="form-control" id="floatingInput" placeholder="Phone number" required>
                  <label for="floatingInput">Phone number</label>
                  </div>
                  <div class="col-12 form-floating mb-1">
                  <input v-model = "user.address" type="text" class="form-control" id="floatingInput" placeholder="Address H-no, Colony" required>
                  <label for="floatingInput">Address</label>
                  </div>
                  <div class="col-md-6 mb-1">
                  <select v-model = "user.sex" class="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
                      <option selected>Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                  </select>
                  </div>
                  <div class="col-md-6 mb-1">
                  <select v-model = "user.diagnosisdoctor" class="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
                      <option selected> Select Doctor</option>
                      <option value="DoctorA">DoctorA</option>
                      <option value="DoctorB">DoctorB</option>
                      <option value="DoctorC">DoctorC</option>
                  </select>
                  </div>

              </form>
              </div>
              <div class="modal-footer">
                  <button type="button"  class="btn" style="border-color:teal" data-bs-dismiss="modal">Close</button>
                  <button type="button" @click = "onSubmit()" data-bs-dismiss="modal"  class="btn" style="background-color:teal;color:white">Save</button>
                  <!-- <button type="button" @click = "onSubmit()" data-bs-dismiss="modal" class="btn" style="background-color:teal;color:white">Save</button> -->
              </div>
              </div>
          </div>
      </div>

    </div>
    <div v-else> Please login</div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderBar from '../UIComponents/HeaderBar.vue';
export default{
  name: 'OpHome',
  components: {
    HeaderBar
  },
  data() {
    return {
      errors :[],
       registrationErrors:[],
       patientId : '',
       shouldRender:false,
        user: {
            name: '',
            age:1,
            phonenumber:'',
            address:'',
            sex:'Select Sex',
            diagnosisdoctor:'Select Doctor',
            pid: '',
            daysFromLastPayment: 0,
            visitsAfterLastPayment: 1,
            daysFromLastVisit: 0,
        },
        shouldShowErrorMessage : false,
        shouldShowStatusDialog: false,
        show: true,
        endUser :[],
        patientInfo:[
            //{firstname: 'Test', lastname:'Test',age:10, phonenumber: '909090909', address:'test', city:'test', gender:'male', preferreddoctor:'doctor a'}
        ],
     }
  },
  mounted() {
    let userinfo = localStorage.getItem("user-info");
    let email = '';
    let userObj = {};
    if (userinfo != null) {
      userObj = JSON.parse(userinfo);
      email = userObj.email;
      this.shouldRender = true;
      console.log(email);
    }
    else {
      this.shouldRender = false;
    }
  },
  methods: {
       async onSubmit() {
        let vm = this;
        vm.errors = [];
        if (!vm.user.name) {
          vm.errors.push('Name is required');
          vm.user.name = '';
        }
        if (!vm.user.age) {
          vm.errors.push('Age is required');
          vm.user.age = '';
        }
        if (!vm.user.phonenumber) {
          vm.errors.push('Phonenumber is required');
          vm.user.phonenumber = '';
        }
        else if(vm.user.phonenumber.length != 10) {
            vm.errors.push('Phone number should be 10 characters length');
            vm.user.phonenumber = '';
        }
        if (!vm.user.address) {
          vm.errors.push('Address is required');
          vm.user.address = '';
        }
        if (!vm.user.sex) {
          vm.errors.push('Sex is required');
          vm.user.sex = '';
        }
        if (!vm.user.diagnosisdoctor) {
          vm.errors.push('DiagnosisDoctor is required');
          vm.user.diagnosisdoctor = '';
        }

        console.log(vm.errors.length);

        if (vm.errors.length == 0)
        {
          vm.errors = [];
          let pid = '';
          let getAPI = 'http://localhost/WebApplication1/api/PatientRegistration/?uniqID=' + vm.user.phonenumber;
          await axios.get(getAPI)
            .then(response => {
              if (response != null && response.data != null)
              {
                  pid = response.data.pid;
              }});

          if (pid) {
            console.log("in get ");
            console.log(pid);
            console.log("user already registered---");
          }
          else {
              let api = 'http://localhost/WebApplication1/api/PatientRegistration';

              let data = {
                name: vm.user.name,
                age: vm.user.age,
                phonenum: vm.user.phonenumber,
                address: vm.user.address,
                sex: vm.user.sex,
                diagnosisdoctor: vm.user.diagnosisdoctor
              }

            await axios.post(api, data)
              .then(response => {
                if (response != null && response.data != null && response.data.pid != null) {
                  vm.user.pid = response.data.pid;
                }
                else {
                  vm.shouldShowErrorMessage = true;
                  vm.onReset()
                }
                vm.shouldShowStatusDialog = true;
              }).catch(error => { vm.shouldShowErrorMessage = true; console.log(error) });
          }
          }
      },
      onReset() {
        let vm = this;
        vm.user.pid = '';
        vm.user.name = '';
        vm.user.age = '';
        vm.user.phonenumber = '';
        vm.user.address = '';
        vm.user.sex = 'Select Sex';
        vm.user.diagnosisdoctor = 'Select Doctor';
      },
      async searchPatient()
      {
        let vm = this;
        let api = 'http://localhost/WebApplication1/api/PatientRegistration/?uniqID=' + this.patientId;

          await axios.get(api)
          .then(response => {
            if (response != null && response.data != null)
            {
              vm.user.pid = response.data.pid;
              vm.user.name = response.data.name;
              vm.user.age = response.data.age;
              vm.user.phonenumber = response.data.phonenum;
              vm.user.address = response.data.Address;
              vm.user.sex = response.data.sex;
              vm.user.diagnosisdoctor = response.data.DiagnosisDoctor;
              vm.user.daysFromLastPayment = response.data.DaysFromLastPayment;
              vm.user.visitsAfterLastPayment = response.data.VisitsAfterLastPayment;
              vm.user.daysFromLastVisit = response.data.DaysFromLastVisit;
            }
            else
            {
              vm.onReset();
            }
          }).catch(error => {
            console.log(error.response);
            vm.onReset();
          });
      },

      async markVisit() {
         let vm = this;
        let api = 'http://localhost/WebApplication1/api/PatientVisitHis';

        let data = {
          pid: vm.user.pid,
          ispaid: 0,
        }
       await axios.post(api, data)
        .then(response => {
          console.log(response);
          if (response != null && response.status == 200) {
             vm.user.daysFromLastVisit = 0;
          }

        }).catch(error => { vm.shouldShowErrorMessage = true; console.log(error) });
      },

      async collectPayment() {
         let vm = this;
        let api = 'http://localhost/WebApplication1/api/PatientVisitHis';

        let data = {
          pid: vm.user.pid,
          ispaid: 1,
        }
       await axios.post(api, data)
        .then(response => {
          if (response != null && response.status == 200) {
               vm.user.daysFromLastVisit = 0;
               vm.user.daysFromLastPayment = 0;
               vm.user.visitsAfterLastPayment = 1;
          }

        }).catch(error => { vm.shouldShowErrorMessage = true; console.log(error) });
      }
    }
}
</script>