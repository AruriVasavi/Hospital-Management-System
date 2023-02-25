<template>
  <div>
    <HeaderBar />
    <div class="my-2" v-if = "shouldRender">
      <h1>Welcome Home</h1>
      <div class="alert alert-success" v-if="registerSuccess" role="alert">
        Registered successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>
      <div class="alert alert-danger" v-if="registerFailure" role="alert">
        Failed to register the user.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="alert alert-warning" v-if="registerWarning" role="alert">
        User already registered
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="container" style="width:500px;height:100px">
        <form class="d-flex">
          <input class="form-control me-2"  v-model= "patientId"  type="search" placeholder="Enter phonenumber to search..." aria-label="Search">
          <button class="btn" @click="searchPatient()" style="background-color:teal;color:white" type="button">Search</button>
          <button class="btn btn-primary" style="color:white;margin-left:7px;" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Register</button>
          <button :disabled="shouldDisablePrint"  class="btn btn-success " style="color:white;margin-left:7px;"  type="button" @click = "print()">Print</button>
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
                  <th> Diagnosis doctor </th>
                  <th> Last payment date </th>
                  <th> Valid upto </th>
                </tr>
              </thead>
              <tbody>
                  <tr v-if="user.pid == ''">
                    <td  colspan="8" style="text-align:center">
                     {{message}}
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
                      <td>{{user.lastPaymentDate}} </td>
                      <td>{{user.validupto}} </td>
                  </tr>
              </tbody>
          </table>

       <div style = "display:flex;justify-content:center;">
        <div class="card" style="text-align:center;margin-right:10px;" v-if="user.pid && user.daysFromLastPayment <= 15">
          <div class="card-body">
            <p class="card-text">Total visit from the last payment {{user.visitsAfterLastPayment}}</p>
              <!-- <button type="button" class="btn btn-success" :disabled="user.daysFromLastVisit == 0" @click="markVisit()" > Mark Visit </button> -->
              <button type="button" class="btn" style="background-color:teal;color:white" :disabled="user.daysFromLastVisit == 0" data-bs-toggle="modal" data-bs-target="#markVisitModal">
                Mark Visit
              </button>
          </div>
        </div>
        <div class="card" v-if="user.pid && (user.daysFromLastPayment >= 15 || user.visitsAfterLastPayment >= 4 )">
            <div class="card-body">
              <p class="card-text"> No of days from the last payment {{ user.daysFromLastPayment }}.</p>
                  <button type="button" class="btn btn-danger" :disabled="user.daysFromLastVisit == 0" data-bs-toggle="modal" data-bs-target="#collectPaymentModal">
                    Collect Payment
                  </button>
            </div>
        </div>
      </div>
      </div>

      <div class="modal fade" id="markVisitModal" tabindex="-1" aria-labelledby="markVisitModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="markVisitModalLabel">Confirm Mark Visist</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
             Are you sure you want to proced?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" class="btn" style="background-color:teal;color:white;" @click="markVisit()">Yes</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="collectPaymentModal" tabindex="-1" aria-labelledby="collectPaymentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="collectPaymentModal">Collect Payment</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-group row mb-3 ">
                    <label for="modeofpayment" class="col-sm-4 col-form-label">Mode of payment</label>
                    <div class="col-sm-8">
                      <select v-model = "modeofpayment" class="form-select form-select mb-3" aria-label=".form-select-sm example">
                          <option selected>Select Mode of Payment</option>
                          <option value="Cash">Cash</option>
                          <option value="Upi">Upi</option>
                          <option value="CrditDebitCard">Credit/Debit card</option>
                          <option value="None">None</option>
                      </select>
                    </div>
                  </div>
                   <div class="form-group row mb-3">
                    <label for="Amount" class="col-sm-4 col-form-label">Amount</label>
                    <div class="col-sm-8">
                      <input v-model = "amount" type="number" class="form-control" placeholder="Amount">
                    </div>
                  </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" @click="collectPayment()">Save changes</button>
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
                  <div class="form-group row mb-3 mt-3">
                    <label for="name" class="col-sm-4 col-form-label">Name</label>
                    <div class="col-sm-8">
                      <input v-model = "registerUser.name" type="text" class="form-control" placeholder="Name">
                    </div>
                  </div>
                  <div class="form-group row mb-3">
                    <label for="relative" class="col-sm-4 col-form-label">S/O D/O W/O</label>
                    <div class="col-sm-8">
                      <input v-model = "registerUser.relative" type="text" class="form-control" placeholder="S/O D/O W/O..">
                    </div>
                  </div>
                  <div class="form-group row mb-3">
                    <label for="Age" class="col-sm-4 col-form-label">Age</label>
                    <div class="col-sm-8">
                      <input v-model = "registerUser.age" min="1" max="100" type="number" class="form-control" placeholder="Age">
                    </div>
                  </div>
                  <div class="form-group row mb-3 ">
                    <label for="phone number" class="col-sm-4 col-form-label">Phone number</label>
                    <div class="col-sm-8">
                      <input v-model = "registerUser.phonenumber" type="text" class="form-control" placeholder="Phone number">
                    </div>
                  </div>
                  <div class="form-group row mb-3 ">
                    <label for="address" class="col-sm-4 col-form-label">Address</label>
                    <div class="col-sm-8">
                      <input v-model = "registerUser.address" type="text" class="form-control" placeholder="H-no, Village">
                    </div>
                  </div>
                  <div class="form-group row mb-3 ">
                    <label for="city" class="col-sm-4 col-form-label">City/Town</label>
                    <div class="col-sm-8">
                      <input v-model = "registerUser.city" type="text" class="form-control" placeholder="City">
                    </div>
                  </div>
                  <div class="form-group row mb-3 ">
                    <label for="sex" class="col-sm-4 col-form-label">Sex</label>
                    <div class="col-sm-8">
                       <select v-model = "registerUser.sex" class="form-select form-select mb-3" aria-label=".form-select-sm example">
                          <option selected>Select Sex</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                   <div class="form-group row mb-3 ">
                    <label for="doctor" class="col-sm-4 col-form-label">Select Doctor</label>
                    <div class="col-sm-8">
                       <select v-model = "registerUser.diagnosisdoctor" class="form-select form-select mb-3" aria-label=".form-select-sm example">
                          <option selected> Select Doctor</option>
                          <option value="DoctorA">DoctorA</option>
                          <option value="DoctorB">DoctorB</option>
                          <option value="DoctorC">DoctorC</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row mb-3 ">
                    <label for="modeofpayment" class="col-sm-4 col-form-label">Mode of Payment</label>
                    <div class="col-sm-8">
                      <select v-model = "registerUser.modeofpayment" class="form-select form-select mb-3" aria-label=".form-select-sm example">
                          <option selected>Select Mode of Payment</option>
                          <option value="Cash">Cash</option>
                          <option value="Upi">Upi</option>
                          <option value="CrditDebitCard">Credit/Debit card</option>
                          <option value="None">None</option>
                      </select>
                    </div>
                  </div>
                   <div class="form-group row mb-3">
                    <label for="Amount" class="col-sm-4 col-form-label">Amount</label>
                    <div class="col-sm-8">
                      <input v-model = "registerUser.amount" type="number" class="form-control" placeholder="Amount">
                    </div>
                  </div>

              </form>
              </div>
              <div class="modal-footer">
                  <button type="button"  class="btn" style="border-color:teal" data-bs-dismiss="modal">Close</button>
                  <button type="button" @click = "onSubmit()" class="btn"  style="background-color:teal;color:white">Save</button>
                  <!-- <button type="button" @click = "onSubmit()" data-bs-dismiss="modal" class="btn" style="background-color:teal;color:white">Save</button> -->
              </div>
              </div>
          </div>
      </div>

    </div>
    <div class="my-2" v-else> Please login</div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderBar from '../UIComponents/HeaderBar.vue';
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
export default{
  name: 'OpHome',
  components: {
    HeaderBar
  },
  data() {
    return {
      message:'Click search for existing user and click register for new user',
      registerSuccess: false,
      registerFailure: false,
      registerWarning:false,
      shouldDisablePrint: true,
      //databsdismiss:'',
      errors :[],
       registrationErrors:[],
       patientId : '',
       shouldRender:false,
       //shouldPrint:true,
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
            lastPaymentDate:'',
            validupto:''
        },
        registerUser: {
            name: '',
            age:0,
            phonenumber:'',
            address:'',
            sex:'Select Sex',
            diagnosisdoctor:'Select Doctor',
            pid: '',
            modeofpayment:'Select Mode of Payment',
            amount:300,
            relative:'',
            city:''
        },
        modeofpayment:'Select Mode of Payment',
        amount:300
     }
  },
  mounted() {

    let userinfo = localStorage.getItem("user-info");
    let role = '';
    let userObj = {};
    if (userinfo != null) {
      userObj = JSON.parse(userinfo);
      role = userObj.role;
      if (role == 22) {
        this.shouldRender = true;
       }
    }
  },
  methods: {
       async onSubmit() {
        let vm = this;
        vm.errors = [];

        if (!vm.registerUser.name) {
          vm.errors.push('Name is required');
          vm.registerUser.name = '';
        }
        if (!vm.registerUser.age) {
          vm.errors.push('Age is required');
          vm.registerUser.age = '';
        }
        else if(vm.registerUser.age <= 0) {
          vm.errors.push('Please give the valid age');
          vm.registerUser.age = '';
        }
        if (!vm.registerUser.phonenumber) {
          vm.errors.push('Phonenumber is required');
          vm.registerUser.phonenumber = '';
        }
        else if(vm.registerUser.phonenumber.length != 10) {
            vm.errors.push('Phone number should be 10 characters length');
            vm.registerUser.phonenumber = '';
        }
        if (!vm.registerUser.address) {
          vm.errors.push('Address is required');
          vm.registerUser.address = '';
        }
        if (!vm.registerUser.sex) {
          vm.errors.push('Sex is required');
          vm.registerUser.sex = '';
        }
        if (!vm.registerUser.diagnosisdoctor) {
          vm.errors.push('DiagnosisDoctor is required');
          vm.registerUser.diagnosisdoctor = '';
        }
        if (!vm.registerUser.modeofpayment) {
          vm.errors.push('Mode of payment is required');
          vm.registerUser.modeofpayment = '';
        }
         if (!vm.registerUser.amount) {
          vm.errors.push('Amount is required');
          vm.registerUser.amount = '';
        }
        else if(vm.registerUser.amount < 0) {
          vm.errors.push('Please give the valid amount');
          vm.registerUser.amount = '';
        }
        if (vm.errors.length == 0)
        {
          vm.errors = [];
          let pid = '';
          let getAPI = 'http://localhost/WebApplication1/api/PatientRegistration/?uniqID=' + vm.registerUser.phonenumber;
          await axios.get(getAPI)
            .then(response => {
              if (response != null && response.data != null)
              {
                  pid = response.data.pid;
              }});

          if (pid) {
            vm.registerWarning = true;
          }
          else {
              let api = 'http://localhost/WebApplication1/api/PatientRegistration';

              let data = {
                name: vm.registerUser.name,
                age: vm.registerUser.age,
                phonenum: vm.registerUser.phonenumber,
                address: vm.registerUser.address + vm.registerUser.city,
                sex: vm.registerUser.sex,
                diagnosisdoctor: vm.registerUser.diagnosisdoctor,
                modeofpayment: vm.registerUser.modeofpayment,
                amount: vm.registerUser.amount,
                relative:vm.registerUser.relative
              }

            await axios.post(api, data)
              .then(response => {
                //console.log(response.data);
                if (response != null && response.data != null && response.data.pid != null) {
                  vm.registerUser.pid = response.data.pid;
                  vm.registerSuccess = true;

                  vm.user.pid = response.data.pid;
                  vm.user.name = vm.registerUser.name
                  vm.user.age = vm.registerUser.age
                  vm.user.phonenumber = vm.registerUser.phonenumber
                  vm.user.address = vm.registerUser.address
                  vm.user.sex = vm.registerUser.sex
                  vm.user.diagnosisdoctor = vm.registerUser.diagnosisdoctor


                  //vm.user.lastPaymentDate = response.data.LastPaymentDate
                  var result1 = new Date();
                  let getMonth1 = result1.getMonth() + 1;
                  vm.user.lastPaymentDate = result1.getFullYear() + '-' + getMonth1 + '-' + result1.getDate();

                  var result = new Date();
                  result.setDate(result.getDate() + 14);
                  let getMonth = result.getMonth() + 1;
                  vm.user.validupto = result.getFullYear() + '-' + getMonth + '-' + result.getDate();

                  vm.onReset();
                  const truck_modal = document.getElementById('exampleModal');
                  console.log(truck_modal);
                  const modal = bootstrap.Modal.getInstance(truck_modal);
                  modal.hide();

                  vm.shouldDisablePrint = false;
                }
                else {
                  vm.registerFailure = true;
                  vm.onReset()
                }
              }).catch(error => {
                        console.log(error);
                        vm.registerFailure = true;
                });
            }
          }

      },

      print() {
        localStorage.setItem("patient-info", JSON.stringify(this.user));
        const routeData = this.$router.resolve({name: 'print'});
        window.open(routeData.href, '_blank');
      },
      onReset() {
        let vm = this;
        vm.registerUser.pid = '';
        vm.registerUser.name = '';
        vm.registerUser.age = 0;
        vm.registerUser.phonenumber = '';
        vm.registerUser.address = '';
        vm.registerUser.sex = 'Select Sex';
        vm.registerUser.diagnosisdoctor = 'Select Doctor';
        vm.registerUser.city = '';
        vm.registerUser.amount = 300;
        vm.registerUser.modeofpayment = 'Select Mode of Payment';
        vm.registerUser.relative = '';
      },
      onGetPatientReset() {
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
        vm.shouldDisablePrint = true;
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

              var test = response.data.LastPaymentDate;

              //vm.user.lastPaymentDate = response.data.LastPaymentDate
              var result1 = new Date(test);
              let getMonth1 = result1.getMonth() + 1;
              vm.user.lastPaymentDate = result1.getFullYear() + '-' + getMonth1 + '-' + result1.getDate();

              var result = new Date(test);
              result.setDate(result.getDate() + 14);
              let getMonth = result.getMonth() + 1;
              vm.user.validupto = result.getFullYear() + '-' + getMonth + '-' + result.getDate();
              vm.shouldDisablePrint = false;
           }
            else
            {
              vm.message = 'User details not found';
              vm.onGetPatientReset();
            }
          }).catch(error => {
            console.log(error.response);
            vm.onGetPatientReset();
          });

          vm.patientId = '';
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
             const markvisit_modal = document.getElementById('markVisitModal');
                 // console.log(markvisit_modal);
                  const modal = bootstrap.Modal.getInstance(markvisit_modal);
                  modal.hide();
             vm.user.visitsAfterLastPayment++;
          }

        }).catch(error => { vm.shouldShowErrorMessage = true; console.log(error) });
      },

      async collectPayment() {
        let vm = this;
        let api = 'http://localhost/WebApplication1/api/PatientVisitHis';

        let data = {
          pid: vm.user.pid,
          ispaid: 1,
          modeofpayment: vm.modeofpayment,
          amount: vm.amount
        }
       await axios.post(api, data)
        .then(response => {
          if (response != null && response.status == 200) {
               vm.user.daysFromLastVisit = 0;
               vm.user.daysFromLastPayment = 0;
               vm.user.visitsAfterLastPayment = 1;

                const collectpayment_modal = document.getElementById('collectPaymentModal');
                 // console.log(markvisit_modal);
                  const modal = bootstrap.Modal.getInstance(collectpayment_modal);
                  modal.hide();
               vm.user.daysFromLastPayment++;
          }
        }).catch(error => { vm.shouldShowErrorMessage = true; console.log(error) });
      }
    }
}
</script>